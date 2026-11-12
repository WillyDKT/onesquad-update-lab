---
title: How the OneSquad delivery workflow works
summary: "Understand how specialist agents share context and hand work over through a versioned epic."
status: published
---
# How the OneSquad delivery workflow works

OneSquad keeps product intent, design decisions, implementation work, and documentation in the same repository. The website explains the method; the repository's internal `docs/` directory carries the working context for each project.

## One epic carries the context

An epic links the PRD, user flow when needed, implementation tasks, and architectural decisions. Its handoff log records what was produced, what was decided, and which questions remain open. The next agent follows these links rather than relying on a previous conversation.

## Specialist roles

| Role | Responsibility |
| --- | --- |
| Product Manager | Frame the problem, scope, business rules, and acceptance criteria. |
| Product Designer | Define user journeys, screen states, and accessibility when an interface changes. |
| Dev Agent | Implement and review the ready task with its linked context. |
| Documentation Keeper | Reconcile documentation after the implementation has been merged. |
| OneSquad Support | Investigate issues and route requests when the responsible role is unclear. |

## Human validation

A person validates each stage before the next handoff. Agents prepare work and record evidence; they do not replace product approval or code review.

The [internal delivery workflow](../../../docs/project/sdlc-bmad.md) defines the detailed statuses and handoff rules.

## Put it into practice

Follow [Getting started with OneSquad](../tutorials/getting-started.md) to run a first feature cycle, or [adopt OneSquad](../how-to/adopt-one-squad.md) in a repository that is not configured yet.
