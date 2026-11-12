---
id: TRAINING-GETTING-STARTED
title: Getting started with OneSquad
type: guide
status: published
tags: [docs, product, dev]
summary: "Run your first feature cycle with the OneSquad agents, from a product need to reviewed code and updated documentation."
related: [AGENTS.md, docs/project/sdlc-bmad.md, docs/context-map.md]
updated: 2026-10-29
website:
  order: 1
---
# Getting started with OneSquad

| Field | Value |
| --- | --- |
| Status | Published |
| Target audience | Product, design, engineering, and operations teams |
| Prerequisites | A repository with the OneSquad agents, instructions, and documentation |

## Objective

Complete a feature cycle in which every agent works from the same repository context. The epic, not a conversation, carries the specification, decisions, open questions, and handoff log.

## Prerequisites and setup

Open the repository in your Copilot tool and read [AGENTS.md](../../../AGENTS.md). If the repository is not configured yet, follow [How to adopt OneSquad](../how-to/adopt-one-squad.md).

## Step-by-step instructions

### 1. Route the request

Choose the Product Manager for a new product need. Start with OneSquad Support when the responsible role is unclear.

### 2. Frame the feature

Select the Product Manager and describe the problem, users, and expected outcome. For example:

```text
Product Manager agent — create the PRD and the epic for "simulation cost calculation".
```

The Product Manager prepares the PRD and epic. Review their scope and acceptance criteria before moving to the next stage.

### 3. Design when a screen changes

Give the reviewed epic to the Product Designer. Review the user journey, screen states, accessibility notes, and constraints before handing it to the Dev Agent. Skip this stage when there is no interface change.

### 4. Build and review

Give the ready epic and subtask to the Dev Agent. The agent implements the change and records its validation results in the epic. A human reviewer approves and merges the implementation.

### 5. Update documentation

Give the merged epic to the Documentation Keeper. It reconciles documents sharing the feature slug and marks the task done only after the merge and documentation update are confirmed.

## Verification

Check that the epic links the PRD, any UX flow, and relevant decisions. Its handoff log should identify the sending and receiving roles, produced files, decisions, and open questions at each stage.

## Common pitfalls and troubleshooting

| Situation | Action |
| --- | --- |
| The next agent lacks context | Supply the epic ID and check its linked files instead of copying a previous conversation. |
| A requirement is unresolved | Record the question and its owner; do not invent a product decision. |
| A stage has not been reviewed | Keep the current status until the responsible human validates the handoff. |

## Next steps and further reading

- [How the delivery workflow works](../explanation/delivery-workflow.md)
- [Context map and document metadata](../../../docs/context-map.md)
