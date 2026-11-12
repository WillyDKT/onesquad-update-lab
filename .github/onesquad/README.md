# OneSquad private update pilot

Source tooling, manifest and mapped sources live under `.github/onesquad/`.
Adopters receive only `.github/onesquad/state.json`, not those maintainer tools.
`updates/` is reserved for migration metadata. The older content-merge engine
temporarily uses `updates/report.md` and `updates/pending.json`; native Git
conflict PRs do not need those reports. Empty `updates/` directories are not
tracked. Legacy file markers migrate only after complete update validation;
legacy pending reports must first be finalized using their original tooling.

This directory is experimental, not production tooling. The source repository
is a tracked-file snapshot of `dktunited/one-squad` at commit
`639f15520f7560fc7ac435c1853cd610f1b8e63c`; no upstream history or local profile
was copied. Existing upstream workflows are retained in the source snapshot
but GitHub Actions is disabled at repository level.

Only `WillyDKT/onesquad-example-lab` is accepted by the pilot publisher.
The prototype has no GitHub App, production rollout, analytics, comprehensive
migration support, or branch protection configuration.

## Installation

Use an empty destination directory, Python 3 and Git. Run from a clone of this
source repository with the chosen release tag available:

```sh
python3 .github/onesquad/scripts/update.py initialize --source . \
  --target /path/to/empty-project --ref v1.0.0 --version 1.0.0
```

`--minimal` creates the small demonstration project instead of copying the
filtered full repository. The manifest controls mapped files and full-install
exclusions. Nothing executes scripts from the adopting project.

A prompt can invoke this same command after confirming the destination;
it must not independently reinterpret which files to copy.

## Updates

The current review suite has three open proposals: clean documentation update,
native conflict and cumulative update after skipping a release. PRs #1 through
#7 are closed, not deleted or merged. See `PILOT-RESULTS.md`.

```sh
python3 .github/onesquad/scripts/verify_scenarios.py
```

`scenarios.py skip` creates/closes the isolated v1.4 proposal.
After v1.5 is published, `scenarios.py suite` creates the three review PRs,
without model calls. It does not publish a release or enable Actions itself.
Its native-history path is a controlled fixture, not a general production updater.
Reruns reuse existing PRs rather than overwrite branches.

```sh
python3 -m unittest discover -s .github/onesquad/scripts -p 'test_*.py'
python3 .github/onesquad/scripts/publish.py --version 1.4.0
```

The publisher requires authenticated `gh` and Git push access. On the local
pilot, it uses the operator's GitHub identity, not a bot or App. It opens a PR
only in the disposable adopter and leaves merge decisions to a human.
An existing proposal, including one closed without merge, is not recreated.
An older open proposal blocks replacement rather than risking human work.

Conflicts leave the entire affected file intact and retain the installed
version. A draft PR links the exact old/local/new contents. To resolve it,
check out its branch, edit the file, then run from the source clone:

```sh
python3 .github/onesquad/scripts/update.py finalize --target /path/to/adopter \
  --resolved AGENTS.md
```

Every reported path must be named and changed; review is still required.
The pilot cannot judge semantic correctness or support a no-change waiver.
Do not merge a draft/partial proposal. Required checks and protections are
not yet configured, so this is a procedural rule in this laboratory.

## Automation boundary

The workflow supports release events and manual dispatch, but **Actions stays
disabled until explicitly enabled after workflow review**. It additionally
requires the repository secret `PILOT_TOKEN` with approved access to the two
private labs. Do not copy tokens into source files, command arguments or logs.
Use a GitHub App instead for production; do not assume a repository
`GITHUB_TOKEN` can write to the other private repository.

Thus a locally exercised publisher demonstrates GitHub releases and real PRs,
but does not by itself prove unattended release-triggered execution.
