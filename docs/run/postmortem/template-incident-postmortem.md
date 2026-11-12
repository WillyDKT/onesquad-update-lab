---
id: TEMPLATE-INCIDENT-POSTMORTEM
title: "Incident Post-Mortem Template"
type: template
status: draft
tags: [support]
summary: "Template for documenting blameless incident post-mortems, timelines, root causes, and action items."
related: [docs/run/incident-reports/README.md]
updated: 2026-10-21
---
# Incident Post-Mortem: <Incident Title>

| Field | Value |
| :--- | :--- |
| Incident Date | YYYY-MM-DD |
| Severity | `SEV-1 (Critical)` \| `SEV-2 (Major)` \| `SEV-3 (Minor)` |
| Impact Duration | XX minutes |
| Incident Commander | Name |
| Responders | Names / Teams |
| Status | `Review Pending` \| `Finalized` |

## 1. Executive Summary

Briefly describe what happened, the customer/service impact, and how normal service was restored.

## 2. Customer & Business Impact

- **Affected Users/Systems**: e.g., Ingestion delayed for 15% of background events.
- **Data Loss**: Yes / No (explain).
- **SLA Breach**: Yes / No.

## 3. Detailed Timeline (UTC)

- **HH:MM** - Incident triggered / automated alert fires in Datadog.
- **HH:MM** - Incident Commander paged and acknowledges.
- **HH:MM** - Triage identifies connection pool exhaustion in Service A.
- **HH:MM** - Remediation applied (pool size increased, service restarted).
- **HH:MM** - Latency metrics return to normal; all queues clear.
- **HH:MM** - Incident closed.

## 4. Root Cause Analysis (5 Whys)

1. **Why did latency spike?** Ingestion requests were blocked waiting for database connections.
2. **Why were connections exhausted?** A burst of batch ingestion events exceeded the fixed connection limit.
3. **Why did the batch spike occur?** Upstream partner performed an unannounced catalog reload.
4. **Why was there no backpressure?** Ingestion queue was unbound and lacked rate limiting.
5. **Why was rate limiting missing?** Deferred during initial MVP scaffolding.

## 5. What Went Well vs. Where We Got Lucky vs. Where We Need Work

- **What went well**: Monitoring fired within 2 minutes of error threshold.
- **Where we need work**: Runbook lacked explicit instructions for scaling pool limits dynamically.

## 6. Action Items & Preventative Measures

| Action Item | Type | Owner | Ticket Name |
| :--- | :--- | :--- | :--- |
| Implement rate limiting on ingestion endpoint | Preventative | Service A Lead | Ingestion endpoint rate limiting |
| Add connection pool saturation alert | Detection | SRE Team | Connection pool saturation alerting |
| Update operational runbook | Process | SRE Team | Operational runbook update |
