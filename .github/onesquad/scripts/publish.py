#!/usr/bin/env python3
"""Publish lab updates. Only this disposable adopter is authorized in the pilot."""

import argparse
import hashlib
import json
import re
import subprocess
import tempfile
from pathlib import Path

from update import UPSTREAM, marker, prepare


TARGET = "WillyDKT/onesquad-example-lab"


def run(*args, cwd=None):
    return subprocess.check_output(args, cwd=cwd).decode().strip()


def publish(source, version, base_branch="main"):
    marker(version, "")
    branch = f"onesquad/update-v{version}"
    if base_branch != "main":
        branch += "-" + hashlib.sha256(base_branch.encode()).hexdigest()[:10]
    title = f"chore(onesquad): update to v{version}"
    proposals = json.loads(run("gh", "pr", "list", "--repo", TARGET, "--base",
                               base_branch, "--state", "all", "--limit", "100",
                               "--json", "url,state,title"))
    existing = [proposal for proposal in proposals if proposal["title"] == title]
    if existing:
        print(json.dumps({"skipped": "Proposal already exists for this release",
                          "pull_requests": existing}, indent=2))
        return
    opened = json.loads(run("gh", "pr", "list", "--repo", TARGET,
                            "--state", "open", "--base", base_branch,
                            "--json", "headRefName,url"))
    if any(p["headRefName"].startswith("onesquad/update-") for p in opened):
        raise ValueError("An older update is open; review/close it before publishing another")
    with tempfile.TemporaryDirectory(prefix="onesquad-pilot-") as directory:
        target = Path(directory) / "adopter"
        run("gh", "repo", "clone", TARGET, str(target), "--", "--quiet",
            "--branch", base_branch)
        base = run("git", "rev-parse", "HEAD", cwd=target)
        run("git", "checkout", "-b", branch, cwd=target)
        summary = prepare(source, target, f"v{version}", version)
        if summary["from_version"] == version:
            print(json.dumps({"skipped": "Adopter already integrated this version"}))
            return
        # Report and marker are produced by prepare; no adopter scripts are executed.
        run("git", "add", "--all", cwd=target)
        run("git", "-c", "user.name=OneSquad pilot",
            "-c", "user.email=onesquad-pilot@users.noreply.github.com",
            "commit", "-m", f"chore(onesquad): update to v{version}", cwd=target)
        live = run("git", "ls-remote", "origin", f"refs/heads/{base_branch}",
                   cwd=target).split()[0]
        if live != base:
            raise ValueError("Target changed during preparation; rerun from its new base")
        run("git", "push", "--quiet", "origin", branch, cwd=target)
        versions = json.loads(run("gh", "release", "list", "--repo", UPSTREAM,
                                  "--limit", "100", "--json", "tagName,isPrerelease,isDraft"))
        start = tuple(map(int, summary["from_version"].split(".")))
        end = tuple(map(int, version.split(".")))
        notes = []
        for release in reversed(versions):
            tag = release["tagName"]
            if release["isDraft"] or release["isPrerelease"]:
                continue
            if not re.fullmatch(r"v[0-9]+\.[0-9]+\.[0-9]+", tag):
                continue
            if start < tuple(map(int, tag[1:].split("."))) <= end:
                body = run("gh", "release", "view", tag, "--repo", UPSTREAM,
                           "--json", "body,url")
                info = json.loads(body)
                notes.append(f"### [{tag}]({info['url']})\n\n{info['body']}")
        changed = "\n".join(f"- `{name}`" for name in summary["changes"]) or "Aucun."
        conflicts = "\n".join(f"- `{name}`" for name in summary["conflicts"]) or "Aucun."
        body = (
            f"Mise à jour OneSquad **{summary['from_version']} → {version}**, "
            "préparée sans IA. La revue et le merge restent humains.\n\n"
            "## Nouveautés cumulées\n\n" + "\n\n".join(notes) +
            f"\n\n## Changements appliqués\n\n{changed}\n\n"
            f"## Adaptations requises\n\n{conflicts}\n\n"
            + ("La version intégrée reste inchangée. Comparaison exacte ancienne base / "
               "projet / nouvelle release : "
               "[rapport](https://github.com/" + TARGET + "/blob/" + branch +
               "/.github/onesquad/updates/report.md). "
               "Résoudre les fichiers, utiliser `.github/onesquad/scripts/update.py finalize` "
               "depuis la source avec `--resolved <chemin>`, puis faire relire.\n"
               if summary["conflicts"] else
               "Les personnalisations conservées doivent également être relues.\n")
        )
        body_file = Path(directory) / "pr.md"
        body_file.write_text(body)
        args = ["gh", "pr", "create", "--repo", TARGET, "--base", base_branch,
                "--head", branch, "--title", title,
                "--body-file", str(body_file)]
        if summary["conflicts"]:
            args.append("--draft")
        url = run(*args)
        print(json.dumps(dict(url=url, **summary), indent=2))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--version", required=True)
    parser.add_argument("--base", default="main",
                        help="Isolated adopter scenario branch (default: main)")
    args = parser.parse_args()
    publish(Path(__file__).resolve().parents[3], args.version, args.base)
