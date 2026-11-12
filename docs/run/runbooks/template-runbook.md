---
id: TEMPLATE-RUNBOOK
title: "Operational Runbook Template"
type: template
status: draft
tags: [support]
summary: "Template for documenting operational procedures, incident mitigation, and service recovery steps."
related: [docs/run/runbooks/README.md]
updated: 2026-10-21
---
# Runbook: <Service / Process Name> - <Symptom / Scenario>

| Field | Value |
| :--- | :--- |
| Status | `Active` \| `Draft` \| `Deprecated` |
| Service / Component | `<verified repository path or system name>` |
| Alert Name | `<configured alert or N/A>` |
| Severity | `P1 (Critical)` \| `P2 (High)` \| `P3 (Medium)` |
| Last Verified | YYYY-MM-DD |

## 1. Symptom & Alert Criteria

Explain what alert triggers this runbook, what metrics to inspect, and the immediate symptoms.
- **Dashboard**: `<verified link or N/A>`
- **Monitors**: `<configured monitors or N/A>`

## 2. Quick Assessment & Triage

Use only approved, environment-specific commands documented and tested by the service owner:

```bash
# <verified, non-destructive health check>
```

Inspect relevant logs using the approved platform and query:
```bash
# <verified log query>
```

## 3. Step-by-Step Mitigation

### Step 1: <Approved mitigation>
<Document verified triggers, prerequisites, and rollback steps.>

### Step 2: <Approved recovery action>
<Include only commands and thresholds validated for this service.>
```bash
# <verified command, if applicable>
```

### Step 3: Verify restoration
<Document verified success signals and the monitoring source.>

## 4. Escalation Path

<Document the confirmed escalation route, roles, and applicable response times.>
