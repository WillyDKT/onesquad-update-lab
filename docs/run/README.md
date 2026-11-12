---
id: RUN-INDEX
title: "Run, Operations and SRE Documentation"
type: index
status: published
tags: [support]
summary: "Site reliability engineering, operational runbooks, post-mortems, and support SOPs."
related: [docs/run/runbooks/README.md, docs/run/incident-reports/README.md, docs/run/postmortem/template-incident-postmortem.md, docs/run/support/README.md]
updated: 2026-10-21
---
# Run, Operations & SRE Documentation

This directory centralizes operational documentation, SRE runbooks, support procedures, and incident post-mortems for OneSquad.

## Subdirectories

- [`postmortem/`](postmortem/template-incident-postmortem.md): Post-incident reviews, timelines, root-cause analyses, and action items.
- [`runbooks/`](./runbooks/README.md): Operational procedures, alerts triage, health checks, and restart runbooks.
- [`support/`](./support/README.md): Customer support standard operating procedures, escalation matrices, and issue triage.

## Operational Principles

1. **Blameless Culture**: Incident reviews focus on system and process improvements, never personal fault.
2. **Actionable Runbooks**: Every operational alert must link directly to a runbook in `runbooks/`.
3. **Continuous Improvement**: Every post-mortem must result in tracked remediation tasks in `docs/project/tasks/`.

