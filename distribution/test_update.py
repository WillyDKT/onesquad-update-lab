import json
import subprocess
import tempfile
import unittest
from pathlib import Path

from update import MANIFEST, MARKER, REPORT, finalize, initialize, prepare


class UpdateTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.repo = Path(self.tmp.name) / "source"
        self.target = Path(self.tmp.name) / "target"
        self.repo.mkdir()
        self.target.mkdir()
        self.cmd("init", "--quiet")
        self.cmd("config", "user.name", "Test")
        self.cmd("config", "user.email", "test@example.invalid")
        self.source = self.repo / "distribution/sources/guide.md"
        self.source.parent.mkdir(parents=True)
        self.source.write_text("# Guide\n\nRule old.\n\n## Team\n\nLocal default.\n")
        data = {"schema_version": 1, "initialization": {"exclude": ["distribution", "site"]},
                "files": [{"source": "distribution/sources/guide.md",
                           "destination": "AGENTS.md", "policy": "merge"}]}
        (self.repo / MANIFEST).write_text(json.dumps(data))
        (self.repo / "site").mkdir()
        (self.repo / "site/index.md").write_text("Excluded site")
        (self.repo / ".config.md").write_text("Not copied in minimal mode")
        self.commit()
        self.cmd("tag", "v1.0.0")
        initialize(self.repo, self.target, "v1.0.0", "1.0.0", minimal=True)

    def cmd(self, *args):
        return subprocess.check_output(["git", "-C", str(self.repo), *args])

    def commit(self):
        self.cmd("add", ".")
        self.cmd("commit", "--quiet", "-m", "fixture")

    def release(self, version="1.1.0"):
        self.source.write_text(self.source.read_text().replace("Rule old.", "Rule new."))
        self.commit()
        self.cmd("tag", "v" + version)

    def test_clean_and_repeat(self):
        self.release()
        result = prepare(self.repo, self.target, "v1.1.0", "1.1.0")
        self.assertEqual(result["conflicts"], [])
        self.assertIn("Rule new.", (self.target / "AGENTS.md").read_text())
        self.assertEqual(prepare(self.repo, self.target, "v1.1.0", "1.1.0")["changes"], [])

    def test_non_overlapping_customization(self):
        local = self.target / "AGENTS.md"
        local.write_text(local.read_text().replace("Local default.", "Our local rule."))
        self.release()
        result = prepare(self.repo, self.target, "v1.1.0", "1.1.0")
        self.assertFalse(result["conflicts"])
        self.assertIn("Our local rule.", local.read_text())
        self.assertIn("Rule new.", local.read_text())

    def test_conflict_and_finalize(self):
        local = self.target / "AGENTS.md"
        local.write_text(local.read_text().replace("Rule old.", "Team alternative."))
        before = local.read_bytes()
        self.release()
        result = prepare(self.repo, self.target, "v1.1.0", "1.1.0")
        self.assertEqual(result["conflicts"], ["AGENTS.md"])
        self.assertEqual(local.read_bytes(), before)
        self.assertEqual(json.loads((self.target / MARKER).read_text())["version"], "1.0.0")
        report = (self.target / REPORT).read_text()
        for text in ("Rule old.", "Team alternative.", "Rule new."):
            self.assertIn(text, report)
        with self.assertRaises(ValueError):
            finalize(self.target, ["AGENTS.md"])
        local.write_text(local.read_text().replace("Team alternative.", "Rule new; team adapted."))
        finalize(self.target, ["AGENTS.md"])
        self.assertEqual(json.loads((self.target / MARKER).read_text())["version"], "1.1.0")
        self.assertFalse((self.target / REPORT).exists())

    def test_skipped_release_cumulative(self):
        self.release()
        self.source.write_text(self.source.read_text().replace("Local default.", "New default."))
        self.commit()
        self.cmd("tag", "v1.2.0")
        prepare(self.repo, self.target, "v1.2.0", "1.2.0")
        text = (self.target / "AGENTS.md").read_text()
        self.assertIn("Rule new.", text)
        self.assertIn("New default.", text)

    def test_symlink_and_disabled_are_rejected(self):
        local = self.target / "AGENTS.md"
        local.unlink()
        local.symlink_to(self.source)
        self.release()
        with self.assertRaises(ValueError):
            prepare(self.repo, self.target, "v1.1.0", "1.1.0")
        local.unlink()
        local.write_text("Project")
        marker = json.loads((self.target / MARKER).read_text())
        marker["updates_enabled"] = False
        (self.target / MARKER).write_text(json.dumps(marker))
        with self.assertRaises(ValueError):
            prepare(self.repo, self.target, "v1.1.0", "1.1.0")

    def test_minimal_install_excludes_profiles_and_site(self):
        self.assertFalse((self.target / ".config.md").exists())
        self.assertFalse((self.target / "site").exists())
        self.assertTrue((self.target / "apps/api/.gitkeep").exists())

    def test_unsafe_destination_is_rejected(self):
        data = json.loads((self.repo / MANIFEST).read_text())
        data["files"][0]["destination"] = "../escape"
        (self.repo / MANIFEST).write_text(json.dumps(data))
        self.commit()
        self.cmd("tag", "v1.1.0")
        with self.assertRaises(ValueError):
            prepare(self.repo, self.target, "v1.1.0", "1.1.0")

    def test_full_install_excludes_profile_and_site(self):
        target = Path(self.tmp.name) / "full"
        target.mkdir()
        initialize(self.repo, target, "v1.0.0", "1.0.0")
        self.assertFalse((target / ".config.md").exists())
        self.assertFalse((target / "site").exists())
        self.assertFalse((target / "distribution").exists())
        self.assertTrue((target / "AGENTS.md").exists())

    def test_local_deletion_is_reported_when_upstream_changes(self):
        (self.target / "AGENTS.md").unlink()
        self.release()
        result = prepare(self.repo, self.target, "v1.1.0", "1.1.0")
        self.assertEqual(result["conflicts"], ["AGENTS.md"])
        self.assertFalse((self.target / "AGENTS.md").exists())

    def test_untracked_project_content_is_untouched(self):
        extra = self.target / "business.md"
        extra.write_text("Local product rules")
        self.release()
        prepare(self.repo, self.target, "v1.1.0", "1.1.0")
        self.assertEqual(extra.read_text(), "Local product rules")

    def test_upstream_routing_preserves_client_review_rules(self):
        local = self.target / "AGENTS.md"
        local.write_text(local.read_text().replace(
            "Rule old.", "Rule old.\nClient-specific review must be preserved."))
        self.source.write_text(self.source.read_text()
                               + "\n## Agentic routing\n\nLoad context by requested task.\n")
        self.commit()
        self.cmd("tag", "v1.1.0")
        result = prepare(self.repo, self.target, "v1.1.0", "1.1.0")
        self.assertEqual(result["conflicts"], [])
        self.assertIn("Client-specific review must be preserved.", local.read_text())
        self.assertIn("## Agentic routing", local.read_text())


if __name__ == "__main__":
    unittest.main()
