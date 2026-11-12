# Private pilot results - 2026-11-12

## Persisted evidence

| Scenario | Evidence | Result |
| --- | --- | --- |
| Baseline installation | [v1.0.0](https://github.com/WillyDKT/onesquad-update-lab/releases/tag/v1.0.0) and adopter `main` | Minimal structure, marker at 1.0.0, local team convention. |
| Independent customization | [WillyDKT/onesquad-example-lab#1](https://github.com/WillyDKT/onesquad-example-lab/pull/1) | Documentation update prepared; team naming rule preserved. |
| Ignore a release | Same PR, closed without merge | Re-running publisher does not recreate it; installed baseline stays 1.0.0. |
| Cumulative update and conflict | [WillyDKT/onesquad-example-lab#2](https://github.com/WillyDKT/onesquad-example-lab/pull/2) | Draft 1.0.0 -> 1.2.0; notes from both releases, exact old/local/new report. |
| Script distribution | Same draft PR | New script copied to `scripts/`, not executed. |
| Conflict safety | Same draft PR | `AGENTS.md` unchanged, marker remains 1.0.0; human resolution required. |

Eleven local unit tests cover clean/repeated updates, independent customization,
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
- No PR was merged. Draft #2 and the independent scenario PR #3 remain available for human review.
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
