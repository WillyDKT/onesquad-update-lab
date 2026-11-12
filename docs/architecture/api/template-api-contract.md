---
id: TEMPLATE-API-CONTRACT
title: "API Contract Specification Template"
type: template
status: draft
tags: [architecture, dev]
summary: "Template for documenting REST/GraphQL/gRPC API endpoints, schemas, authentication, and error codes."
related: [docs/architecture/api/README.md]
updated: 2026-10-21
---
# API Contract Specification: <Service or Domain Name>

| Field | Value |
| :--- | :--- |
| Status | `Draft` \| `Proposed` \| `Accepted` \| `Deprecated` |
| Version | `1.0.0` (SemVer) |
| Protocol | REST (OpenAPI 3.0) / Event-driven (AsyncAPI) / gRPC |
| Owner | Team / Service lead |
| Target Service / Component | `<verified repository path or system name>` |
| Related ADRs | Link to ADRs or `N/A` |

## Overview & Purpose

Provide a summary of the capabilities provided by this API and its consumers.

## Base URLs & Environments

- **Local Development**: `<verified local base URL or N/A>`
- **Staging / Preprod**: `<verified base URL or N/A>`
- **Production**: `<verified base URL or N/A>`

## Authentication & Authorization

Examples of possible schemes follow; document only the mechanisms confirmed for this interface:
- OAuth2 Bearer token (JWT)
- API Key / Internal Service token
- Required scopes or roles

## Core Endpoints & Resources

| Method | Endpoint | Summary | Auth Required |
| :--- | :--- | :--- | :--- |
| `<HTTP method>` | `<verified path>` | `<behavior>` | `<confirmed requirement>` |

## Key Error Codes & Format

Document the error format and status codes implemented by this interface; do not assume a standard unless it is confirmed.

## Specification File Link

- Full specification file: [`./openapi-<service>.yaml`](#)
