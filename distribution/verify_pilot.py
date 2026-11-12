#!/usr/bin/env python3
"""Read-only checks of the persisted private pilot evidence."""

import base64
import json
import subprocess
import tempfile
from pathlib import Path

from update import MARKER, REPORT, UPSTREAM, initialize


TARGET = "WillyDKT/onesquad-example-lab"


def api(endpoint):
    return json.loads(subprocess.check_output(["gh", "api", endpoint]))


def file(repo, path, ref):
    result = api(f"repos/{repo}/contents/{path}?ref={ref}")
    return base64.b64decode(result["content"])


def verify():
    source = Path(__file__).resolve().parents[1]
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
    assert second["draft"] and second["state"] == "open"
    head = second["head"]["sha"]
    assert file(TARGET, "AGENTS.md", head) == file(TARGET, "AGENTS.md", "main")
    assert json.loads(file(TARGET, MARKER, head))["version"] == "1.0.0"
    report = file(TARGET, REPORT, head)
    for text in (b"Old OneSquad base", b"Current project", b"New OneSquad release",
                 b"Our team uses kebab-case", b"link it to the feature"):
        assert text in report, f"Report missing {text!r}"
    assert file(TARGET, "scripts/onesquad-check-version.py", head) == (
        source / "distribution/sources/check-version.py").read_bytes()
    assert "v1.1.0" in second["body"] and "v1.2.0" in second["body"]
    print("Verified: private labs, disabled Actions, filtered full installation, "
          "preserved customization, ignored release, cumulative notes, "
          "unchanged conflicted file/version, exact report and distributed script.")


if __name__ == "__main__":
    verify()
