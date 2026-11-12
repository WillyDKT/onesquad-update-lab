#!/usr/bin/env python3
"""Read-only checks of the persisted private pilot evidence."""

import base64
import json
import subprocess
import tempfile
from pathlib import Path

from update import UPSTREAM, initialize

# These immutable historical PRs intentionally retain the original layout.
MARKER = ".github/onesquad"
REPORT = ".github/onesquad-update/report.md"


TARGET = "WillyDKT/onesquad-example-lab"


def api(endpoint):
    return json.loads(subprocess.check_output(["gh", "api", endpoint]))


def file(repo, path, ref):
    result = api(f"repos/{repo}/contents/{path}?ref={ref}")
    return base64.b64decode(result["content"])


def verify():
    source = Path(__file__).resolve().parents[3]
    with tempfile.TemporaryDirectory() as directory:
        initialize(source, Path(directory), "v1.0.0", "1.0.0")
        installed = Path(directory)
        assert not (installed / "site").exists(), "Site leaked into full installation"
        assert not (installed / "distribution").exists(), "Maintainer tools leaked"
        assert not (installed / ".config.md").exists(), "Personal profile leaked"
        assert not (installed / ".github/workflows").exists(), "Source workflows leaked"
        assert (installed / "AGENTS.md").read_bytes() == (
            subprocess.check_output(["git", "-C", str(source), "show",
                                     "v1.0.0:distribution/sources/contributor-guide.md"]))
    for repo in (UPSTREAM, TARGET):
        assert api(f"repos/{repo}")["private"], "Repository must remain private"
        assert not api(f"repos/{repo}/actions/permissions")["enabled"], "Actions unexpectedly enabled"
    first = api(f"repos/{TARGET}/pulls/1")
    second = api(f"repos/{TARGET}/pulls/2")
    assert first["state"] == "closed" and first["merged_at"] is None
    clean = file(TARGET, "AGENTS.md", first["head"]["sha"])
    assert b"link it to the feature" in clean
    assert b"Our team uses kebab-case" in clean
    assert second["draft"] and second["state"] == "closed"
    head = second["head"]["sha"]
    assert file(TARGET, "AGENTS.md", head) == file(TARGET, "AGENTS.md", "main")
    assert json.loads(file(TARGET, MARKER, head))["version"] == "1.0.0"
    report = file(TARGET, REPORT, head)
    for text in (b"Old OneSquad base", b"Current project", b"New OneSquad release",
                 b"Our team uses kebab-case", b"link it to the feature"):
        assert text in report, f"Report missing {text!r}"
    assert file(TARGET, "scripts/onesquad-check-version.py", head) == (
        subprocess.check_output(["git", "-C", str(source), "show",
                                 "v1.2.0:distribution/sources/check-version.py"]))
    assert "v1.1.0" in second["body"] and "v1.2.0" in second["body"]
    third = api(f"repos/{TARGET}/pulls/3")
    assert third["state"] == "closed" and not third["draft"]
    assert third["base"]["ref"] == "scenario/agentic-routing"
    client = file(TARGET, "AGENTS.md", third["base"]["sha"])
    merged = file(TARGET, "AGENTS.md", third["head"]["sha"])
    routing = b"\n## Agentic routing\n\n"
    assert merged.startswith(client)
    assert merged[len(client):].startswith(routing)
    assert merged.count(b"Client-specific rule:") == 2
    assert routing in merged and b"<<<<<<<" not in merged
    assert json.loads(file(TARGET, MARKER, third["head"]["sha"]))["version"] == "1.3.0"
    assert json.loads(file(TARGET, MARKER, third["base"]["sha"]))["version"] == "1.2.0"
    fourth = api(f"repos/{TARGET}/pulls/4")
    assert fourth["state"] == "closed" and fourth["draft"]
    assert fourth["base"]["ref"] == "scenario/agentic-routing-conflict"
    head = fourth["head"]["sha"]
    assert file(TARGET, "AGENTS.md", head) == file(
        TARGET, "AGENTS.md", fourth["base"]["sha"])
    assert json.loads(file(TARGET, MARKER, head))["version"] == "1.2.0"
    conflict_report = file(TARGET, REPORT, head)
    for text in (b"Old OneSquad base", b"Current project", b"New OneSquad release",
                 b"start with the payments maintainer", b"load only the relevant project context"):
        assert text in conflict_report, f"Routing report missing {text!r}"
    changed = api(f"repos/{TARGET}/pulls/4/files")
    assert {item["filename"] for item in changed} == {
        REPORT, ".github/onesquad-update/state.json"}
    sixth = api(f"repos/{TARGET}/pulls/6")
    assert sixth["state"] == "closed" and not sixth["draft"]
    assert sixth["base"]["ref"] == "scenario/namespaced-state"
    head, base = sixth["head"]["sha"], sixth["base"]["sha"]
    assert file(TARGET, "AGENTS.md", head) == file(TARGET, "AGENTS.md", base)
    state = json.loads(file(TARGET, ".github/onesquad/state.json", head))
    assert state["version"] == "1.4.0" and state["updates_enabled"]
    assert state["upstream"] == UPSTREAM
    expected_commit = subprocess.check_output(
        ["git", "-C", str(source), "rev-parse", "v1.4.0^{commit}"]).decode().strip()
    assert state["commit"] == expected_commit
    assert json.loads(file(TARGET, MARKER, base))["version"] == "1.3.0"
    listing = api(f"repos/{TARGET}/contents/.github/onesquad?ref={head}")
    assert {item["name"] for item in listing} == {"state.json"}
    changed = api(f"repos/{TARGET}/pulls/6/files")
    assert {item["filename"] for item in changed} <= {
        MARKER, ".github/onesquad/state.json", "scripts/onesquad-check-version.py"}
    assert file(TARGET, "scripts/onesquad-check-version.py", head) == (
        source / ".github/onesquad/sources/check-version.py").read_bytes()
    print("Verified: private labs, disabled Actions, filtered full installation, "
          "preserved customization, ignored release, cumulative notes, "
          "unchanged conflicted file/version, exact report, distributed script, "
          "routing added with client review rules preserved, "
          "conflicting client routing reported without overwrite, "
          "and isolated v1.4 namespace migration preserving client guidance.")


if __name__ == "__main__":
    verify()
