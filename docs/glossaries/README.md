---
id: GLOSSARY-INDEX
title: "Glossaries Index"
type: index
status: published
tags: [docs, product, architecture, support, security]
summary: "Normalized dictionaries and definitions across Product, Tech, Run, and Security."
related: [docs/glossaries/product.md, docs/glossaries/tech.md, docs/glossaries/run.md, docs/glossaries/security.md]
updated: 2026-10-21
---
# Glossaries

This directory maintains domain-specific terminology dictionaries for the OneSquad ecosystem.

## Glossary Documents

| Glossary | Purpose | File |
| :--- | :--- | :--- |
| **Product** | Business concepts, customer domain entities, functional terminology | [`product.md`](./product.md) |
| **Technical** | Infrastructure, microservice patterns, protocols, data architectures | [`tech.md`](./tech.md) |
| **Security** | Vulnerability classifications, cryptographic standards, IAM terms | [`security.md`](./security.md) |
| **Run & Operations** | SRE terms, metrics (SLA, SLO, SLI, MTBF, MTTR), alert severities | [`run.md`](./run.md) |

## Maintenance Rules

1. **Alphabetical Order**: Keep all entries within each file sorted alphabetically (A-Z).
2. **Clear Boundaries**:
   - If a term describes business logic or user persona, place it in `product.md`.
   - If a term describes software architecture or coding pattern, place it in `tech.md`.
   - If a term relates to risk, authentication, or compliance, place it in `security.md`.
   - If a term relates to deployment, observability, or operational incidents, place it in `run.md`.
3. **Format**: Use clean Markdown bold definitions:
   ```markdown
   ### Term Name
   **Definition**: Concise explanation of the concept within OneSquad.
   **Context / Usage**: Examples, related components, or systems.
   ```
4. **No Duplicate Definitions**: Do not duplicate a term across multiple glossaries; cross-link when concepts overlap.

