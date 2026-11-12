---
id: ARCH-API-INDEX
title: "API Specifications and Contracts"
type: index
status: published
tags: [architecture, dev]
summary: "API specifications, OpenAPI contracts, and inter-service communication interfaces."
related: [docs/architecture/README.md]
updated: 2026-10-21
---
# API Specifications & Contracts

This directory contains interface contracts and API specifications for implemented OneSquad interfaces. The current API application is `apps/API`; document other interfaces only when their implementation and ownership are confirmed.

## Scope & Purpose

Use this directory to define:
- RESTful HTTP API contracts (OpenAPI 3.x specifications);
- Asynchronous messaging / event schemas (AsyncAPI specifications);
- gRPC Protocol Buffer contracts (`.proto` files or accompanying documentation).

## Naming Conventions

- OpenAPI specs: `openapi-<service-name>.yaml` (e.g. `openapi-api.yaml`)
- AsyncAPI specs: `asyncapi-<service-name>.yaml` (e.g. `asyncapi-events.yaml`)
- Contract overviews: `<service-name>-api-overview.md`

## Versioning & Governance

1. **Semantic Versioning**: All API contracts must adhere to Semantic Versioning (`major.minor.patch` in `info.version`).
   - `Patch`: Bug fixes, descriptions, non-breaking schema clarifications.
   - `Minor`: Backward-compatible additions (new endpoints, optional request properties, new response fields).
   - `Major`: Breaking changes (removed endpoints, changed types, required new parameters).
2. **Backward Compatibility**: Prefer additive changes. Breaking changes must follow a deprecation window and be approved via an ADR.
3. **Template**: When introducing a new API or drafting an overview, start from [`template-api-contract.md`](./template-api-contract.md).

## Registered API Contracts

| Service / Interface | Protocol | Specification File | Version | Status |
| :--- | :--- | :--- | :--- | :--- |
| `apps/API` | REST | Not registered | - | No contract documented |

