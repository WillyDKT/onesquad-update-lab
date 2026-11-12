import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { loadDocuments, renderMarkdown, rewriteLink, slugify } from "./docs";

test("the existing articles retain their sources, paths, metadata, and content", () => {
  const documents = loadDocuments();
  assert.deepEqual(documents.map((doc) => doc.source), [
    "tutorials/getting-started.md", "how-to/adopt-one-squad.md",
    "explanation/delivery-workflow.md", "reference/repository-guide.md",
  ]);
  for (const doc of documents) {
    assert.equal(doc.raw, readFileSync(path.join("docs", doc.source), "utf8"));
    assert.equal(doc.href, `/docs/${doc.source.replace(/\.md$/, "")}/`);
    const rendered = renderMarkdown(doc, documents);
    assert.ok(rendered.text.length > 100);
    assert.ok(!rendered.html.includes("<h1"));
    assert.ok(rendered.headings.length > 0);
    assert.ok(!rendered.html.includes("TRAINING-GETTING-STARTED"));
  }
});

test("links keep public article routes and external repository source boundaries", () => {
  const documents = loadDocuments();
  const doc = documents[0];
  assert.equal(rewriteLink("../how-to/adopt-one-squad.md#objective", doc, documents),
    "/docs/how-to/adopt-one-squad/#objective");
  assert.equal(rewriteLink("../../../docs/context-map.md#document-metadata", doc, documents),
    "https://github.com/dktunited/one-squad/blob/main/docs/context-map.md#document-metadata");
  assert.equal(rewriteLink("../../../.github/skills/ticket/SKILL.md", doc, documents),
    "https://github.com/dktunited/one-squad/blob/main/.github/skills/ticket/SKILL.md");
  assert.equal(rewriteLink("#objective", doc, documents), "#objective");
  assert.throws(() => rewriteLink("./missing.md", doc, documents), /unresolved local link/);
  assert.throws(() => rewriteLink("../../../../../../etc/passwd", doc, documents), /unresolved local link/);
});

test("Markdown preserves safe rendering, headings, tables, code, and copy controls", () => {
  const documents = loadDocuments();
  const doc = { ...documents[0], content: "# Sample\n\n## Setup\n\n## Setup\n\n## Setup-1\n\n```markdown\n## Not a heading\n```\n\n<script>alert(1)</script>\n\n| A | B |\n|---|---|\n| 1 | 2 |" };
  const rendered = renderMarkdown(doc, documents);
  assert.equal(slugify("Données & APIs!"), "donnees-apis");
  assert.deepEqual(rendered.headings.map((heading) => heading.id), ["setup", "setup-1", "setup-1-1"]);
  assert.ok(rendered.html.includes("&lt;script&gt;"));
  assert.ok(!rendered.html.includes("<script>"));
  assert.ok(rendered.html.includes("data-copy-code"));
  assert.ok(rendered.html.includes('href="#setup" aria-label="Link to this section"'));
  assert.ok(rendered.html.includes('<div class="table-scroll"><table>'));
});

test("loading rejects missing metadata, unknown categories, and duplicate URLs", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "one-squad-next-docs-"));
  try {
    mkdirSync(path.join(directory, "tutorials"));
    const file = path.join(directory, "tutorials/first.md");
    writeFileSync(file, "# Missing metadata");
    assert.throws(() => loadDocuments(directory), /title and summary/);
    writeFileSync(file, "---\ntitle: First\nsummary: Description\nwebsite:\n  category: missing\n---\n# First");
    assert.throws(() => loadDocuments(directory), /unknown website category/);
    writeFileSync(file, "---\ntitle: First\nsummary: Description\nwebsite:\n  slug: same\n---\n# First");
    writeFileSync(path.join(directory, "tutorials/second.md"),
      "---\ntitle: Second\nsummary: Description\nwebsite:\n  slug: same\n---\n# Second");
    assert.throws(() => loadDocuments(directory), /duplicate website URL/);
    assert.equal(readdirSync(path.join(directory, "tutorials")).length, 2);
  } finally {
    rmSync(directory, { recursive: true });
  }
});
