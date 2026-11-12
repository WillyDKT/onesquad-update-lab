import Link from "next/link";

export default function NotFound() {
  return <main id="content" className="docs-overview max-w-320 mx-auto flex-1">
    <p className="eyebrow">404</p><h1>Page not found</h1><p>This page does not exist. Browse the documentation or use search to find the right guide.</p>
    <Link href="/docs/" className="primary-link">Browse documentation →</Link>
  </main>;
}
