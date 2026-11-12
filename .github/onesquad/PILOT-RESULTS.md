# Private pilot results - 2026-11-12

Tooling now lives under `.github/onesquad/`; historical releases and PRs retain
their original file paths. New adopter state uses `.github/onesquad/state.json`.
No existing demonstration PR is rewritten by this migration.

## Current review suite

At the user's request, PRs #1 through #6 are now closed without merge.
GitHub retains their history; they are not deleted. The replacement suite is:

| Test | Evidence | Expected and observed result |
| --- | --- | --- |
| Normal update | [WillyDKT/onesquad-example-lab#8](https://github.com/WillyDKT/onesquad-example-lab/pull/8) | v1.4 -> v1.5 adds `docs/run/onesquad/update-review.md`; Git merges cleanly and preserves client review rules. |
| Native conflict | [WillyDKT/onesquad-example-lab#9](https://github.com/WillyDKT/onesquad-example-lab/pull/9) | v1.4 -> v1.5 modifies the same routing line on both branches; GitHub reports `CONFLICTING` / `DIRTY`, only `AGENTS.md` is unmerged. |
| Skip then cumulative update | [WillyDKT/onesquad-example-lab#7](https://github.com/WillyDKT/onesquad-example-lab/pull/7) (closed) then [WillyDKT/onesquad-example-lab#10](https://github.com/WillyDKT/onesquad-example-lab/pull/10) | v1.4 proposal closed; base stays v1.3. After publishing v1.5, the new PR includes both the v1.4 version-script change and v1.5 docs/routing. |

These are separate `scenario/review-suite/*` branches. Client `main` and earlier
release tags are unchanged. Exactly #8/#9/#10 remain open.

`scenarios.py` deterministically constructs known-ancestor fixtures for the normal
and native-conflict cases; `publish.py` handles the skip/cumulative case.
`verify_scenarios.py` checks GitHub states and exact files, then performs temporary
local merges to verify clean customization preservation and the native conflict.
Rerunning publication does not create duplicates.

[v1.5.0](https://github.com/WillyDKT/onesquad-update-lab/releases/tag/v1.5.0)
was published before running the suite. This is explicit local orchestration,
not proof that a release event triggered Actions: Actions remain disabled.
No model calls are made by either script. No PR was merged.

## Archived namespace migration

[WillyDKT/onesquad-example-lab#6](https://github.com/WillyDKT/onesquad-example-lab/pull/6)
proposes v1.3.0 -> v1.4.0 on `scenario/namespaced-state`, an isolated fixture
starting from the clean proposal of PR #3. The deterministic publisher migrated
the marker and updated the version-reading script, leaving `AGENTS.md` unchanged.
No AI model is invoked by update computation or PR publication. This clean
migration still uses the content-based prototype, not a generalized native-history
engine. Neither this PR nor earlier demonstrations were merged.

## Persisted evidence

| Scenario | Evidence | Result |
| --- | --- | --- |
| Baseline installation | [v1.0.0](https://github.com/WillyDKT/onesquad-update-lab/releases/tag/v1.0.0) and adopter `main` | Minimal structure, marker at 1.0.0, local team convention. |
| Independent customization | [WillyDKT/onesquad-example-lab#1](https://github.com/WillyDKT/onesquad-example-lab/pull/1) | Documentation update prepared; team naming rule preserved. |
| Ignore a release | Same PR, closed without merge | Re-running publisher does not recreate it; installed baseline stays 1.0.0. |
| Cumulative update and conflict | [WillyDKT/onesquad-example-lab#2](https://github.com/WillyDKT/onesquad-example-lab/pull/2) | Draft 1.0.0 -> 1.2.0; notes from both releases, exact old/local/new report. |
| Script distribution | Same draft PR | New script copied to `scripts/`, not executed. |
| Conflict safety | Same draft PR | `AGENTS.md` unchanged, marker remains 1.0.0; human resolution required. |

Fifteen local unit tests cover legacy marker migration, pending-update protection,
reserved namespace validation, clean/repeated updates, independent customization,
conflict/finalization, skipped releases, symlinks, disabled updates, local
deletions, protected local content, invalid paths and installation filtering.
`verify_pilot.py` checks the remote evidence and performs a full filtered
installation in a temporary directory.

## Deliberate limits

- Both repositories remain private with GitHub Actions disabled.
- Real PRs were published by the local operator using authenticated `gh`,
  not by an unattended GitHub App or release-triggered workflow.
- The source contains a release/manual workflow, but approved cross-repository
  authentication and an Actions review are still required before enabling it.
- No PR was merged. Earlier PRs are closed; the three current proposals remain available for review.
- This is not a production-ready migration engine: tracking removals, policy
  changes and mode changes block for review; renames are not inferred.
- No protections, required checks, automatic conflict revalidation, adoption
  analytics or organization-wide deployment have been configured.
- The source starts from a fresh tracked-file snapshot, without the original
  commit history, local profiles, or Finder metadata.

## Additional scenario: client customization + upstream routing

[WillyDKT/onesquad-example-lab#3](https://github.com/WillyDKT/onesquad-example-lab/pull/3)
targets `scenario/agentic-routing`, not `main`. That branch is an explicit
fresh-install fixture of v1.2.0, followed by a separate client customization
commit. It does not claim that the earlier conflicting update was resolved.
The original main branch and draft #2 are preserved.

The client added two review rules: payments-owner review for payment changes,
and no production-configuration edits during documentation work. Source release
[v1.3.0](https://github.com/WillyDKT/onesquad-update-lab/releases/tag/v1.3.0)
adds a distinct Agentic routing section to the distributed guide.

The generated PR changes only `AGENTS.md` and the marker: the existing client
guide is preserved byte-for-byte before the new routing section, and the marker
advances from 1.2.0 to 1.3.0 only on the proposed branch. There is no conflict
because the client and source changes are in independent passages. This does
not demonstrate automatic semantic resolution of overlapping edits; draft #2
still illustrates that limitation.

## Additional scenario: existing client Agentic routing

[WillyDKT/onesquad-example-lab#4](https://github.com/WillyDKT/onesquad-example-lab/pull/4)
targets `scenario/agentic-routing-conflict`, derived from the same fresh v1.2.0
fixture as scenario #3. Before proposing the exact same source v1.3.0, the
client added an Agentic routing section at the same location, with
payments-maintainer-first routing and incident guidance.

Git reports a conflicting concurrent addition. The publisher leaves the full
client `AGENTS.md` unchanged and keeps its integrated marker at 1.2.0. Only
the old/local/new report and resolution state are committed in the draft PR.
No conflict markers appear in the functional guide. The previous PRs and
branches remain unchanged.

A matching heading alone is not a semantic conflict detector: this example
conflicts because both sides add different text at the same location. Similar
headings elsewhere might merge textually without being logically compatible.
Human review remains necessary.
