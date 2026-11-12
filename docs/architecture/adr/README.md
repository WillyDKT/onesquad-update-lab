---
id: ARCH-ADR-INDEX
title: "Architecture Decision Records"
type: index
status: published
tags: [architecture]
summary: "Index of Architecture Decision Records (ADRs) capturing significant technical and design choices."
related: [docs/architecture/README.md]
updated: 2026-10-21
---
# Architecture Decision Records (ADRs)

This directory contains the Architecture Decision Records (ADRs) for OneSquad.

Use this directory to record significant architectural, technical, and infrastructural decisions that impact the platform over time.

## When to write an ADR

Create an ADR when a decision:
- Introduces or removes a framework, database, queue, or major dependency;
- Changes inter-service communication patterns or data persistence strategies;
- Affects non-functional characteristics (scalability, security, resilience, consistency);
- Establishes a convention followed by multiple developers or sub-services.

*Minor implementation details or isolated bug fixes do not require an ADR.*

## Naming Convention

Name files using a sequential, zero-padded 4-digit number followed by a concise kebab-case title:
`0001-short-title.md`

Example:
- `0001-event-driven-architecture-with-kafka.md`
- `0002-mongodb-as-context-datastore.md`

## Standard ADR Structure

Start each new ADR from [`0000-template.md`](./0000-template.md).

Every ADR must include:
1. **YAML frontmatter** following the shared document metadata, including status, feature slug, owners, and related paths.
2. **Metadata table**: `Date`, `Owners`, `Reviewers`, `Scope`, `Related artifacts`, `Supersedes`, `Superseded by`.
3. **Context**: Background and problem statement.
4. **Decision Drivers**: Factors influencing the outcome.
5. **Considered Options**: Evaluated alternatives with pros and cons.
6. **Decision**: The selected option with explicit justification.
7. **Consequences**: Positive, negative/tradeoffs, and risks.
8. **Implementation Notes**: Steps and rollout strategy.
9. **Validation & Impact**: How the decision is verified.
10. **References**: Documentation, issues, benchmarks.

## Status Values

- `proposed`: Under discussion, not yet decided.
- `accepted`: Approved and binding for future development.
- `rejected`: Considered but decided against.
- `superseded`: Replaced by a newer ADR (must link successor).
- `deprecated`: Obsolete, no longer recommended.

## Current ADRs

| ADR | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| [0000](./0000-template.md) | ADR Template | Canonical | 2026-10-21 |
*(Add new ADRs above in numeric order)*

