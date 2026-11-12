---
id: TEST-STRATEGY
title: "Test strategy"
type: guide
status: draft
tags: [qa, dev]
summary: "Testing pyramid, coverage thresholds, and automation plan."
related: [docs/qa/README.md]
updated: 2026-10-21
---

# Test strategy

| Field | Value |
| :--- | :--- |
| Status | `Draft` |
| Version | `1.0.0` |
| Owner | QA / Engineering Lead |
| Last Updated | 2026-10-21 |

## 1. Quality Objectives

The repository currently contains `apps/API`, `apps/Front`, and `apps/mockup`. Define quality targets for the actual applications, user journeys, and risks; do not assume a service topology or fixed coverage percentages.

## 2. Testing Pyramid & Coverage Thresholds

Use the test pyramid as a planning model, not as a required percentage split. Set measurable coverage targets only after reviewing the application and agreeing them with maintainers.

```
       / \
      / E2E \       Critical user journeys
     /-------\
    /  Integ  \     Contracts and integrated behavior
   /-----------\
  /    Unit     \   Isolated behavior and domain logic
 /---------------\
```

| Layer | Target Coverage | Scope & Tooling | Execution Gate |
| :--- | :--- | :--- | :--- |
| **Unit** | `<agreed target or N/A>` | `<verified scope and tooling>` | `<configured CI gate or N/A>` |
| **Integration** | `<agreed target or N/A>` | `<verified contracts and integrations>` | `<configured CI gate or N/A>` |
| **End-to-End** | `<agreed user journeys or N/A>` | `<verified application workflow>` | `<configured CI gate or N/A>` |
| **Performance** | `<approved measurable target or N/A>` | `<verified critical behavior>` | `<configured schedule or N/A>` |

## 3. Automation Gates & CI Pipeline

The following are proposed gate categories, not claims about the current CI configuration. Confirm the actual checks and thresholds with maintainers before making them merge requirements:

1. Linting and type checks that are configured for the changed application.
2. Relevant automated tests.
3. Contract validation where a contract exists.
4. Security and dependency scan results handled under the approved security policy.

## OneSquad data and knowledge checks

This section translates documented requirements and the draft CIQ ETL spike into validation criteria. It is a proposed test plan, not evidence that the integrations or checks have been implemented.

### Source and retrieval behavior

For a OneSquad knowledge pilot, verify that:

- retrieved content identifies whether it is an official source or derived context;
- claims link to their original source, and unavailable owner or freshness values are shown as unknown rather than invented;
- stale or unknown freshness and unreviewed interpretations are not presented as verified;
- results respect the requesting user's access to the source; the index does not expose content the user could not access in the source system;
- responses distinguish source-supported facts from inference.

### CIQ import validation

The [Data Turnover ETL spike](https://decathlon.atlassian.net/wiki/spaces/DI/pages/2673934857/Data+Turnover+for+New+Platform) is marked “Draft for discussion.” If its proposed batch flow is implemented, cover at least:

| Area | Validation to exercise |
| --- | --- |
| Source contract | Required columns, data types, periods, units, and source identifiers are checked against an agreed contract. |
| Identity and grain | Stable keys map to the intended DPP / industrial universe / period; ambiguous or unmatched records are rejected or sent for review. |
| Data quality | Required values, allowed ranges, duplicates, missing records, and cross-source conflicts have explicit outcomes. |
| Publication | A batch with blocking validation errors does not change published values; successful publication is atomic or equivalently protected from partial visibility. |
| Versioning | Repeating the same input is idempotent; a corrected input creates an auditable new version without erasing history. |
| Audit and recovery | The run records source/revision metadata, validation and publication status, and accepted/rejected counts; failures can be diagnosed and safely retried. |

The spike does not settle all source schemas, precedence rules, or rollback details. Define test fixtures and expected outcomes with source and business owners rather than inventing them. No general coverage threshold is specified by the cited wiki pages.

