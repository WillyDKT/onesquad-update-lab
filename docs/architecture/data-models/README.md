---
id: ARCH-DATA-MODELS-INDEX
title: "Data Models and Schemas"
type: index
status: published
tags: [architecture, data]
summary: "Canonical data models, entity relationships, and database schema definitions."
related: [docs/architecture/README.md]
updated: 2026-10-21
---
# Data Models & Schemas

This directory maintains the canonical data models, document structures, and relational schemas used across OneSquad.

## Scope & Purpose

Document:
- Canonical domain entities and their relationships;
- NoSQL document structures (e.g. MongoDB collections, JSON Schemas);
- Relational table schemas (PostgreSQL / SQLite);
- Ingestion and egress data payloads.

## Naming Conventions

- Conceptual model document: `<domain>-model.md` (e.g. `context-entity-model.md`)
- Machine-readable schema: `<entity-name>.schema.json`
- Template: [`template-data-model.md`](./template-data-model.md)

## Modeling Principles

1. **Domain-Driven Design**: Align model boundaries with bounded contexts.
2. **Immutability & Auditability**: Where relevant, record audit fields (`createdAt`, `updatedAt`, `version`, `createdBy`).
3. **Validation**: Document constraints, nullable fields, and value ranges explicitly.

## Index of Data Models

| Model | Domain | Target Datastore | Status | File |
| :--- | :--- | :--- | :--- | :--- |
| *Context Entity* | Core | MongoDB / Document store | Draft | `context-entity.md` |

