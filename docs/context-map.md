---
id: CONTEXT-MAP
title: OneSquad shared context map and tagging rules
type: guide
status: approved
tags: [docs, product, design, dev, architecture, support]
summary: "How contributors and AI tools find relevant project context through metadata, links, feature slugs, and discipline-specific starting points."
related: [README.md, docs/project/README.md, docs/project/sdlc-bmad.md, AGENTS.md]
updated: 2026-10-29
---
# Context map

OneSquad organizes shared product and engineering context beside the code in one repository. Contributors and AI tools follow links and metadata to find relevant knowledge rather than reading everything. External sources can remain authoritative; preserve their provenance instead of presenting local summaries as automatically current.
Add this line just to test.

## Document metadata

Every Markdown document under `docs/` starts with YAML frontmatter:

```yaml
---
id: EPIC-0001                # Examples: PRD-0001, EPIC-0001, FLOW-search, ADR-0001
title: "Short title"
type: epic                   # prd | epic | flow | adr | data-model | runbook | guide | ...
status: draft                # Lifecycle status for the document type (see templates)
tags: [product, dev]         # Area tags from the taxonomy below
feature: feature-slug        # Required for feature documents; omit for cross-cutting docs
summary: "One or two sentences explaining the document's relevance."
related: []                  # Repository paths of linked documents
updated: YYYY-MM-DD
---
```

- `summary` is mandatory: readers and AI tools use it before opening the full document.
- `feature` links every document of a feature (PRD, epic, flow, ADR) without a central index. It is required for feature documents and omitted for cross-cutting references and indexes.
- `related` gives explicit paths so agents follow links instead of searching broadly.
- Canonical templates are `template-prd.md`, `template-task-epic.md`, `template-user-flow.md`, and `0000-template.md`; agents ignore template files when searching for existing content.

## Tag taxonomy

| Tag | Meaning | Main locations |
| --- | --- | --- |
| `product` | Business needs, rules, specs, tickets, roadmap | `docs/product/`, `docs/project/`, `docs/glossaries/product.md` |
| `design` | User flows, UX research, design system | `docs/ux-ui/`, `apps/mockup/` |
| `architecture` | Technical decisions, APIs, data models, diagrams | `docs/architecture/`, `docs/glossaries/tech.md` |
| `dev` | Implementation, code conventions, tests | `apps/`, `docs/qa/` |
| `data` | KPIs and tracking | `docs/data/` |
| `support` | Operations, incidents, runbooks, support | `docs/run/`, `docs/glossaries/run.md` |
| `security` | Security and compliance constraints | `docs/security/`, `docs/compliance/`, `docs/glossaries/security.md` |
| `qa` | Test strategy and suites | `docs/qa/` |
| `docs` | Cross-cutting guides about the repository itself | `docs/context-map.md`, `docs/project/sdlc-bmad.md` |

A document may have several tags. Add a new tag only after updating this table.

## Starting points by discipline

These are navigation aids, not access restrictions or required agent profiles. Start with the area relevant to the request and widen the scope through linked documents.

| Discipline | Starting tags | Relevant context | Usually outside the initial scope |
| --- | --- | --- | --- |
| Product Manager | `product`, `data` | `docs/product/`, `docs/project/`, `docs/data/`, product glossary | Application code |
| Product Designer | `design`, `product` | Linked spec and task, `docs/ux-ui/`, `apps/mockup/` | Back-end code, architecture internals |
| Engineering | `dev`, `architecture`, `qa` | Linked task, spec, and flow, `docs/architecture/`, relevant code and tests | Unrelated features, roadmap |
| Support / operations | `support`, `security` | `docs/run/`, relevant code, tests, and docs for the reported issue | Unrelated features |
| Data / analytics | `data`, `product` | `docs/data/`, linked product rules and relevant code | Unrelated features |
| Documentation contributors | All, limited to the changed feature | Documents sharing the `feature` slug, changed code | Unrelated features |

`security` constraints apply to every contributor and AI tool whenever a task handles personal data, credentials, or access control.

## Context loading procedure

1. **Start from the request.** For feature work, identify the epic ID (`EPIC-XXXX`) or feature slug when available. For orientation or a cross-cutting question, start from the relevant README; do not require an epic.
2. **Follow the entry point.** Read the epic in `docs/project/tasks/` when one exists, then its `prd`, `design`, and `related` paths. Otherwise follow the relevant index and explicit source links.
3. **Search by metadata.** To find other documents, search `docs/` for `feature: <slug>` first when applicable, then for relevant discipline tags.
4. **Read summaries first.** Open a full document only when its `summary` is relevant.
5. **Inspect only relevant code.** For code, start from the paths named in the task or ADR, then nearby tests.
6. **Skip noise.** Never load dependency folders, build outputs, lock files, binaries, or generated files.
7. **Record gaps.** If an expected document is missing or empty, state it and add an open question instead of inventing content.
8. **Share by reference.** When passing work to another contributor or tool, give file paths and a short summary; do not make a conversation the only record of a decision.
