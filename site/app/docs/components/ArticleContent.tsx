"use client";

import { useState } from "react";

export function ArticleContent({ html, markdown }: { html: string; markdown: string }) {
  const [copyStatus, setCopyStatus] = useState("");
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied to clipboard");
    } catch (error) {
      console.error("Could not copy documentation:", error);
      setCopyStatus("Copy failed. Select and copy the text manually.");
    }
  }
  return <>
    <div className="article-tools">
      <button type="button" onClick={() => copy(markdown)}>Copy page</button>
      <span role="status">{copyStatus}</span>
    </div>
    <div className="prose-docs" dangerouslySetInnerHTML={{ __html: html }}
      onClick={(event) => {
        const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-copy-code]");
        const code = button?.parentElement?.querySelector("code");
        if (code) void copy(code.textContent ?? "");
      }} />
  </>;
}
