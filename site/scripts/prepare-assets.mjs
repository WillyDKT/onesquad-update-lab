import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const site = fileURLToPath(new URL("../", import.meta.url));

async function copyArticleAssets(directory, relative = "") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const source = path.join(directory, entry.name);
    const target = path.join(relative, entry.name);
    if (entry.isDirectory()) await copyArticleAssets(source, target);
    else if (!entry.name.endsWith(".md")) {
      const destination = path.join(site, "public/docs-assets", target);
      await mkdir(path.dirname(destination), { recursive: true });
      await cp(source, destination);
    }
  }
}

await rm(path.join(site, "public/docs-assets"), { recursive: true, force: true });
await copyArticleAssets(path.join(site, "docs"));
