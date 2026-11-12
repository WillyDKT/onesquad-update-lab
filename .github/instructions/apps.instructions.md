---
description: "Use when implementing, debugging, or testing application code in apps/ or packages/."
applyTo: ["apps/**", "packages/**"]
---
# Application code

## Tech stack

| App | Stack |
| --- | --- |
| `apps/Front` | Next.js 15 (App Router), React 19, TypeScript 5 (strict), Tailwind CSS 4, Radix UI, VTMN Play / Buysmart UI design system, pnpm |
| `apps/mockup` | Documentation only in the current checkout; no application source or verified stack is present. Confirm the intended stack before adding UI code. |
| `apps/API` | Java 21, Spring Boot 3.5, Maven |

- Front: functional components and hooks only, typed props, no `any`; reuse existing design-system components before adding new ones.
- API: REST controllers under `com.contextiq`, DTOs separate from domain objects, tests with `spring-boot-starter-test`.
- Do not add a new framework or UI library without an accepted ADR.

## Git: branches, commits, releases

Follow [Conventional Commits](https://www.conventionalcommits.org/) and always reference the issue or feature.

- Branch: `<type>/<issue-number>-<feature-slug>`, e.g. `feat/42-ticket-pipeline-view`. Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.
- Commit: `<type>(<scope>): <summary> (#<issue>)`, e.g. `feat(front): add ticket pipeline view (#42)`. Scope is `front`, `api`, `mockup`, or `docs`. Imperative mood, summary under 72 characters; use `BREAKING CHANGE:` in the footer when applicable.
- Pull request: title follows the commit format and body contains `Closes #<issue>`.
- Release: tag `vMAJOR.MINOR.PATCH` (`feat` → minor, `fix` → patch, breaking → major); title `v1.2.0 - <feature name>`; notes list the features and fixes with their issue links.
- Documentation PR opened by the doc-keeper: `docs/<issue-number>-<feature-slug>`, commit `docs(<feature-slug>): ... (#<issue>)`.

## Rules

- Implement only what the linked task describes; its acceptance criteria define done.
- Follow the patterns of the surrounding code and the accepted ADRs instead of introducing a new framework or structure.
- Add or update tests for each acceptance criterion when the application has a test setup.
- Never commit credentials, tokens, or environment-specific values; follow `docs/security/README.md`.
- When an API contract, data model, or user-visible behavior changes, note it in the task's technical notes so the documentation can be updated.
