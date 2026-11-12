# Repository skills

Repository skills are versioned with this repository and can be loaded by supported GitHub Copilot surfaces when working in the project. They provide reusable task instructions; they do not grant access to source systems or install connectors.

## Documentation workflow

The repository keeps structure setup and source ingestion as separate, composable skills:

1. Use [`docs-structure-setup`](./docs-structure-setup/SKILL.md) to initialize or reconcile `docs/`, folder READMEs, indexes, templates, and metadata conventions.
2. Use [`knowledge-source-ingestion`](./knowledge-source-ingestion/SKILL.md) to research sources and curate verified findings into the established structure.

When a request needs both, ask Copilot to run the structure setup first and then ingest the named sources. For an ingestion-only request, the ingestion skill checks the current structure and avoids broad scaffolding unless setup was requested.

Example:

> Use `docs-structure-setup` to check and complete this repository's documentation structure. Then use `knowledge-source-ingestion` to research [topic] in [source links] and update the relevant documentation.

## Knowledge source ingestion

Use the `knowledge-source-ingestion` skill to research approved knowledge sources and turn verified, durable findings into linked documentation under `docs`.

In Copilot, open this repository and ask, for example:

> Use the `knowledge-source-ingestion` skill to document the product ownership and source lineage for [topic]. Check [source links] and update the relevant files under `docs`.

The skill may be loaded automatically when a request matches its description. Naming it in the prompt makes the intent explicit. Availability depends on the Copilot surface and its support for repository skills.

Each user still needs permission to the repository and to any source systems involved. Required source connectors must also be available and configured in that user's environment. The skill neither provisions access nor bypasses source permissions.

## Ticket writing

Use the [`ticket`](./ticket/SKILL.md) skill when drafting, refining, or splitting a Jira or GitHub issue. It checks available product context and repository evidence, uses the agreed French ticket format, and never claims to create an external issue without a configured integration and confirmed success.

## Documentation structure setup

Use `docs-structure-setup` when a repository needs its documentation folders, local READMEs/indexes, metadata standards, or starter templates initialized or reconciled. It uses the current repository's `docs/README.md` and folder instructions as the source of truth and preserves existing content.
