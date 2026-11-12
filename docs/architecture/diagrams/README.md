---
id: ARCH-DIAGRAMS-INDEX
title: "Architecture and Technical Diagrams"
type: index
status: published
tags: [architecture]
summary: "Visual architectural representations, Mermaid diagrams, and system component graphs."
related: [docs/architecture/README.md]
updated: 2026-10-21
---
# Architecture & Technical Diagrams

This directory contains system visual representations, C4 models, sequence flows, and process topologies for OneSquad.

## Diagram Format & Guidelines

1. **Mermaid Preferred**: All diagrams should be authored directly in Markdown files using native Mermaid code blocks (` ```mermaid `) so they are version-controlled, searchable, and natively rendered in GitHub and documentation viewers.
2. **Naming Convention**: `<domain>-<diagram-type>.md` (e.g. `ingestion-sequence-flow.md`, `system-context-c4.md`).
3. **Template**: Use [`template-diagram.md`](./template-diagram.md) when drafting new diagrams.

## Types of Diagrams

- **C4 System Context & Container Diagrams**: High-level system boundaries and component relationships.
- **Sequence Diagrams**: Request/response flows and asynchronous event interactions across services.
- **State Machine Diagrams**: Entity lifecycle transitions.
- **Data Flow Diagrams**: Pipeline flow from raw ingestion to storage and consumer retrieval.

## Registered Diagrams

| Title | Type | Scope | File |
| :--- | :--- | :--- | :--- |
| *End-to-End Context Pipeline* | Sequence Flow | System-wide | `pipeline-sequence-flow.md` |

