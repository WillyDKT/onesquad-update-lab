"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { VpSearchIcon, VpCloseIcon } from "@vtmn-play/icons/react";
import type { SearchEntry } from "@/lib/site";

export function GlobalSearch({ entries }: { entries: SearchEntry[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");

  function open() {
    dialog.current?.showModal();
    input.current?.focus();
  }
  function close() {
    dialog.current?.close();
    setQuery("");
    trigger.current?.focus();
  }
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        dialog.current?.showModal();
        input.current?.focus();
      }
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = words.length ? entries.filter((entry) => {
    const text = `${entry.title} ${entry.summary} ${entry.text}`.toLowerCase();
    return words.every((word) => text.includes(word));
  }).sort((a, b) => Number(b.title.toLowerCase().includes(query.toLowerCase()))
    - Number(a.title.toLowerCase().includes(query.toLowerCase()))) : entries;

  return <>
    <button ref={trigger} className="search-trigger" type="button" onClick={open} aria-haspopup="dialog" aria-label="Search OneSquad">
      <VpSearchIcon aria-hidden="true" /><span>Search</span><kbd>⌘K</kbd>
    </button>
    <dialog ref={dialog} className="search-dialog" aria-labelledby="search-title"
      onCancel={() => { setQuery(""); }}
      onClick={(event) => { if (event.target === dialog.current) close(); }}>
      <div className="search-dialog-heading">
        <h2 id="search-title">Search OneSquad</h2>
        <button type="button" className="icon-button" aria-label="Close search" onClick={close}><VpCloseIcon aria-hidden="true" /></button>
      </div>
      <label className="sr-only" htmlFor="global-search">Search all documentation</label>
      <input ref={input} id="global-search" type="search" value={query} autoComplete="off"
        placeholder="Search guides, concepts, and documentation…" onChange={(event) => setQuery(event.target.value)} />
      <p className="search-count" role="status">{results.length} result{results.length === 1 ? "" : "s"}</p>
      <ul className="search-results">
        {results.map((entry) => <li key={entry.href}>
          <Link href={entry.href} onClick={close}>
            <small>{entry.category}</small><strong>{entry.title}</strong><span>{entry.summary}</span>
          </Link>
        </li>)}
      </ul>
      {!results.length && <p className="empty-search">No results for “{query}”. Try a different term.</p>}
    </dialog>
  </>;
}
