import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/lib/site";
import { loadDocuments } from "@/lib/docs";

export function generateStaticParams() {
  return categories.map(({ id }) => ({ category: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return { title: categories.find((item) => item.id === category)?.title ?? "Documentation" };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const config = categories.find((item) => item.id === category);
  if (!config) notFound();
  const documents = loadDocuments().filter((doc) => doc.category === category);
  return <div className="docs-overview">
    <p className="eyebrow">{config.label}</p><h1>{config.title}</h1><p className="page-description">{config.description}</p>
    <div className="category-grid">{documents.map((doc) => (
      <Link key={doc.href} href={doc.href} className="category-card"><h2>{doc.title}</h2><p>{doc.summary}</p><span className="card-link">Read the guide →</span></Link>
    ))}</div>
  </div>;
}
