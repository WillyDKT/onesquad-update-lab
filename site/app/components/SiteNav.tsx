"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { VpMenuIcon, VpCloseIcon, VpGroupIcon, VpArrowRightIcon } from "@vtmn-play/icons/react";
import { SITE, type SearchEntry } from "@/lib/site";
import { GlobalSearch } from "./GlobalSearch";
import { GithubIcon } from "./GithubIcon";

function DocsIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

export function SiteNav({ entries }: { entries: SearchEntry[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function dismiss(event: MouseEvent) {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("click", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [menuOpen]);

  function navigation() {
    return <>
      <Link href="/docs/" onClick={() => setMenuOpen(false)}
        aria-current={pathname.startsWith("/docs") ? "location" : undefined}>
        <DocsIcon />Docs
      </Link>
      <a href={SITE.community} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
        <VpGroupIcon aria-hidden="true" />Community
      </a>
      <a href={SITE.repository} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
        <GithubIcon />Contribute
      </a>
    </>;
  }

  return (
    <header ref={header} className="site-header sticky top-0 z-50 border-b border-border-quiet bg-background-main">
      <div className="max-w-320 mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <Link href="/" className="site-brand shrink-0" aria-label="OneSquad home">
          {/* Static export uses the original logo without an image optimization server. */}
          <img src="/assets/one-squad-logo-transparent.png" width="32" height="32" alt="" />
          <strong>One Squad</strong>
        </Link>
        <div className="ml-auto flex items-center justify-end gap-5 min-w-0 flex-1">
          <GlobalSearch entries={entries} />
          <Link className="primary-link getting-started-cta" href="/docs/tutorials/getting-started/"
            onClick={() => setMenuOpen(false)}>Getting started <VpArrowRightIcon aria-hidden="true" /></Link>
          <nav className="header-links" aria-label="Main navigation">{navigation()}</nav>
          <button ref={menuButton} type="button" className="mobile-menu-button" aria-controls="mobile-menu"
            aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <VpCloseIcon aria-hidden="true" /> : <VpMenuIcon aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" hidden={!menuOpen}>{navigation()}</nav>
    </header>
  );
}
