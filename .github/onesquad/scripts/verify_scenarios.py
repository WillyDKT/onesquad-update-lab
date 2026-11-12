#!/usr/bin/env python3
"""Verify the persisted review-suite PRs without changing remote branches."""

import base64
import json
import subprocess
import tempfile
from pathlib import Path

from scenarios import PREFIX, SOURCE, TARGET, git, run
from update import MARKER, UPSTREAM


def api(endpoint):
    return json.loads(run("gh", "api", endpoint))


def contents(path, ref):
    item = api(f"repos/{TARGET}/contents/{path}?ref={ref}")
    return base64.b64decode(item["content"])


def state(ref):
    return json.loads(contents(MARKER, ref))


def verify():
    for repo in (UPSTREAM, TARGET):
        assert api(f"repos/{repo}")["private"]
        assert not api(f"repos/{repo}/actions/permissions")["enabled"]
    opened = json.loads(run("gh", "pr", "list", "--repo", TARGET,
                            "--state", "open", "--json", "number"))
    assert {item["number"] for item in opened} == {8, 9, 10}
    for number in range(1, 8):
        proposal = api(f"repos/{TARGET}/pulls/{number}")
        assert proposal["state"] == "closed" and proposal["merged_at"] is None
    expected_commit = git(SOURCE, "rev-parse", "v1.5.0^{commit}")
    expected_doc = (SOURCE / ".github/onesquad/sources/update-review.md").read_bytes()
    for number, kind in ((8, "normal"), (9, "conflict"), (10, "skip")):
        info = json.loads(run("gh", "pr", "view", str(number), "--repo", TARGET,
                              "--json", "mergeable,mergeStateStatus"))
        assert info["mergeable"] == ("CONFLICTING" if kind == "conflict" else "MERGEABLE")
        proposal = api(f"repos/{TARGET}/pulls/{number}")
        assert proposal["base"]["ref"] == PREFIX + "/" + kind
        head, base = proposal["head"]["sha"], proposal["base"]["sha"]
        assert state(head)["version"] == "1.5.0"
        assert state(head)["commit"] == expected_commit
        assert state(base)["version"] == ("1.3.0" if kind == "skip" else "1.4.0")
        assert contents("docs/run/onesquad/update-review.md", head) == expected_doc
        changed = {item["filename"] for item in api(f"repos/{TARGET}/pulls/{number}/files")}
        expected = {MARKER, "AGENTS.md", "docs/run/onesquad/update-review.md"}
        if kind == "skip":
            expected.add("scripts/onesquad-check-version.py")
            assert "v1.4.0" in proposal["body"] and "v1.5.0" in proposal["body"]
            assert b'.github/onesquad/state.json' in contents("scripts/onesquad-check-version.py", head)
        assert changed == expected
        if kind == "skip":
            continue
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory) / "client"
            run("gh", "repo", "clone", TARGET, str(root), "--", "--quiet",
                "--branch", proposal["base"]["ref"])
            git(root, "fetch", "--quiet", "origin", f"refs/pull/{number}/head")
            merge = subprocess.run(
                ["git", "-C", str(root), "-c", "user.name=Test",
                 "-c", "user.email=test@example.invalid",
                 "merge", "--no-commit", "--no-ff", "FETCH_HEAD"],
                capture_output=True)
            if kind == "normal":
                assert merge.returncode == 0, merge.stderr.decode()
                assert "Keep our payments-owner review." in (root / "AGENTS.md").read_text()
                assert "read its linked specification" in (root / "AGENTS.md").read_text()
            else:
                assert merge.returncode == 1, merge.stderr.decode()
                assert git(root, "diff", "--name-only", "--diff-filter=U") == "AGENTS.md"
            assert (root / "docs/run/onesquad/update-review.md").read_bytes() == expected_doc
    print("Verified: three open PRs only; old PRs closed unmerged; normal merge "
          "preserves client rules; conflict is native and limited to AGENTS.md; "
          "ignored v1.4 remains uninstalled and v1.5 cumulatively contains both releases; "
          "private labs and disabled Actions preserved.")


if __name__ == "__main__":
    verify()
