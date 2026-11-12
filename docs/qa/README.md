---
id: QA-INDEX
title: "Quality Assurance and Testing"
type: index
status: published
tags: [qa, dev]
summary: "Quality strategy, testing pyramid, automated CI gates, and test suites."
related: [docs/qa/test-strategy.md, docs/qa/test-suites/README.md]
updated: 2026-10-21
---
# Quality Assurance & Testing

This directory documents testing strategy, automated test suites, quality gates, and regression procedures for OneSquad.

## Subdirectories & Documents

- [`test-strategy.md`](./test-strategy.md): Platform-wide test pyramid, coverage requirements, and automation gates.
- [`test-suites/`](./test-suites/README.md): Detailed end-to-end, integration, performance, and regression test suites.

## QA Standards

1. **Shift-Left**: Validate business rules and API contracts at unit and component level before integration.
2. **Deterministic Tests**: Tests must be hermetic and repeatable without relying on uncontrolled external network state.
3. **Traceability**: Critical user journeys in PRDs must be covered by at least one automated test scenario in `test-suites/`.

