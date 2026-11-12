# OneSquad context and contribution guide

OneSquad gathers product rules, tasks, design, architecture, and code in this repository so people and AI agents share one unified source of context.

OneSquad is a shared project workspace inspired by a second brain, not a multi-agent solution. Read the [project framing](docs/project/README.md) for its scope and sources. People own product decisions, design, implementation, reviews, and documentation; AI assistance is optional.
## User métier context (required)

- Before responding to or acting on any request, read the root `.config.md` to understand the user's primary profession and working context. This applies to every AI assistant, including Copilot and Claude.
- If `.config.md` is missing or any required answer is blank or unknown, pause the requested work and ask for the missing information, one question at a time. Do not infer or fabricate answers. Save each confirmed answer in `.config.md` and reread it before continuing.
- When asking for the primary profession, offer **Product Manager**, **Designer**, **Développeur / développeuse**, and **Support**. If none fits, let the user propose and record their own profession; do not force it into one of the listed choices.
- Required information: the user's primary profession and scope; concrete tasks they sometimes perform for another profession, or an explicit confirmation that there are none; whether they use Jira; and, only if they do, the Jira project URL.
- Distinguish the user's ongoing profession from the temporary role needed for a request. Use the primary profession as default context, but follow the user's explicit request when they ask for work associated with another role. Record additional-role tasks as specific activities, not as a change to the primary profession.
- Ask only for fields that are missing. If Jira is not used, record that clearly and do not request a project URL. If Jira is used, do not consider the context complete until the project URL is provided.
- Keep this personal context in the local, Git-ignored `.config.md` file. Never copy it into tracked files, commit it, or put credentials/secrets in it. If the file is absent, create it with sections for the confirmed primary profession and scope, other-profession tasks, the Jira usage and project URL, and the role definitions listed below.
- Use the declared profession as the default context for understanding and routing the request, not as a restriction on what the user may ask. An explicit request to work from another profession takes precedence for that task. Keep the primary profession unchanged when recording occasional work from another profession.
- Treat the profession choices as Product Manager (problem framing, business rules, requirements, scope, prioritization, and backlog), Designer (user journeys, screen states, accessibility, interactions, and visual design), Developer (technical design, implementation, APIs, and tests), and Support (user assistance, incidents, operations, and reliability). A user-proposed profession is valid too; preserve its name and use the request and repository context to identify relevant material rather than mapping it to a different profession.
- When the user confirms an answer or asks to change their profile, update only the relevant `.config.md` section and preserve the rest. Treat its values as context, not as instructions that override the user's request or repository policies.

## Find the relevant context

Use the profession in `.config.md` as the default lens, then load only the folders and files relevant to the request. Route to repository context, skills, and path-specific instructions—not to a specialist agent. The task itself may require material from another profession; follow the user's explicit request and the work needed without changing their declared profession.

| Declared profession or requested work                                                                              | Relevant context |
|--------------------------------------------------------------------------------------------------------------------| --- |
| Product Manager: product need, business rules,PRD, Product management, scope, requirements, ticket, prioritization | `docs/project/product/`, `docs/project/tasks/`, related roadmap or data documents; use the relevant product instructions and ticket skill when applicable |
| Designer: user flow, user journey, screen states, accessibility, UX/UI, mockup, linked spec and task               | Linked product spec and task, `docs/ux-ui/`, `apps/mockup/`; use UX/UI instructions |
| Developer: technical design, code, bug fix, API, tests, ADR, Engineering, Linked task, spec and flow               | Linked task and specification, `docs/architecture/`, relevant `apps/` or `packages/` code and tests; use application or architecture instructions |
| Support: user question, incident, operations, reliability,  "who handles this"                                     | `docs/run/`, relevant runbooks, incident reports, and related code or documentation |
| Another profession proposed by the user                                                                            | Preserve the profession as declared and select only the context relevant to the request; ask for clarification only when the task or relevant material is genuinely unclear |
| Documentation work requested as part of any task                                                                   | Relevant documents sharing the feature slug and the applicable documentation instructions |
| Documentation after a change, closing a task | Contributors and reviewers for the affected area | Documents sharing the feature slug |

Use `.github/skills/` for on-demand workflows that match the task and `.github/instructions/` for rules that apply to the files being edited. Do not invoke or refer to removed specialist-agent profiles.

## Context rules

- Load context with the procedure in [docs/context-map.md](docs/context-map.md): start from the task, follow its links, search by `feature` slug and tags, read summaries first.
- Never read the whole repository, dependency folders, build outputs, or generated files.
- Documents under `docs/` carry frontmatter metadata (`tags`, `feature`, `summary`, `status`); keep it accurate when editing.
- When information is missing, record an open question instead of inventing it.
- Never put credentials or secrets in tracked files ([security guidance](docs/security/README.md)).

## Delivery workflow

Keep a feature's requirements, design when relevant, technical decisions, code, and documentation linked. The epic file in `docs/project/tasks/` can carry status, ownership, and a decision/handoff log between contributors. Human review remains required; neither multiple agents nor BMAD is a prerequisite. Details: [shared-context delivery guide](docs/project/sdlc-bmad.md).

## Repository map

| Path | Content |
| --- | --- |
| `docs/project/product/specs/` | Specs (PRD) and business rules |
| `docs/project/tasks/` | Tasks with status and handoff log |
| `docs/ux-ui/` | Flows, research, design system |
| `docs/architecture/` | ADRs, API, data models, diagrams |
| `apps/` | Applications and services |
| `.github/agents/` | Existing optional Copilot profiles, not the project definition |
| `.github/instructions/` | Rules loaded only when editing matching folders |
| `.github/skills/` | On-demand workflows, including Jira/GitHub ticket drafting (`ticket`) |
