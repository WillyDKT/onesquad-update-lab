import { loadDocuments } from "@/lib/docs";
import { DocsSidebar } from "./components/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const documents = loadDocuments();
  return (
    <main id="content" className="docs-layout max-w-320 w-full mx-auto flex-1">
      <DocsSidebar documents={documents.map(({ title, category, href }) => ({ title, category, href }))} />
      <div className="docs-main">{children}</div>
    </main>
  );
}
