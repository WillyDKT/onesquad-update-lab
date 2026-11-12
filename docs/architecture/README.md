---
id: ARCH-INDEX
title: "Architecture Documentation"
type: index
status: published
tags: [architecture]
summary: "System architecture, design principles, ADRs, API contracts, and data models for OneSquad."
related: [docs/context-map.md, docs/README.md]
updated: 2026-10-21
---
# Architecture Documentation

This directory centralizes all architectural documentation, design decisions, interface specifications, and visual diagrams for OneSquad.

## Subdirectories

- [`adr/`](./adr/README.md): Architecture Decision Records (ADRs). Use for tracking major structural, framework, storage, or protocol choices.
- [`api/`](./api/README.md): API contracts and service specifications (OpenAPI, AsyncAPI, gRPC).
- [`data-models/`](./data-models/README.md): Canonical data models, entity relationships, and payload schemas.
- [`diagrams/`](./diagrams/README.md): System architecture diagrams, sequence diagrams, and flowcharts (Mermaid format).

## Current Applications

The repository currently contains:
- `apps/API`: Spring Boot API application.
- `apps/Front`: Next.js frontend application.
- `apps/mockup`: Vite/React prototype.

These paths describe the repository layout, not a confirmed production topology. Document service boundaries, data flows, and deployment architecture only after they are verified with the implementation and system owners.

### Architectural Principles
1. **Loose Coupling & Explicit Contracts**: All inter-service communications must be governed by contracts defined in `docs/architecture/api/`.
2. **Document Decisions as ADRs**: Any decision with cross-cutting consequences, non-trivial tradeoffs, or permanent implications requires an ADR in `docs/architecture/adr/`.
3. **Diagrams as Code**: Architectural diagrams must be written using Mermaid markdown in `docs/architecture/diagrams/` to ensure version controllability and easy updates.

