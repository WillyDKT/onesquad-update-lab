---
title: OneSquad repository guide
summary: "Find the agents, instructions, skills, project context, and website content in the repository."
status: published
---
# OneSquad repository guide

## Directory map

| Path | Content |
| --- | --- |
| `AGENTS.md` | Agent routing and shared context rules. |
| `.github/agents/` | Specialist agent definitions. |
| `.github/instructions/` | Rules scoped to repository paths. |
| `.github/skills/` | Reusable, on-demand workflows. |
| `docs/` | Internal product, architecture, design, delivery, and operational documentation. |
| `apps/` | Application code. |
| `site/docs/` | Hand-authored Markdown articles for this website. |
| `site/dist/` | Generated website, not a source directory. |

## Internal project documentation

The [documentation hub](../../../docs/README.md) describes the internal domain folders and their templates. The [context map](../../../docs/context-map.md) defines the metadata and tags used by agents to find relevant project context.

Internal documents are not automatically published on this website. Website articles are maintained independently under `site/docs/`.

## Website documentation

Place articles under `tutorials/`, `how-to/`, `explanation/`, or `reference/` inside `site/docs/`. Each Markdown file has a title and summary in YAML frontmatter. Its folder determines the category, and its filename determines the URL.

See the [website authoring instructions](../../README.md) for commands, metadata examples, and the local preview.
