import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "./components/SiteNav";
import { Breadcrumb } from "./components/Breadcrumb";
import { loadDocuments, renderMarkdown } from "@/lib/docs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  icons: { icon: "/assets/one-squad-logo-transparent.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const documents = loadDocuments();
  const searchEntries = documents.map((doc) => ({
    title: doc.title, summary: doc.summary, href: doc.href,
    category: doc.category, text: renderMarkdown(doc, documents).text,
  }));
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#content">Skip to content</a>
        <SiteNav entries={[{ title: "One project, one shared context", summary: SITE.description, href: "/",
          category: "Guide", text: "OneSquad Personal Squad Enterprise shared second brain monorepo optional AI assistance" }, ...searchEntries]} />
        <Breadcrumb />
        {children}
        <footer className="site-footer">
          <div className="max-w-320 mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p><strong>OneSquad</strong> · One project, one shared context.</p>
            <a href={SITE.repository} target="_blank" rel="noopener noreferrer">Contribute on GitHub ↗</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
