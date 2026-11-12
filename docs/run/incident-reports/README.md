---
id: RUN-INCIDENTS-INDEX
title: "Incident Reports and Post-Mortems"
type: index
status: published
tags: [support]
summary: "Blameless post-mortem records, root-cause analyses, and incident remediation tracking."
related: [docs/run/README.md]
updated: 2026-10-21
---
# Incident Reports & Post-Mortems

This directory contains blameless post-mortem reports for production incidents in OneSquad.

## Naming Conventions

All post-mortem files must be named using the date of occurrence:
`YYYY-MM-DD-incident-title.md`

Example:
- `2026-11-15-service-a-ingestion-latency-spike.md`

## Standard Post-Mortem Structure

Start each new report from [`template-incident-postmortem.md`](./template-incident-postmortem.md).

Every report must include:
1. **Metadata table**: Incident date, severity (SEV-1 to SEV-3), duration, incident commander, responders.
2. **Summary**: Executive overview of user impact.
3. **Timeline**: UTC-based breakdown of events from detection to mitigation.
4. **Root Cause Analysis (5 Whys)**.
5. **Detection & Response Analysis**: How the alert fired and what delayed recovery.
6. **Corrective Action Items**: Preventative measures with owners and issue links.

## Incident Reports Index

| Date | Incident Title | Severity | Impact Duration | Report File |
| :--- | :--- | :--- | :--- | :--- |
| *YYYY-MM-DD* | Example Incident | SEV-2 | 45m | `YYYY-MM-DD-example.md` |

