---
description: "Use when writing product specs, PRDs, business rules, tickets, or tasks in docs/product/ or docs/project/."
applyTo: ["docs/product/**", "docs/project/**"]
---
# Product and task documents

- PRDs go in `../../docs/project/product/specs/PRD-XXXX-<feature-slug>.md` from `template-prd.md`; epic breakdowns go in `docs/project/tasks/epic-XXXX-<feature-slug>.md` from `template-task-epic.md`. Use the next free four-digit ID.
- For Jira or GitHub issue content, follow the workspace [ticket skill](../skills/ticket/SKILL.md), which is the source of truth for ticket format and creation rules.
- Write acceptance criteria in French as testable statements: `Étant donné / Quand / Alors`.
- Give each business rule an ID (`BR-1`) and a source; mark unconfirmed rules as assumptions.
- Every epic links its PRD and flow (or `none` when there is no UI change); keep the tracker type, priority, and external reference in its metadata when known.
- When changing an epic status, update `owner` and `updated`, and add a row to its handoff log, following [the delivery workflow](../../docs/project/sdlc-bmad.md).
