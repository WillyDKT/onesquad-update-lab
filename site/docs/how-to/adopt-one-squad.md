---
id: TRAINING-ADOPT-ONE-SQUAD
title: How to adopt OneSquad in your project
type: guide
status: published
tags: [docs, product, dev]
summary: "Set up the documentation, agents, instructions, and skills needed to use OneSquad in an existing or new repository."
related: [AGENTS.md, docs/README.md, docs/context-map.md, site/docs/tutorials/getting-started.md]
updated: 2026-10-29
website:
  order: 1
---
# How to adopt OneSquad in your project

| Field | Value |
| --- | --- |
| Status | Published |
| Target audience | Teams adopting the OneSquad method |
| Prerequisites | Access to the target repository and Copilot |

## Objective

Prepare a repository so that product, design, engineering, and documentation agents can hand work over through versioned files.

## Prerequisites and setup

Review the [repository guide](../reference/repository-guide.md) and [agent routing](../../../AGENTS.md). Keep the team responsible for product approval, code review, and merging.

## Step-by-step instructions

### 1. Bootstrap the documentation

Create the domain folders, README indexes, and templates under `docs/`. The repository's `docs-structure-setup` skill can reconcile an existing hierarchy:

```text
Use the docs-structure-setup skill to scaffold or reconcile the docs/ hierarchy and templates.
```

### 2. Define routing and context

Add `AGENTS.md` to identify agent responsibilities and link `docs/context-map.md`. Confirm that the context map defines metadata, tags, and how to find the smallest relevant set of documents.

### 3. Install agents and scoped instructions

Configure `.github/agents/` with the Product Manager, Product Designer, Dev Agent, Documentation Keeper, and OneSquad Support. Add path-scoped rules under `.github/instructions/`.

### 4. Add reusable skills

Keep on-demand workflows under `.github/skills/`. OneSquad provides ticket drafting, domain modeling, documentation setup, and knowledge-source ingestion.

### 5. Run a first feature

Follow [Getting started with OneSquad](../tutorials/getting-started.md). Use a real need to exercise the PRD, epic, optional UX flow, implementation, and documentation handoffs.

## Verification

Check that `AGENTS.md`, `docs/README.md`, and `docs/context-map.md` are present and linked. Confirm that each agent can find the epic and its context without access to another agent's conversation.

## Common pitfalls and troubleshooting

| Situation | Action |
| --- | --- |
| Existing project conventions differ | Reconcile them explicitly instead of overwriting unrelated rules. |
| Ownership or approval is unclear | Record the open question and ask the responsible team to decide. |
| An agent advances the process without review | Restore the required human validation at each handoff. |

## Next steps and further reading

- [Delivery workflow](../explanation/delivery-workflow.md)
- [Repository context map](../../../docs/context-map.md)
