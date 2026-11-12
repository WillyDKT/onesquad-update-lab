# Applications Hub (`apps/`)

This directory hosts the applications, frontend clients, services, and UI prototypes of OneSquad.

## Workspace Layout

```
apps/
├── api/             # Backend services & APIs (Spring Boot / Java, Node, Python, etc.)
├── front/           # Production frontend applications (Next.js / React, etc.)
└── mockup/          # Interactive UI prototypes, design explorations (Vite / React)
```

## Guidelines for Teams

- **Developers**:
  - Refer to [`.github/instructions/apps.instructions.md`](../.github/instructions/apps.instructions.md) for conventional commits, branches, and code quality conventions.
  - Inter-service communication and contracts must be documented in [`docs/architecture/api/`](../docs/architecture/api/).
  - Architecture decisions must be recorded in [`docs/architecture/adr/`](../docs/architecture/adr/).
- **UX/UI Designers**:
  - `apps/mockup/` serves as a playground for interactive mockups, state simulations, and design reviews prior to production implementation.
  - UI patterns and components should adhere to [`docs/ux-ui/design-system/`](../docs/ux-ui/design-system/).
- **Data Engineers & Analysts**:
  - Event tracking schemas must align with [`docs/data/tracking-plan/`](../docs/data/tracking-plan/).
  - Domain KPIs must be maintained in [`docs/data/kpi-definitions.md`](../docs/data/kpi-definitions.md).
