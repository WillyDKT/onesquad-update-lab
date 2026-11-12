import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { categories, SITE, type Category } from "./site";

export interface Doc {
  source: string;
  raw: string;
  content: string;
  title: string;
  summary: string;
  category: Category;
  slug: string;
  href: string;
  order: number;
}

export interface Heading {
  title: string;
  id: string;
  level: string;
}

export const docsDirectory = path.join(process.cwd(), "docs");
const repositoryRoot = path.resolve(process.cwd(), "..");

function listFiles(directory: string, prefix = ""): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".")) return [];
    const relative = path.posix.join(prefix, entry.name);
    return entry.isDirectory() ? listFiles(path.join(directory, entry.name), relative) : [relative];
  }).sort();
}

export function loadDocuments(directory = docsDirectory): Doc[] {
  const usedUrls = new Set<string>();
  const documents = listFiles(directory).filter((file) => file.endsWith(".md")).map((source): Doc => {
    const raw = fs.readFileSync(path.join(directory, source), "utf8");
    const { data, content } = matter(raw);
    if (typeof data.title !== "string" || typeof data.summary !== "string") {
      throw new Error(`${source}: title and summary are required.`);
    }
    const [folder, ...segments] = source.split("/");
    const category = categories.find((item) => item.id === (data.website?.category ?? folder));
    if (!category) throw new Error(`${source}: unknown website category.`);
    const slug: string = data.website?.slug ?? segments.join("/").replace(/\.md$/, "").toLowerCase();
    if (!/^[a-z0-9]+(?:[a-z0-9/-]*[a-z0-9])?$/.test(slug) || slug.includes("//")) {
      throw new Error(`${source}: invalid website slug "${slug}".`);
    }
    const href = `/docs/${category.id}/${slug}/`;
    if (usedUrls.has(href)) throw new Error(`${source}: duplicate website URL "${href}".`);
    usedUrls.add(href);
    return { source, raw, content, title: data.title, summary: data.summary,
      category: category.id, slug, href, order: data.website?.order ?? 100 };
  });
  return documents.sort((a, b) => categories.findIndex((c) => c.id === a.category)
    - categories.findIndex((c) => c.id === b.category) || a.order - b.order || a.source.localeCompare(b.source));
}

export function slugify(text: string): string {
  return text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-") || "section";
}

export function rewriteLink(href: string, document: Doc, documents: Doc[], directory = docsDirectory): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\/)/i.test(href)) return href;
  const separator = href.search(/[?#]/);
  const target = separator < 0 ? href : href.slice(0, separator);
  const suffix = separator < 0 ? "" : href.slice(separator);
  const source = path.posix.normalize(path.posix.join(path.posix.dirname(document.source), decodeURIComponent(target)));
  const linked = documents.find((item) => item.source === source);
  if (linked) return `${linked.href}${suffix}`;
  const absolute = path.resolve(directory, source);
  const relative = path.relative(repositoryRoot, absolute).split(path.sep).join("/");
  if (relative.startsWith("../") || !fs.existsSync(absolute)) {
    throw new Error(`${document.source}: unresolved local link "${href}".`);
  }
  if (source.startsWith("../")) {
    return `${SITE.repository}/blob/main/${relative.split("/").map(encodeURIComponent).join("/")}${suffix}`;
  }
  return `/docs-assets/${source}${suffix}`;
}

// Keep the existing Markdown renderer's anchors, source links, and HTML escaping.
export function renderMarkdown(document: Doc, documents: Doc[], directory = docsDirectory) {
  const markdown = new MarkdownIt({ html: false, linkify: true });
  const tokens = markdown.parse(document.content, {});
  const inlineText = (index: number) => (tokens[index]?.children ?? []).map((child) => child.content).join("");
  const titleAnchor = slugify(tokens[0]?.tag === "h1" ? inlineText(1) : document.title);
  if (tokens[0]?.type === "heading_open" && tokens[0].tag === "h1") tokens.splice(0, 3);
  const headings: Heading[] = [];
  const anchors = new Set([titleAnchor]);
  tokens.forEach((token, index) => {
    if (token.type !== "heading_open") return;
    const title = inlineText(index + 1);
    const base = slugify(title);
    let id = base;
    let count = 1;
    while (anchors.has(id)) id = `${base}-${count++}`;
    anchors.add(id);
    token.attrSet("id", id);
    if (["h2", "h3"].includes(token.tag)) headings.push({ title, id, level: token.tag });
  });
  markdown.renderer.rules.heading_close = (items, index) => {
    const id = markdown.utils.escapeHtml(items[index - 2].attrGet("id") ?? "");
    return `<a class="heading-anchor" href="#${id}" aria-label="Link to this section">#</a></${items[index].tag}>\n`;
  };
  markdown.renderer.rules.link_open = (items, index, options, env, renderer) => {
    const token = items[index];
    token.attrSet("href", rewriteLink(token.attrGet("href") ?? "", document, documents, directory));
    if (/^https?:/.test(token.attrGet("href") ?? "")) token.attrSet("rel", "noopener noreferrer");
    return renderer.renderToken(items, index, options);
  };
  const imageRule = markdown.renderer.rules.image!;
  markdown.renderer.rules.image = (items, index, options, env, renderer) => {
    items[index].attrSet("src", rewriteLink(items[index].attrGet("src") ?? "", document, documents, directory));
    return imageRule(items, index, options, env, renderer);
  };
  markdown.set({
    highlight(code, language) {
      return language && hljs.getLanguage(language)
        ? hljs.highlight(code, { language }).value : markdown.utils.escapeHtml(code);
    },
  });
  const fence = markdown.renderer.rules.fence!;
  markdown.renderer.rules.fence = (items, index, options, env, renderer) =>
    `<div class="code-block"><button type="button" class="copy-code" data-copy-code>Copy code</button>${fence(items, index, options, env, renderer)}</div>`;
  markdown.renderer.rules.table_open = () => '<div class="table-scroll"><table>';
  markdown.renderer.rules.table_close = () => "</table></div>";
  const text = tokens.flatMap((token) => token.type === "inline"
    ? [(token.children ?? []).map((child) => child.content).join("")]
    : ["fence", "code_block"].includes(token.type) ? [token.content] : []).join(" ").replace(/\s+/g, " ").trim();
  return { html: markdown.renderer.render(tokens, markdown.options, {}), headings, text, titleAnchor };
}
