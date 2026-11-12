"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/docs";

export function TocSidebar({ headings, editUrl }: { headings: Heading[]; editUrl: string }) {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: "-100px 0px -65% 0px" });
    document.querySelectorAll(".prose-docs h2[id], .prose-docs h3[id]").forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [headings]);
  return (
    <nav className="article-toc" aria-label="On this page">
      <p>On this page</p>
      <ul>{headings.map((heading) => <li key={heading.id} className={heading.level === "h3" ? "nested" : undefined}>
        <a href={`#${heading.id}`} aria-current={activeId === heading.id ? "location" : undefined}>{heading.title}</a>
      </li>)}</ul>
      <a className="edit-link" href={editUrl} target="_blank" rel="noopener noreferrer">Edit this page ↗</a>
    </nav>
  );
}
