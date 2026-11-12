import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/site";
import { loadDocuments } from "@/lib/docs";

export const metadata: Metadata = { title: "Documentation" };

export default function DocumentationPage() {
  const documents = loadDocuments();
  return (
    <div className="docs-overview">
      <p className="eyebrow">The shared knowledge base</p>
      <h1>OneSquad documentation</h1>
      <p className="page-description">Find your starting point: learn the approach, adopt it in your project, understand the decisions, or look up a convention.</p>
      <div className="category-grid">{categories.map((category) => (
        <Link key={category.id} className="category-card" href={`/docs/${category.id}/`}>
          <span className="eyebrow">{category.label}</span>
          <h2>{category.title}</h2><p>{category.description}</p>
          <ul>{documents.filter((doc) => doc.category === category.id).map((doc) => <li key={doc.href}>{doc.title}</li>)}</ul>
          <span className="card-link">Browse {category.title} →</span>
        </Link>
      ))}</div>
      <div className="note"><strong>Project context and published guides are separate.</strong><p>These articles are maintained in <code>site/docs/</code>. Internal project knowledge under <code>docs/</code> remains in the repository and is not published automatically.</p></div>
    </div>
  );
}
