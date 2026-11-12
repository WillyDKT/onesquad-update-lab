# OneSquad

**OneSquad is a shared project workspace: a repository structure that brings a product's context and code together in one place.** Inspired by the second-brain approach, it gives the whole squad a durable, organized memory of what the product does, why decisions were made, and how to change and operate it.

## Why OneSquad?

When the front end, API, services, product rules, designs, and technical decisions are scattered across repositories and tools, each person has to reconstruct the project context. An AI assistant faces the same fragmentation: opening the front-end repository alone does not explain the business rules or the back-end constraints.

OneSquad proposes a **product monorepo**: applications live beside the documentation that explains them. PMs, designers, developers, data teams, QA, and support work from the same project entry point, without having to duplicate context or move it between conversations.

For example, a feature can link its business rules, user flow, and architectural decisions, then update the front end, API, tests, and documentation in the same pull request when appropriate. A shared repository does not require every component to share a runtime or release cycle.

## A squad-level second brain

| Layer | Purpose | Boundary |
| :--- | :--- | :--- |
| **Personal** | Individual organization and private working notes | Stays outside the shared project repository |
| **Squad — OneSquad** | Shared product knowledge, decisions, design, code, and operations | The team's day-to-day project workspace |
| **Enterprise — SDLC** | Organization-wide standards and reusable practices | Referenced when relevant, not copied wholesale |

This is the intended relationship between the layers, **not an implemented automatic connection**. External libraries and authoritative tools can remain outside the monorepo; keep their references and relevant project context discoverable.

## What OneSquad is not

- **Not a multi-agent solution.** Its value is the shared folder structure and linked context, not a prescribed set of assistants or a relay between them.
- **Not a mandatory AI workflow.** The repository is useful to people directly. An assistant can use the same context without requiring a specialized agent per role.
- **Not a replacement for every existing tool.** Jira, Confluence, Figma, and external repositories may remain authoritative for their subjects; record provenance and avoid competing copies.
- **Not an access-control mechanism.** Folders and AI instructions guide contributions; actual permissions and review requirements must be configured separately.

The repository currently includes optional Copilot agent definitions, instructions, and skills. These are supporting configurations, not prerequisites for adopting OneSquad. BMAD is a possible complementary method, not the definition of the project.

See the [project framing, sources, and open roadmap](./docs/project/README.md) for the distinction between the current structure and future proposals.

## Where each discipline contributes

| Discipline | Shared context |
| :--- | :--- |
| **Product management** | Business rules and PRDs in `docs/product/`; roadmap and tasks in `docs/project/` |
| **Design** | Journeys and research in `docs/ux-ui/`; prototypes in `apps/mockup/` |
| **Engineering** | Decisions and contracts in `docs/architecture/`; applications and tests in `apps/` |
| **Data & analytics** | Metrics and tracking plans in `docs/data/` |
| **QA, support & operations** | Quality context in `docs/qa/`; runbooks and incidents in `docs/run/` |

The team owns decisions, reviews, and documentation maintenance. Assistance does not transfer that responsibility to software.

## Repository Structure

```
one-squad/
├── apps/                 # Applications and microservices
│   ├── api/             # Backend service / API
│   ├── front/           # Frontend web application
│   └── mockup/          # UI prototypes and design mockups
├── docs/                 # Centralized project & system documentation
│   ├── architecture/     # System architecture, ADRs, APIs, data models, diagrams
│   ├── compliance/       # Legal, licensing, and GDPR compliance
│   ├── data/             # KPIs, analytics, and event tracking plans
│   ├── glossaries/       # Terminology definitions (product, tech, security, run)
│   ├── project/          # Project roadmaps, milestones, and task epics
│       ├── product/      # Product specs (PRDs), training materials
│   ├── qa/               # Test strategy, quality assurance, and test suites
│   ├── run/              # Operations, SRE runbooks, support, and incident post-mortems
│   ├── security/         # Security policies, threat modeling, and pentest audits
│   └── ux-ui/            # Design system, user flows, and research findings
├── site/                 # Presentation site for OneSquad itself
├── .github/              # GitHub configuration and optional AI assistance
│   ├── agents/          # Existing optional Copilot profiles
│   ├── instructions/    # Path-scoped AI instructions
│   ├── skills/          # Workflow skills (ticket, domain-modeling, docs-setup, ingestion)
│   └── ISSUE_TEMPLATE/  # Issue templates
├── AGENTS.md             # Context and contribution guidance for AI tools
└── README.md             # This file
```

## Documentation Hub

All documentation is centralized in [`docs/`](./docs/README.md). Every documentation folder contains a dedicated `README.md` describing:
- **Directory purpose and scope**: What belongs in the folder and what belongs elsewhere.
- **Naming conventions**: Strict file naming standards (e.g. `0001-short-title.md`, `YYYY-MM-DD-incident-title.md`).
- **Required document structure & metadata**: YAML frontmatter defined in the [context map](./docs/context-map.md), with additional ownership and review fields where the template requires them.
- **Status values**: Document lifecycle (`Draft`, `Proposed`, `Accepted`, `Published`, `Superseded`, `Deprecated`).
- **Colocated templates**: Ready-to-use Markdown templates (`template-*.md` or `0000-template.md`).

For detailed documentation guidelines, see [`docs/README.md`](./docs/README.md).
Website documentation is authored separately in Markdown under [`site/docs/`](./site/docs), rendered by Next.js at `/docs/`, and statically exported into `site/out/`. See [`site/README.md`](./site/README.md) for authoring and local preview instructions.

## Getting started

1. Define the product boundary and identify the applications, knowledge, and external sources the squad needs.
2. Organize the relevant code under `apps/` and shared knowledge under `docs/`; adapt the folders to the product rather than filling every template.
3. Link a first real task to its requirements, design, decisions, and affected code using the [context map](./docs/context-map.md).
4. Review the change with the responsible people and keep the documentation aligned with the implementation.

For an existing product, migration, ownership, access, and delivery arrangements need to be agreed before moving repositories. The [governance document](./docs/project/repository-governance.md) is a proposal, not proof that these controls are configured.

## Placement Conventions

When adding or updating documentation, follow this directory routing:

| If you are documenting... | Place it in... | Template / Convention |
| :--- | :--- | :--- |
| Architecture decision (architectural choice, data store, stack) | `docs/architecture/adr/` | `0000-template.md` (e.g. `0001-routing-strategy.md`) |
| API specification (OpenAPI, AsyncAPI, GraphQL) | `docs/architecture/api/` | `template-api-contract.md` (`openapi-<service>.yaml`) |
| Data models and schema definitions | `docs/architecture/data-models/` | `template-data-model.md` |
| System diagrams and sequence flows | `docs/architecture/diagrams/` | `template-diagram.md` (Mermaid `.mmd` or `.md`) |
| GDPR, DPIA, and data privacy impact | `docs/compliance/gdpr/` | `template-dpia.md` |
| Open-source software licenses & dependencies | `docs/compliance/licenses.md` | Licensing audit format |
| KPI definitions and calculation metrics | `docs/data/kpi-definitions.md` | Metrics dictionary |
| Event tracking and analytics payloads | `docs/data/tracking-plan/` | `template-tracking-event.md` |
| Domain, technical, security, or ops terms | `docs/glossaries/` | Alphabetical entries in domain glossary |
| Product Requirements Documents (PRDs) | `docs/project/product/specs/` | `template-prd.md` (`PRD-0001-feature-name.md`) |
| User guides and training modules | `docs/project/product/training/` | `template-training-guide.md` |
| High-level roadmap and milestones | `docs/project/roadmap/` | `template-roadmap.md` |
| Epic and sprint task breakdowns | `docs/project/tasks/` | `template-task-epic.md` |
| Overall QA approach and test pyramid | `docs/qa/test-strategy.md` | Strategy document |
| Automated or manual test suites | `docs/qa/test-suites/` | `template-test-suite.md` |
| Production incidents and post-mortems | `docs/run/postmortem/` | `template-incident-postmortem.md` (`YYYY-MM-DD-title.md`) |
| Operational runbooks and troubleshooting procedures | `docs/run/runbooks/` | `template-runbook.md` |
| Support procedures and escalation paths | `docs/run/support/` | `template-support-sop.md` |
| Secrets management and Vault | `docs/security/README.md` | Security guidance |
| Penetration test findings and remediations | `docs/security/pentests/` | `template-pentest-report.md` |
| Threat modeling and risk mitigations (STRIDE) | `docs/security/threat-modeling/` | `template-threat-model.md` |
| UI components and design tokens | `docs/ux-ui/design-system/` | `template-component-spec.md` |
| User journeys and UX flows | `docs/ux-ui/flows/` | `template-user-flow.md` |
| User interviews and usability research | `docs/ux-ui/research/` | `template-user-research.md` |

## Authoring Guidelines

- **Language**: Write all documentation in English to maintain consistency across teams and systems.
- **File Naming**: Use lowercase `kebab-case.md` with zero-padded sequences or dates where indicated.
- **Templates**: Always base new records on the corresponding directory template.
- **Cross-linking**: Always update the local folder's `README.md` index whenever adding or retiring a document.
- **Diagrams**: Prefer native Mermaid (` ```mermaid `) code blocks for sequence flows, architecture, and state diagrams.
