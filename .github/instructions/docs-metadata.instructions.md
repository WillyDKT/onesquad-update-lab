---
description: "Use when creating or editing any Markdown document under docs/. Covers required frontmatter metadata, tags, summaries, and links."
applyTo: "docs/**/*.md"
---
# Documentation metadata

- Start every document with the frontmatter defined in [the context map](../../docs/context-map.md): `id`, `title`, `type`, `status`, `tags`, `summary`, `related`, `updated`. Add `feature` to feature-specific documents; omit it for cross-cutting references and indexes.
- Use only tags listed in the context map taxonomy.
- Write a `summary` of one or two sentences that lets an agent decide whether to open the document. Quote it when it contains a colon.
- Reuse the `feature` slug of the related task so documents of the same feature can be found together.
- Link related documents with repository paths in `related` instead of copying their content.
- Start PRDs, epic breakdowns, user flows, and ADRs from the canonical templates linked by their folder README files.
- Keep documents concise: prefer tables and lists, and split documents that cover several features.
