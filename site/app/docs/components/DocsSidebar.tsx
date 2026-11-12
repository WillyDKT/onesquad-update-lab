"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { VpChevronDownIcon, VpHomeIcon } from "@vtmn-play/icons/react";
import { categories } from "@/lib/site";

interface NavItem { title: string; category: string; href: string }

export function DocsSidebar({ documents }: { documents: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <aside className="docs-sidebar">
      <button className="docs-mobile-toggle" aria-expanded={open} aria-controls="docs-navigation" onClick={() => setOpen(!open)}>
        Documentation <VpChevronDownIcon aria-hidden="true" />
      </button>
      <nav id="docs-navigation" className={open ? "docs-navigation is-open" : "docs-navigation"} aria-label="Documentation">
        <p className="sidebar-title">OneSquad</p>
        <Link href="/docs/" className="sidebar-overview" aria-current={pathname === "/docs/" ? "page" : undefined}
          onClick={() => setOpen(false)}><VpHomeIcon aria-hidden="true" />Overview</Link>
        {categories.map((category) => (
          <details key={category.id} open>
            <summary>{category.title}<VpChevronDownIcon aria-hidden="true" /></summary>
            <ul>{documents.filter((doc) => doc.category === category.id).map((doc) => (
              <li key={doc.href}><Link href={doc.href} aria-current={pathname === doc.href ? "page" : undefined}
                onClick={() => setOpen(false)}>{doc.title}</Link></li>
            ))}</ul>
          </details>
        ))}
      </nav>
    </aside>
  );
}
