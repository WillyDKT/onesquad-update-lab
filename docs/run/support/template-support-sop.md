---
id: TEMPLATE-SUPPORT-SOP
title: "Support SOP Template"
type: template
status: draft
tags: [support]
summary: "Template for authoring Standard Operating Procedures (SOPs) for support triage and escalation."
related: [docs/run/support/README.md]
updated: 2026-10-21
---
# Support SOP: <Procedure Title>

| Field | Value |
| :--- | :--- |
| Status | `Active` \| `Draft` |
| Support Tier | Tier 1 / Tier 2 |
| Estimated Resolution Time | < 30 minutes |
| Owner | Support Lead / Platform Team |

## Procedure Overview

Describe the incoming user request or ticket type this procedure addresses.

## Prerequisites

- Access to admin portal or API monitoring.
- Verification of requester's identity or team role.

## Triage & Resolution Steps

1. **Step 1: Validate Request**: Confirm requester is an authorized Decathlon team member.
2. **Step 2: Diagnosis**: Check if the reported issue matches a known active incident in `../postmortem/`.
3. **Step 3: Action**: Execute the resolution protocol.
4. **Step 4: Communication**: Reply to ticket with standard resolution template.

## Escalation Criteria

Escalate to Tier 3 Engineering if:
- Issue affects more than 3 distinct consumer teams.
- Suspected data corruption or unauthorized access.
- Resolution cannot be achieved within target SLA window.
