---
name: knowledge-source-ingestion
description: Researches product and engineering knowledge in connected sources, verifies provenance and freshness, and curates durable findings into the appropriate repository documentation. Use when asked to ingest, explore, reconcile, or centralize knowledge from wikis, Google Docs or Slides, Collibra, LeanIX, GitHub, Jira, Sheets, memo files, or second-brain notes.
---

# Knowledge source ingestion

Use this workflow when the user asks to explore one or more knowledge sources and update this repository's shared documentation. This skill is written in English to provide a common workflow across the team. Write documentation in the language used by the target file unless the user explicitly requests another language; keep source terms and quotations faithful to their originals.

## 1. Establish scope and inspect the repository

- Identify the topic, intended audience, source links or source collection, time/version scope, and requested output. If a source or question is not specified, use the relevant sources already provided in the conversation and focus on the requested topic.
- Inspect the existing `docs` structure and relevant files before writing. Prefer improving the appropriate existing document over adding another file. Do not create broad placeholder content just to fill a folder.
- Keep structure setup separate from ingestion. If the user requests both, first use the companion [`docs-structure-setup`](../docs-structure-setup/SKILL.md) skill to initialize or reconcile the documentation framework, then continue this source-ingestion workflow. For ingestion-only requests, do not scaffold folders silently; use the existing structure and explain a blocking gap or ask whether the user wants setup.
- Keep work within the requested scope. Unless explicitly requested, change documentation only; do not change source records, connector settings, access controls, or application code.

## 2. Discover and inspect sources

Use the integrations and tools available in the current environment. Do not assume a connector exists because its source type is listed below, and do not rebuild connectors.

Supported source families include:

| Source | Capture and verify |
| --- | --- |
| Confluence or another wiki | Page title and stable URL/ID, version or modified date, page status, relevant child pages, and whether the page is authoritative or a working draft. |
| Google Docs | Document title and link, owner if available, modified/version information, and the specific sections supporting the finding. |
| Google Slides | Presentation title and link, owner/date if available, and slide numbers or titles supporting the finding. |
| Collibra | Asset name and stable link/ID, definition, stewardship/ownership, classification, and lifecycle status where available. |
| LeanIX | Fact sheet or object name and link/ID, responsible owner, lifecycle/status, and relevant relationships or architecture facts. |
| GitHub | Repository and file path, stable link or commit/ref, ownership metadata if present, and the relevant code or documentation evidence. |
| Jira | Project and issue key/link, status, relevant description/comments, and links to authoritative specifications. Treat tickets as evidence of tracked work or decisions, not automatically as the source of truth for product policy. |
| Google Sheets | Spreadsheet link/ID, tab and relevant range, owner/version or modified time if available, and whether values are entered, formula-derived, or imported. Avoid copying unnecessary rows or sensitive data. |
| Memo files and second-brain notes | File/note identity, location and date/version if available, cited original sources, and whether the note is verified, inferred, or awaiting review. Use notes as context and navigation aids, not automatic replacements for official sources. |

- Begin with durable notes and their citations, then verify material claims against the official source for that specific subject.
- Follow relevant links or parent/child documents when they clarify ownership, lineage, status, or definition. Keep exploration bounded to the user's topic.
- Use only content available under the current user's permissions. Never infer that access through an index or summary authorizes access to the original.
- If a tool is unavailable, access is denied, a page is empty, or content is incomplete, state that limitation and continue only with the evidence that is actually available.

## 3. Record evidence and uncertainty

For each source that materially supports the result, capture as much of the following as is available:

- source system and type;
- title and stable original link or identifier;
- owner or accountable team;
- last-modified/version information and date consulted;
- status (for example, approved, draft, superseded, unknown);
- the relevant section, page, slide, issue, asset, file, sheet tab/range, or commit;
- relationship to derived extracts or notes.

Mark unavailable values as `unknown`. Do not claim that a connector, permission, synchronization, or freshness check was tested unless it was actually tested.

Separate content into these categories where relevant:

- **Verified facts**: directly supported by a cited source.
- **Confirmed decisions**: explicitly approved by an accountable owner or clearly marked as accepted.
- **Source proposals**: drafts, recommendations, hypotheses, or proposed designs that are not confirmed decisions.
- **Interpretations**: conclusions inferred from evidence; label them and identify the evidence.
- **Open questions**: contradictions, missing owners, unresolved source-of-truth choices, or other items requiring validation.

When sources conflict, preserve the conflict, identify the differing sources and statuses, and record what needs confirmation. Do not choose a winner by recency alone or by assuming one system is globally authoritative. Authority is specific to the claim and domain.

## 4. Curate into repository documentation

Place findings in the most appropriate existing documentation area:

- `docs/architecture/`: system context, integrations, architecture decisions, and explicit gaps.
- `docs/data/`: source inventory, lineage, data contracts, definitions, and metrics.
- `docs/project/product/`: user needs, domain concepts, product rules, and validated product decisions.
- `docs/qa/`: validation criteria and test strategies grounded in requirements or approved designs.
- `docs/run/`: operational procedures only when approved; label unapproved operating models as proposals and make clear they are not executable runbooks.
- Existing glossaries, security, compliance, UX, or project areas when the material fits them better.

For every addition or substantive edit:

- Cite original sources close to the statements they support, using stable links.
- Preserve the distinction between an official source and derived/indexed context. Keep provenance; do not imply that centralization guarantees correctness or freshness.
- Include owner, version/modified time, validation state, or freshness only when known. Describe stale/unknown status without silently treating it as current.
- Add only durable, verified shared context. Clearly mark summaries and interpretations as unvalidated until an accountable reviewer approves them.
- Exclude credentials, personal data, confidential details, and other sensitive content unless the user explicitly authorizes an appropriate secure destination; never place secrets in repository documentation.
- Use the repository's existing language, format, and naming conventions. Prefer concise, maintainable documents with useful internal links; avoid duplicating the same source facts across files.
- Do not turn source-specific schedules, technologies, metrics, tags, or processes into platform-wide rules without explicit approval.

## 5. Validate and report

- Review the final diff and ensure every substantive factual claim has an appropriate source or is labeled as an open question/interpretation.
- Check relative links added or changed and run lightweight documentation checks available in the repository. Do not claim automated tests passed unless they were run.
- Report which sources were actually consulted and which could not be accessed, the files changed, validations performed, and material uncertainties or blockers.
- Do not commit, push, create a pull request, or modify external source systems unless the user explicitly asks.
