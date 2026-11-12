---
id: DOCS-ROOT
title: "Documentation directory overview"
type: hub
status: published
tags: [docs]
summary: "The squad's shared project knowledge: directory scopes, metadata, source provenance, and contribution standards."
related: [README.md, docs/context-map.md, docs/project/README.md, docs/project/sdlc-bmad.md]
updated: 2026-10-29
---
# OneSquad Documentation Hub

Welcome to the centralized documentation hub for **OneSquad**.

This is the shared-memory part of the [OneSquad workspace](../README.md): product rules, decisions, journeys, and operational knowledge live beside the code they explain. It is organized for the squad first; an AI assistant can use the same context without a required set of agents.

Use the [context map](./context-map.md) to find relevant knowledge. Keep links to authoritative external sources, their status, and their version or consultation date where known. Centralizing context does not guarantee its correctness or freshness, and does not require copying every source. See the [project framing and open roadmap](./project/README.md) for the project's scope.

## Documentation website

This directory is the internal shared project knowledge base. It is **not** automatically published on the website.

Website documentation is authored separately in Markdown under [`site/docs/`](../site/docs), organized into Tutorials, How-to Guides, Explanation, and Reference. The Next.js build renders those articles at `/docs/` in `site/out/` without changing their sources. See [`site/README.md`](../site/README.md) for local preview and authoring instructions.

## Documentation Structure

```
docs/
├── architecture/         # System architecture & technical decisions
│   ├── adr/             # Architectural Decision Records (ADRs)
│   ├── api/             # API specifications (OpenAPI, AsyncAPI)
│   ├── data-models/     # Canonical entity models and schemas
│   └── diagrams/        # Architecture & sequence diagrams (Mermaid)
├── compliance/           # Legal, license, and GDPR compliance
│   └── gdpr/            # DPIA and data privacy assessments
├── data/                 # Data governance & tracking
│   ├── kpi-definitions.md # Metrics dictionary
│   └── tracking-plan/   # Analytics tracking event schemas
├── glossaries/           # Normalized term dictionaries (Product, Tech, Run, Security)
├── project/              # Project execution & delivery
│   ├── roadmap/         # High-level milestones & schedules
│   └── product/          # Product management & functional design
├── qa/                   # Quality assurance & testing
│   ├── test-strategy.md # High-level test pyramid & guidelines
│   └── test-suites/     # Test scenarios and execution records
├── run/                  # SRE, operations, and support
│   ├── incident-reports/# Blameless post-mortems
│   ├── runbooks/        # Operational procedures & troubleshooting
│   └── support/         # Customer support SOPs & escalation paths
├── security/             # Security governance & auditing
│   ├── pentests/        # Penetration test reports & audits
│   ├── README.md        # Security guidance and Vault secret storage
│   └── threat-modeling/ # STRIDE threat models & mitigations
└── ux-ui/                # Design, flows, and user experience
    ├── design-system/   # Components and styling specs
    ├── flows/           # User journeys and wireframes
    └── research/        # User interview synthesis and feedback
```

## Directory Conventions for Contributors

Every subdirectory in `docs/` is self-describing and contains:
1. **`README.md`**: Outlines folder purpose, boundaries ("What belongs here vs. elsewhere"), file naming patterns, required document sections, status values, and an index of current records.
2. **Standard Templates**: Colocated templates (e.g. `0000-template.md` or `template-*.md`) containing the required structure and guidance.

### Standard Metadata Header

Every Markdown document under `docs/` starts with YAML frontmatter containing `id`, `title`, `type`, `status`, `tags`, `summary`, `related`, and `updated`. Add `feature` for feature-specific documents. The [context map](./context-map.md) defines the schema and tag taxonomy.

Formal templates may additionally use the following table for ownership and review details; it does not replace frontmatter:

| Field | Value |
| :--- | :--- |
| Status | `Draft` \| `Proposed` \| `Accepted` \| `Published` \| `Deprecated` \| `Superseded` |
| Date | `YYYY-MM-DD` |
| Owners | Team or author responsible |
| Reviewers | Reviewing team / stakeholders |
| Scope | Affected applications, services, or domains |
| Related Artifacts | Links to PRs, issues, ADRs, schemas, or tickets |

### Status Lifecycle

Use the following lifecycle values:
- `Draft`: Work in progress, not yet ready for formal review.
- `Proposed`: Completed draft submitted for stakeholder review.
- `Accepted` / `Approved`: Formally reviewed and agreed upon.
- `Published`: Active and authoritative reference.
- `Superseded`: Replaced by a newer document (link the successor in metadata).
- `Deprecated`: Historical document no longer recommended for active reference.

### Authoring Standards

- **Language**: English only.
- **Naming format**: Lowercase `kebab-case.md` prefixed with zero-padded sequences (`0001-...`) or dates (`YYYY-MM-DD-...`) where specified by the folder README.
- **Self-contained**: Clearly explain the *context*, *decisions*, and *consequences* rather than bare assertions.
- **Index maintenance**: Whenever you add, update, or deprecate a document, update the local folder's `README.md` index.
