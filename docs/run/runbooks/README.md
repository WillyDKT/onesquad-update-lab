---
id: RUN-RUNBOOKS-INDEX
title: "Operational Runbooks"
type: index
status: published
tags: [support]
summary: "Executable operational runbooks, service maintenance procedures, and incident recovery steps."
related: [docs/run/README.md]
updated: 2026-10-21
---
# Operational Runbooks

This directory contains executable, step-by-step procedures and troubleshooting guides for OneSquad operational components.

## Naming Conventions

- Runbook files: `runbook-<service-or-process>-<issue>.md`
- Examples: `runbook-service-a-high-memory.md`, `runbook-database-failover.md`
- Template: [`template-runbook.md`](./template-runbook.md)

## Runbook Principles

1. **Clear Trigger / Symptom**: The alert name or metric condition that activates this procedure.
2. **Copy-Pastable Commands**: Provide exact CLI, curl, or kubectl commands where possible.
3. **Rollback & Verification**: Always include verification checks and rollback instructions.

## Runbooks Index

| Service / Topic | Trigger / Alert | Criticality | File |
| :--- | :--- | :--- | :--- |
| *Service A* | High Ingestion Latency | High | `runbook-service-a-latency.md` |
| *Service B* | Search Timeout Spikes | High | `runbook-service-b-search-timeout.md` |

