#!/usr/bin/env python3
"""Isolated pilot: tracked-file installation and deterministic three-way updates."""

import argparse
import fnmatch
import hashlib
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path, PurePosixPath


MARKER = ".github/onesquad"
REPORT = ".github/onesquad-update/report.md"
STATE = ".github/onesquad-update/state.json"
MANIFEST = "distribution/manifest.json"
UPSTREAM = "WillyDKT/onesquad-update-lab"


def git(repo, *args):
    return subprocess.check_output(["git", "-C", str(repo), *args])


def safe_path(value):
    path = PurePosixPath(value)
    if (not value or path.is_absolute() or ".." in path.parts
            or "\\" in value or str(path) != value
            or any(part.lower() == ".git" for part in path.parts)):
        raise ValueError(f"Unsafe path: {value!r}")
    return value


def destination(root, name):
    safe_path(name)
    target = root / name
    for path in (target, *target.parents):
        if path == root:
            break
        if path.is_symlink():
            raise ValueError(f"Symlink destination is forbidden: {name}")
    if target.exists() and not target.is_file():
        raise ValueError(f"Destination is not a regular file: {name}")
    return target


def entries(repo, ref):
    result = {}
    for record in git(repo, "ls-tree", "-r", "-z", ref).split(b"\0"):
        if not record:
            continue
        info, name = record.split(b"\t", 1)
        mode, kind, oid = info.decode().split()
        name = safe_path(name.decode())
        if kind != "blob" or mode not in ("100644", "100755"):
            raise ValueError(f"Unsupported source type: {name} ({mode})")
        result[name] = (mode, oid)
    return result


def content(repo, tree, name):
    if name not in tree:
        raise ValueError(f"Missing tracked source: {name}")
    return git(repo, "cat-file", "blob", tree[name][1])


def manifest(repo, tree):
    data = json.loads(content(repo, tree, MANIFEST))
    if data["schema_version"] != 1:
        raise ValueError("Unsupported manifest schema")
    seen = set()
    for item in data["files"]:
        safe_path(item["source"])
        name = safe_path(item["destination"])
        if (name in seen or name in (MARKER, ".config.md")
                or name.startswith(".github/onesquad-update/")):
            raise ValueError(f"Duplicate or reserved destination: {name}")
        if item["policy"] not in ("merge", "managed", "seed"):
            raise ValueError(f"Unknown policy: {item['policy']}")
        content(repo, tree, item["source"])
        seen.add(name)
    for name in data["initialization"]["exclude"]:
        safe_path(name)
    return data


def write(root, name, data, mode="100644"):
    path = destination(root, name)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    path.chmod(0o755 if mode == "100755" else 0o644)


def json_bytes(data):
    return (json.dumps(data, indent=2) + "\n").encode()


def marker(version, commit):
    # SemVer releases are explicitly selected, never inferred from branch names.
    if not re.fullmatch(r"[0-9]+\.[0-9]+\.[0-9]+", version):
        raise ValueError("Pilot expects a stable MAJOR.MINOR.PATCH version")
    return dict(schema_version=1, upstream=UPSTREAM, version=version,
                commit=commit, updates_enabled=True)


def excluded(name, patterns):
    return any(name == p or name.startswith(p.rstrip("/") + "/")
               or fnmatch.fnmatchcase(name, p) for p in patterns)


def initialize(repo, target, ref, version, minimal=False):
    if any(target.iterdir()):
        raise ValueError("Installation requires an empty destination directory")
    commit = git(repo, "rev-parse", "--verify", f"{ref}^{{commit}}").decode().strip()
    tree = entries(repo, commit)
    data = manifest(repo, tree)
    result = marker(version, commit)
    output = {}
    if not minimal:
        for name, (mode, _) in tree.items():
            if not excluded(name, data["initialization"]["exclude"] + [".config.md"]):
                output[name] = (content(repo, tree, name), mode)
    for item in data["files"]:
        output[item["destination"]] = (
            content(repo, tree, item["source"]), tree[item["source"]][0])
    output[MARKER] = (json_bytes(result), "100644")
    if minimal:
        output["README.md"] = (b"# OneSquad example lab\n\nPrivate synthetic adopter.\n", "100644")
        output[".gitignore"] = (b".config.md\n.DS_Store\n", "100644")
        for folder in ("apps/api", "apps/front", "docs/architecture", "docs/run"):
            output[f"{folder}/.gitkeep"] = (b"", "100644")
    for name, (blob, mode) in output.items():
        write(target, name, blob, mode)
    return {"installed": len(output), "version": version, "minimal": minimal}


def merge(base, local, new):
    if b"\0" in base + local + new:
        return None
    with tempfile.TemporaryDirectory() as tmp:
        paths = [Path(tmp) / str(i) for i in range(3)]
        for path, data in zip(paths, (local, base, new)):
            path.write_bytes(data)
        result = subprocess.run(
            ["git", "merge-file", "-p", *map(str, paths)], capture_output=True)
        if result.returncode == 0:
            return result.stdout
        if 0 < result.returncode < 128:
            return None
        raise RuntimeError(result.stderr.decode() or "git merge-file failed")


def digest(blob):
    return hashlib.sha256(blob).hexdigest() if blob is not None else None


def section(blob):
    if blob is None:
        return "    (absent)\n"
    # Indentation keeps local text from terminating a Markdown code fence.
    return "".join("    " + line + "\n"
                   for line in blob.decode("utf-8", errors="replace").splitlines())


def prepare(repo, target, ref, version):
    current = json.loads(destination(target, MARKER).read_bytes())
    if current.get("schema_version") != 1 or current.get("upstream") != UPSTREAM:
        raise ValueError("Unsupported or foreign adopter marker")
    if not current.get("updates_enabled", False):
        raise ValueError("Updates are disabled by the adopting team")
    for name in (REPORT, STATE):
        if destination(target, name).exists():
            raise ValueError("Resolve the pending update before preparing another one")
    old_commit = current["commit"]
    if not re.fullmatch(r"[a-f0-9]{40}", old_commit):
        raise ValueError("The installed commit must be a full Git SHA")
    new_commit = git(repo, "rev-parse", "--verify", f"{ref}^{{commit}}").decode().strip()
    next_marker = marker(version, new_commit)
    old_tree, new_tree = entries(repo, old_commit), entries(repo, new_commit)
    old_manifest, new_manifest = manifest(repo, old_tree), manifest(repo, new_tree)
    old = {i["destination"]: i for i in old_manifest["files"]}
    new = {i["destination"]: i for i in new_manifest["files"]}
    changes, conflicts = [], []
    planned = []
    for name in sorted(old.keys() | new.keys()):
        before, after = old.get(name), new.get(name)
        local_path = destination(target, name)
        local = local_path.read_bytes() if local_path.exists() else None
        base = content(repo, old_tree, before["source"]) if before else None
        incoming = content(repo, new_tree, after["source"]) if after else None
        reason = None
        output = None
        if after and after["policy"] == "seed":
            continue
        if not after or (before and before["policy"] != after["policy"]):
            reason = "Tracking removal or policy change requires human review"
        elif before and old_tree[before["source"]][0] != new_tree[after["source"]][0]:
            reason = "Executable mode change requires human review"
        elif incoming == base or incoming == local:
            continue
        elif local == base:
            output = incoming
        elif after["policy"] == "managed":
            reason = "Managed file was customized locally"
        elif base is None or local is None:
            reason = "Concurrent addition or local deletion"
        else:
            output = merge(base, local, incoming)
            if output is None:
                reason = "Overlapping text changes or unsupported binary content"
        if reason:
            conflicts.append(dict(path=name, reason=reason, local_sha256=digest(local),
                                  base=base, local=local, incoming=incoming))
        else:
            planned.append((name, output, new_tree[after["source"]][0]))
            changes.append(name)
    # All paths and manifests have been validated before writes begin.
    for name, blob, mode in planned:
        write(target, name, blob, mode)
    summary = dict(from_version=current["version"], to_version=version,
                   changes=changes, conflicts=[c["path"] for c in conflicts])
    if conflicts:
        lines = [f"# OneSquad update {current['version']} -> {version}\n\n",
                 "Draft: resolve every conflict and obtain human review. "
                 "The integrated version has NOT advanced.\n\n"]
        for c in conflicts:
            lines += [f"## {c['path']}\n\n{c['reason']}\n\n"]
            for label, key in (("Old OneSquad base", "base"), ("Current project", "local"),
                               ("New OneSquad release", "incoming")):
                lines += [f"### {label}\n\n", section(c[key]), "\n"]
        write(target, REPORT, "".join(lines).encode())
        state = dict(target=next_marker, summary=summary,
                     conflicts=[{k: c[k] for k in ("path", "reason", "local_sha256")}
                                for c in conflicts])
        write(target, STATE, json_bytes(state))
    else:
        write(target, MARKER, json_bytes(next_marker))
    return summary


def finalize(target, resolved):
    state = json.loads(destination(target, STATE).read_bytes())
    required = {c["path"] for c in state["conflicts"]}
    if set(resolved) != required:
        raise ValueError(f"Explicit resolution required for: {sorted(required)}")
    for conflict in state["conflicts"]:
        path = destination(target, conflict["path"])
        blob = path.read_bytes() if path.exists() else None
        if digest(blob) == conflict["local_sha256"]:
            raise ValueError(f"Resolution has not changed the file: {conflict['path']}")
        if blob and any(line.startswith((b"<<<<<<< ", b"=======", b">>>>>>> "))
                        for line in blob.splitlines()):
            raise ValueError(f"Unresolved conflict markers: {conflict['path']}")
    write(target, MARKER, json_bytes(state["target"]))
    destination(target, REPORT).unlink()
    destination(target, STATE).unlink()
    return dict(finalized=sorted(required), version=state["target"]["version"],
                warning="Content correctness still requires human review")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("initialize", "prepare", "finalize"))
    parser.add_argument("--source", type=Path, default=Path.cwd())
    parser.add_argument("--target", type=Path, required=True)
    parser.add_argument("--ref")
    parser.add_argument("--version")
    parser.add_argument("--minimal", action="store_true")
    parser.add_argument("--resolved", action="append", default=[])
    args = parser.parse_args()
    try:
        if args.command == "finalize":
            result = finalize(args.target.resolve(), args.resolved)
        else:
            if not args.ref or not args.version:
                raise ValueError("--ref and --version are required")
            operation = initialize if args.command == "initialize" else prepare
            extra = {"minimal": args.minimal} if args.command == "initialize" else {}
            result = operation(args.source.resolve(), args.target.resolve(),
                               args.ref, args.version, **extra)
        print(json.dumps(result, indent=2))
        return 2 if result.get("conflicts") else 0
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError) as error:
        print(f"OneSquad pilot error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
