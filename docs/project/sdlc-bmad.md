---
id: SDLC
title: OneSquad shared-context delivery guide
type: guide
status: draft
tags: [docs, product]
summary: "A role-based guide to linking requirements, design, code, and documentation. AI assistance and BMAD are optional, not prerequisites."
related: [docs/context-map.md, docs/project/README.md, docs/project/repository-governance.md, AGENTS.md]
updated: 2026-10-29
---
# Delivering with shared project context

## Principle

OneSquad provides the shared workspace, not a mandatory delivery methodology or a relay of specialized agents. The [project framing and sources](./README.md) explain this boundary. This guide describes a way to use the existing templates; teams still need to validate their delivery and governance arrangements.

The **epic file** can connect the requirements, design, decisions, and affected code for a feature. Work must remain understandable outside any conversation. People own scope, prioritization, review, and delivery; optional AI tools may help prepare or update artifacts.

For Jira or GitHub Issues, retain a confirmed external reference rather than inventing or duplicating tracker state. The repository's [ticket-writing skill](../../.github/skills/ticket/SKILL.md) is optional assistance for drafting.

## Responsibilities and artifacts

Use only the steps and documents relevant to the change. A documentation correction or an investigation does not need a full feature cycle.

| Activity | Responsible discipline | Shared artifact | Location |
| --- | --- | --- | --- |
| Frame the problem and scope | Product management, with the team | Requirements, business rules, acceptance criteria | `docs/product/specs/` |
| Track the work and decisions | Named task owner and contributors | Epic, linked artifacts, open questions | `docs/project/tasks/` |
| Design the experience, when needed | Design | User flow, states, accessibility, prototype | `docs/ux-ui/`, `apps/mockup/` |
| Choose a technical approach | Engineering | Technical notes, ADR or data model when needed | `docs/architecture/` |
| Implement and validate | Engineering and QA | Code, tests, validation results | Relevant application paths under `apps/` |
| Keep knowledge aligned | Contributors and reviewers for each area | Updated documentation matching the delivered behavior | Relevant paths under `docs/` |
| Operate and investigate | Support / operations, with engineering | Runbooks and incident findings | `docs/run/` |

## Existing task lifecycle

The epic template supports the following statuses. They describe the work, not which assistant must run next.

```text
draft -> ready-for-design -> ready-for-dev -> in-dev -> in-review -> done
                (skipped when there is no UI change)
Any status -> blocked (with the reason and the owner who must unblock it)
```

| Status | Meaning | Responsible people |
| --- | --- | --- |
| `draft` | Requirements and task are being framed | Product owner and contributors |
| `ready-for-design` | Reviewed scope and criteria are ready; UX work is needed | Product and design |
| `ready-for-dev` | Design is ready, or no UI change is needed | Product, design when relevant, and engineering |
| `in-dev` | Implementation is in progress | Engineering |
| `in-review` | Changes and validation evidence are ready for review | Contributors and relevant reviewers |
| `done` | Required review, merge, and documentation updates are confirmed | Named task owner |
| `blocked` | A decision or information is missing | Named owner responsible for unblocking |

An assistant does not become an approver or gain merge authority through a profile or status. Actual review and permission controls must be configured separately; see the [governance proposal](./repository-governance.md).

## Keep a readable trail

- Link the task to its requirements and, when needed, its user flow and architectural decisions.
- Before implementation, resolve essential scope questions with the responsible people and mark remaining assumptions explicitly.
- Record affected files and validation results; update documentation to match the delivered behavior.
- When responsibility changes, add the date, sending and receiving roles, decisions, file references, and open questions to the epic's **Handoff Log**. Update `status`, `owner`, and `updated`.
- Close the task only once the required reviews, merge, and documentation updates are confirmed.

## Place of BMAD and existing Copilot profiles

BMAD can complement this structure for teams that choose it. Its analysis, planning, solutioning, and implementation phases can use the same artifacts; adopting OneSquad does not require installing BMAD or selecting a different assistant for every phase.

Existing definitions in `.github/agents/` remain optional tooling. They do not define the product or replace human responsibilities. The [working roadmap](https://decathlon.atlassian.net/wiki/spaces/DI/pages/2857893917) still raises the choice between profiles, skills, and instructions, as well as future BMAD/SDLC integration; these are not settled platform capabilities.
