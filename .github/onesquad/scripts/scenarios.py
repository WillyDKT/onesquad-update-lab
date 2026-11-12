#!/usr/bin/env python3
"""Reproducible, non-AI demonstrations restricted to the two private labs."""

import argparse
import json
import subprocess
import tempfile
from pathlib import Path

from publish import TARGET, publish
from update import MARKER, UPSTREAM, initialize, prepare


SOURCE = Path(__file__).resolve().parents[3]
PREFIX = "scenario/review-suite"


def run(*args, cwd=None):
    return subprocess.check_output(args, cwd=cwd).decode().strip()


def git(root, *args):
    return run("git", "-C", str(root), *args)


def commit(root, subject):
    git(root, "add", "--all")
    git(root, "-c", "user.name=OneSquad pilot",
        "-c", "user.email=onesquad-pilot@users.noreply.github.com",
        "commit", "--quiet", "-m", subject)
    return git(root, "rev-parse", "HEAD")


def fixture(root, version, base):
    root.mkdir()
    initialize(SOURCE, root, f"v{version}", version, minimal=True)
    git(root, "init", "--quiet", "-b", base)
    git(root, "remote", "add", "origin", f"https://github.com/{TARGET}.git")
    return commit(root, f"test: isolated OneSquad {version} installation")


def find_pr(base, title):
    proposals = json.loads(run(
        "gh", "pr", "list", "--repo", TARGET, "--base", base, "--state", "all",
        "--limit", "100", "--json", "number,title,url"))
    return next((pr for pr in proposals if pr["title"] == title), None)


def skip():
    base = PREFIX + "/skip"
    title = "chore(onesquad): update to v1.4.0"
    if not find_pr(base, title):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory) / "client"
            fixture(root, "1.3.0", base)
            git(root, "push", "--quiet", "origin", base)
        publish(SOURCE, "1.4.0", base)
    proposal = find_pr(base, title)
    info = json.loads(run("gh", "pr", "view", str(proposal["number"]),
                          "--repo", TARGET, "--json", "state"))
    if info["state"] == "OPEN":
        run("gh", "pr", "close", str(proposal["number"]), "--repo", TARGET)
    publish(SOURCE, "1.4.0", base)
    print(json.dumps({"ignored": proposal}))


def native(kind):
    base = PREFIX + "/" + kind
    title = f"test(onesquad): v1.5.0 {'native conflict' if kind == 'conflict' else 'documentation update'}"
    existing = find_pr(base, title)
    if existing:
        print(json.dumps({"existing": existing}))
        return
    with tempfile.TemporaryDirectory() as directory:
        root = Path(directory) / "client"
        anchor = fixture(root, "1.4.0", base)
        guide = root / "AGENTS.md"
        if kind == "conflict":
            guide.write_text(guide.read_text().replace(
                "Start from the requested task and load only the relevant project context.",
                "Start with our payments maintainer before loading project context."))
        else:
            guide.write_text(guide.read_text() + "\n## Client rules\n\nKeep our payments-owner review.\n")
        base_sha = commit(root, "test: client-specific guidance")
        git(root, "push", "--quiet", "origin", base)
        branch = "onesquad/review-suite-" + kind + "-v1.5.0"
        git(root, "checkout", "--quiet", "-b", branch, anchor)
        summary = prepare(SOURCE, root, "v1.5.0", "1.5.0")
        if summary["conflicts"]:
            raise ValueError("Pristine fixture unexpectedly conflicts with upstream")
        commit(root, "chore(onesquad): update to v1.5.0")
        if git(root, "merge-base", base, branch) != anchor:
            raise ValueError("Incorrect native update ancestor")
        live = git(root, "ls-remote", "origin", "refs/heads/" + base).split()[0]
        if live != base_sha:
            raise ValueError("Client base changed during publication")
        git(root, "push", "--quiet", "origin", branch)
        notes = json.loads(run("gh", "release", "view", "v1.5.0", "--repo",
                               UPSTREAM, "--json", "body,url"))
        body = (
            "Démonstration déterministe OneSquad **1.4.0 → 1.5.0**, sans IA. "
            "Ajoute `docs/run/onesquad/update-review.md` et précise le routing dans `AGENTS.md`.\n\n"
            + ("**Conflit Git natif attendu dans `AGENTS.md`** : le client et OneSquad "
               "modifient la même ligne depuis leur ancêtre commun. Résoudre dans Conversation "
               "ou localement, préserver les règles métier puis faire relire.\n\n"
               if kind == "conflict" else
               "Les règles de revue ajoutées par le client restent présentes dans le résultat "
               "de fusion. Inspecter le nouveau dossier de documentation et faire relire.\n\n")
            + f"## Release\n\n[{notes['url']}]({notes['url']})\n\n{notes['body']}\n\n"
            "La version proposée n'est intégrée qu'après merge. Aucun rapport artificiel, "
            "aucune exécution de script client. Branche fixture isolée ; pas de déploiement "
            "automatique ni de merge effectué par ce test.")
        body_file = Path(directory) / "body.md"
        body_file.write_text(body)
        url = run("gh", "pr", "create", "--repo", TARGET, "--base", base,
                  "--head", branch, "--title", title, "--body-file", str(body_file))
        print(json.dumps({"url": url, "anchor": anchor, "kind": kind}))


def suite():
    native("normal")
    native("conflict")
    publish(SOURCE, "1.5.0", PREFIX + "/skip")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("skip", "suite"))
    args = parser.parse_args()
    skip() if args.command == "skip" else suite()
