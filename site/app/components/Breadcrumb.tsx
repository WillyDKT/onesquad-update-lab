"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/site";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="max-w-320 mx-auto px-4 md:px-6 flex items-center gap-2">
        <li><Link href="/">Home</Link></li>
        {segments.map((segment, index) => {
          const label = segment === "docs" ? "Docs" : categories.find((category) => category.id === segment)?.title
            ?? segment.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ");
          return <li key={index}><span aria-hidden="true">/</span><Link
            href={`/${segments.slice(0, index + 1).join("/")}/`}
            aria-current={index === segments.length - 1 ? "page" : undefined}>{label}</Link></li>;
        })}
      </ol>
    </nav>
  );
}
