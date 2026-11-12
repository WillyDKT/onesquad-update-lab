---
id: TEMPLATE-ADR-0000
title: "Architecture Decision Record Template"
type: template
status: draft
tags: [architecture]
summary: "Standard template for recording architectural decisions, drivers, options, and consequences."
feature: platform
related: [docs/architecture/adr/README.md]
updated: 2026-10-21
---
# ADR 0000: Short title

When creating an ADR, copy and complete this frontmatter before the document body:

```yaml
---
id: ADR-0001
title: "Decision title"
type: adr
status: proposed
owner: architecture
tags: [architecture]
feature: feature-slug
summary: "One or two sentences describing the decision and its impact."
related: []
updated: YYYY-MM-DD
---
```

| Field | Value |
| :--- | :--- |
| Date | YYYY-MM-DD |
| Owners | Team or person responsible for the decision |
| Reviewers | Teams or people who reviewed the decision |
| Decision type | Architecture / Data model / Integration / Security / Infrastructure |
| Scope | Services, applications, or domains affected |
| Related artifacts | Links to PRs, issues, specs, or contracts |
| Supersedes | ADR ID or `N/A` |
| Superseded by | ADR ID or `N/A` |

## Context

Describe the context, technical problem, and constraints that make this decision necessary.

## Decision Drivers

- Driver 1 (e.g. latency constraints, scalability, team autonomy)
- Driver 2
- Driver 3

## Considered Options

### Option 1 - Name

- **Summary**: Concise description of Option 1.
- **Pros**:
  - Positive aspect 1
  - Positive aspect 2
- **Cons**:
  - Drawback or cost 1
  - Drawback or cost 2

### Option 2 - Name

- **Summary**: Concise description of Option 2.
- **Pros**:
  - Positive aspect 1
- **Cons**:
  - Drawback 1

## Decision

State clearly which option was chosen and the primary reasons for this choice over alternatives.

## Consequences

### Positive
- Positive outcome 1
- Positive outcome 2

### Negative & Tradeoffs
- Tradeoff or limitation 1
- Tradeoff or limitation 2

### Risks & Mitigations
- Risk 1 and how it is mitigated
- Follow-up monitoring or spike required

## Implementation Notes

Describe rollout strategy, phased deployment, migration steps, or backward compatibility requirements.

## Validation and Impact

Explain how the decision will be validated (benchmarks, automated tests, metrics) and which teams are impacted.

## References

- `<verified reference or N/A>`
- `<issue or PR reference, if available>`
