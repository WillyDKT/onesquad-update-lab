import Link from "next/link";
import { notFound } from "next/navigation";
import { loadDocuments, renderMarkdown } from "@/lib/docs";
import { categories, SITE } from "@/lib/site";
import { TocSidebar } from "../../components/TocSidebar";
import { ArticleContent } from "../../components/ArticleContent";

type Props = { params: Promise<{ category: string; slug: string[] }> };

export function generateStaticParams() {
  return loadDocuments().map((doc) => ({ category: doc.category, slug: doc.slug.split("/") }));
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const doc = loadDocuments().find((item) => item.category === category && item.slug === slug.join("/"));
  return { title: doc?.title, description: doc?.summary };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const documents = loadDocuments();
  const index = documents.findIndex((doc) => doc.category === category && doc.slug === slug.join("/"));
  if (index < 0) notFound();
  const doc = documents[index];
  const rendered = renderMarkdown(doc, documents);
  const previous = documents[index - 1];
  const next = documents[index + 1];
  return <div className="article-layout">
    <article className="doc-article">
      <Link className="category-badge" href={`/docs/${category}/`}>{categories.find((item) => item.id === category)?.title}</Link>
      <h1 id={rendered.titleAnchor}>{doc.title}</h1><p className="page-description">{doc.summary}</p>
      <ArticleContent html={rendered.html} markdown={doc.raw} />
      <nav className="article-pagination" aria-label="Article navigation">
        {previous ? <Link href={previous.href}><small>← Previous</small><strong>{previous.title}</strong></Link> : <span />}
        {next && <Link href={next.href}><small>Next →</small><strong>{next.title}</strong></Link>}
      </nav>
    </article>
    <TocSidebar headings={rendered.headings} editUrl={`${SITE.repository}/edit/main/site/docs/${doc.source}`} />
  </div>;
}
