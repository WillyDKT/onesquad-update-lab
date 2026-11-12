---
description: "Use when writing architecture decision records (ADR), API descriptions, data models, or diagrams in docs/architecture/."
applyTo: "docs/architecture/**"
---
# Architecture documents

- ADRs go in `docs/architecture/adr/NNNN-<decision-slug>.md`, using the next four-digit ID and starting from `0000-template.md`.
- Record a decision only when it affects more than one component, is hard to reverse, or chooses between real alternatives.
- Never edit an accepted ADR to change its decision: create a new ADR and mark the old one `superseded`.
- Keep API descriptions in `docs/architecture/api/` and data models in `docs/architecture/data-models/`, consistent with the implemented code.
