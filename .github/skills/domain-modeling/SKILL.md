---
name: domain-modeling
description: Refine OneSquad terminology and domain boundaries, and record resolved terms or significant architectural decisions in the existing project documentation.
---

# Domain Modeling

Use this skill when a conversation or change affects OneSquad business
language, domain boundaries, data concepts, or architectural decisions. Do not
invoke it just to read or summarize existing documentation.

## Establish the current model

Before proposing a change, read `docs/glossary.md` and the most relevant
functional, architecture, data-model, and ADR documents. When behavior is
discussed, inspect the related code as well.

Use the glossary's canonical terms. If a term conflicts with the glossary, or
could refer to multiple concepts, surface the conflict and ask which meaning is
intended. Do not silently introduce synonyms or redefine settled language.

## Sharpen the model

When a concept or boundary is unclear:

- Propose a precise term and distinguish it from nearby concepts.
- Test relationships with concrete OneSquad scenarios, including boundary
  cases and exceptions.
- Compare stated behavior with relevant code and documentation. Report
  contradictions and ask which source reflects the intended model.
- Keep unresolved assumptions visible; do not document them as settled facts.

## Record resolved terminology

When a domain term is resolved, update `docs/glossary.md` in the same work
session. Preserve its frontmatter, section organization, and table conventions.
Add only OneSquad-specific business or domain concepts; do not add
implementation details or general programming terminology.

Keep definitions concise and state what a concept is. Where multiple names
compete, choose the canonical term and record alternatives only when that
distinction helps prevent future confusion.

## Record architectural decisions sparingly

Offer an ADR only when the decision is difficult to reverse, surprising
without context, and the result of a genuine trade-off. If any condition is
missing, do not create an ADR.

When an ADR is warranted:

- Add it under `docs/04-adrs/`, following the existing ADR frontmatter,
  numbering, and structure.
- Find the next number by checking the existing ADR files.
- Record the context, decision, and rationale; include alternatives or
  consequences only when they preserve useful reasoning.
- Link relevant specifications and technical documents using repository-
  relative paths.

Do not overwrite an existing glossary definition or decision to resolve a
conflict without first confirming the intended change.

