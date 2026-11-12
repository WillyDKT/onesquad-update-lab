---
name: docs-structure-setup
description: Bootstraps or reconciles a repository documentation structure under docs, including domain folders, self-describing README indexes, standard templates, metadata conventions, and internal links. Use when asked to create, initialize, complete, or standardize a project's documentation folders and starter files.
---

# Documentation structure setup

Use this skill to initialize or reconcile a repository's documentation framework. It owns the structure and starter files, not the research or ingestion of substantive product knowledge. For source research and content curation, continue with the companion `knowledge-source-ingestion` skill after the structure is ready.

## 1. Inspect before scaffolding

- Inspect repository instructions, existing `docs` content, folder READMEs, templates, and naming conventions before making changes.
- If `docs/README.md` exists, treat its scope, language, metadata, and lifecycle conventions as authoritative unless they conflict with more specific folder instructions.
- If the structure is already present, audit it and fill only genuine gaps. Do not replace, reset, or regenerate existing documents, even if they are incomplete; preserve user-authored content and edit it carefully when alignment is requested.
- If repository instructions conflict, follow the most specific current instruction and record unresolved conflicts rather than silently choosing a new standard.
- Confirm that the request includes creating/reconciling structure. Do not expand a content-ingestion request into a broad scaffold unless the user asked for setup or explicitly directed the linked workflow.

## 2. Apply the OneSquad documentation model

For this repository, use the existing `docs/README.md` as the canonical blueprint. Its domain folders are:

| Area | Use for |
| --- | --- |
| `docs/architecture/` | System context, decisions, API contracts, data models, and diagrams. |
| `docs/compliance/` | License, legal, and privacy compliance records. |
| `docs/data/` | Data definitions, lineage, governance, metrics, and tracking plans. |
| `docs/glossaries/` | Product, technical, security, and operations terminology. |
| `docs/project/product/` | Product requirements, functional specifications, and training. |
| `docs/project/` | Roadmaps and delivery tasks. |
| `docs/qa/` | Test strategy, test suites, and quality evidence. |
| `docs/run/` | Approved operational runbooks, support procedures, and incident reviews. |
| `docs/security/` | Security policy, threat models, and penetration-test records. |
| `docs/ux-ui/` | Design systems, user flows, and user research. |

Preserve the established subfolders and their README/template files. When initializing an empty `docs` folder, use the repository's existing documentation files as the starter model rather than inventing new categories or unsupported project facts.

## 3. Create a usable documentation foundation

- Create a root `docs/README.md` describing the tree, folder purposes, and cross-cutting authoring conventions.
- Ensure each domain and specialized subfolder has a `README.md` that states what belongs there, boundaries, naming, required sections/statuses, and an index of active documents.
- Reuse or add the relevant templates following local names and structures. In this repository, the canonical template families include:
  - `architecture/adr/0000-template.md`, `architecture/api/template-api-contract.md`, `architecture/data-models/template-data-model.md`, and `architecture/diagrams/template-diagram.md`;
  - `compliance/gdpr/template-dpia.md`;
  - `data/tracking-plan/template-tracking-event.md`;
  - `product/specs/template-prd.md` and `product/training/template-training-guide.md`;
  - `project/roadmap/template-roadmap.md` and `project/tasks/template-task-epic.md`;
  - `qa/test-suites/template-test-suite.md`;
  - `run/incident-reports/template-incident-postmortem.md`, `run/runbooks/template-runbook.md`, and `run/support/template-support-sop.md`;
  - `security/pentests/template-pentest-report.md` and `security/threat-modeling/template-threat-model.md`;
  - `ux-ui/design-system/template-component-spec.md`, `ux-ui/flows/template-user-flow.md`, and `ux-ui/research/template-user-research.md`.
- Every formal document should follow the repository's standard metadata fields: `Status`, `Date`, `Owners`, `Reviewers`, `Scope`, and `Related Artifacts`, plus any folder-specific fields.
- In this repository, documentation is English-only; use the English conventions defined in `docs/README.md`.
- Use folder-specific names and formats. For example, product specifications use the next available `PRD-XXXX-<feature>.md` ID and PRD template; ADRs belong in `docs/architecture/adr/`; runbooks are operational and executable, not a place for unapproved proposals.
- Maintain each local README index whenever a document or template is added, renamed, moved, or deprecated. Use `N/A` or an explicit `To be confirmed` value rather than inventing owners, approval, status, metrics, or project content.
- Prefer useful READMEs and templates over empty placeholder files. Add `.gitkeep` only when an otherwise-empty directory must be preserved and no README/template already keeps it in version control.
- Do not fill starter templates with fabricated requirements, source inventories, owners, approvals, integrations, or KPIs.

## 4. Preserve existing content and boundaries

- Do not delete or move existing user content merely to make the tree match the blueprint. If a document is in the wrong category, preserve its content and explain the proposed move before applying a material reorganization unless the user expressly requested normalization.
- Do not make irreversible changes, replace whole directory trees, or overwrite README/template contents without comparing and integrating the existing intent.
- Do not create an ADR unless a real architectural decision meets the repository's ADR criteria.
- Do not add source research, copy sensitive information, or assert that integrations are configured; leave those tasks to `knowledge-source-ingestion` and use only the user's authorized sources.
- Keep setup scoped to documentation files and folders unless the user specifically asks for additional repository configuration.

## 5. Validate and report

- Check that every index entry points to an existing file and that relative Markdown links resolve.
- Check required templates, metadata guidance, naming examples, and status values for consistency between the root README, local READMEs, and templates.
- Review the diff and verify no existing content was unintentionally overwritten or removed.
- Report folders/files created or reconciled, validations performed, and any remaining decisions or source content intentionally left blank.
- Do not commit, push, or create a pull request unless explicitly requested.

## Companion workflow

After structure setup, use `knowledge-source-ingestion` to populate the right documents from verified sources. Keep scaffolding and research as separate steps: first establish the repository's information architecture, then curate content into it.

