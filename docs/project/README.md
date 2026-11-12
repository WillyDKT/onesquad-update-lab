---
id: PROJECT-INDEX
title: "Project Management and Delivery"
type: index
status: published
tags: [product]
summary: "OneSquad project framing, source provenance, current repository scope, and open roadmap, with links to delivery and governance guidance."
related: [README.md, docs/context-map.md, docs/project/sdlc-bmad.md, docs/project/roadmap/README.md, docs/project/tasks/README.md]
updated: 2026-10-30
---
# Project Management & Delivery

This directory coordinates project tracking, milestone roadmaps, sprint backlogs, and task breakdowns for OneSquad.

## Project framing

**OneSquad is the squad's shared project workspace, inspired by a second brain.** Its core is a folder structure that keeps product knowledge, design, architecture, application code, and operational context together. It addresses fragmentation between front-end, back-end, and service repositories and the documents needed to understand them.

The product monorepo is the chosen direction for this workspace. People can read and contribute directly; an AI assistant can use the same linked context without a mandatory sequence of specialized agents. The project is not an agent platform.

In the intended three-layer model, Personal contains individual context, Squad contains shared project context, and Enterprise provides organization-wide standards such as SDLC. This describes boundaries and an intended relationship, not working automatic integrations. Personal notes do not belong in the shared repository.

### Sources and authority

Consulted on **2026-10-29**. This framing follows the project owner's clarification in the current request; source proposals below are not promoted to approved capabilities.

| Source | Version / date | Evidence and limits |
| --- | --- | --- |
| [Confluence: Présentation](https://decathlon.atlassian.net/wiki/spaces/DI/pages/2828992633) | v1, 2026-10-20 | Hackathon framing under the earlier name **OneContext**: fragmented context, a single project entry point, and a monorepo containing code and documentation. Agent roles, automatic documentation, RAG, and the demonstration flow are ambitions, not evidence of implementation. |
| [Confluence: OneSquad - Roadmap](https://decathlon.atlassian.net/wiki/spaces/DI/pages/2857893917) | v8, 2026-10-29 | Working notes, not an approved delivery plan. Covers presentation/docs separation, governance, template evolution, migration, and open choices about agents, instructions, and BMAD. Text was consulted; the extraction omitted embedded imagery. |
| Copilot session **Squad layer development**, ID `6a658d95-258b-4730-9ce2-b0cc3b9d5fdc` | Discussion opened 2026-09-22; available excerpts consulted | Original user requirements: a Squad layer between Personal and Enterprise; one project open for daily work across docs and code; a monorepo pilot rather than fragmented front/back repositories. Assistant suggestions in that discussion are not approvals. |
| Project owner's clarification in this documentation update | 2026-10-29 | Confirms centralizing project context and code through a second-brain-inspired folder structure, rather than a solution defined by multiple agents. |

The [dktunited/second-brain](https://github.com/dktunited/second-brain) repository was named as inspiration by the owner. Its README could not be retrieved with the current GitHub access (HTTP 404); no claim about its exact structure or capabilities is made here.

### Present in the repository

- Application locations under `apps/api/`, `apps/front/`, and `apps/mockup/`; their presence alone does not establish a complete runnable product.
- Domain documentation folders, local README indexes, templates, metadata, and links.
- A Next.js presentation site and documentation portal in `site/`, adapted from the [Decathlon Next.js template](https://github.com/dktunited/nextjs-template). Website articles stay in `site/docs/`, separately from internal project knowledge under `docs/`; see the [site guide](../../site/README.md).
- Existing Copilot profiles, instructions, and skills as optional assistance. Their presence does not make multi-agent orchestration the product.

### Open roadmap, not delivered features

The following items come from the working roadmap and require design or validation before adoption:

| Topic | Still to define |
| --- | --- |
| Presentation and documentation | The presentation and website guides now have separate routes. Still define the generic product-facing information and navigation for app, mockup, docs, and support, including products without a UI. |
| Generic template | Decide which examples and starter documents to retain and whether product documentation moves under project documentation. The current paths remain unchanged. |
| Governance and releases | Validate GitHub teams, CODEOWNERS, review requirements, branches, release selection, rollback, and release-note responsibilities. |
| Adoption and updates | Define migration from existing repositories, template versioning, and how improvements reach adopting projects. No update distribution mechanism is claimed. |
| Optional AI assistance | Decide the place of profiles, instructions, skills, role-aware onboarding, and BMAD/SDLC integration. None is a prerequisite for the folder structure. |
| External context | Define how Enterprise standards and permitted Personal context are consulted when needed, without copying private material into the squad repository. |

## Subdirectories

- [`roadmap/`](./roadmap/README.md): Quarterly milestones, version release roadmaps, and delivery schedules.
- [`product/`](./product/README.md): Product vision, requirements documents (PRDs), user personas, and training materials.

## Governance

- [Repository governance proposal](./repository-governance.md): proposed ownership, review, access, branch, and contribution rules for the mono-repo; validate before treating them as active policy.
- **Alignment**: Every epic in your jira should trace to a feature PRD in `docs/project/product/` and a roadmap milestone in `roadmap/`.
## Delivery workflows

- [Shared-context delivery guide](./sdlc-bmad.md): role responsibilities and linked artifacts; BMAD is optional.
- [Copilot design process proposal](./copilot-design-process.md): draft of the product-design journey, design-to-development handoff, and post-production follow-up.
