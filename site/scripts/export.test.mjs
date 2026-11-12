import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const output = path.resolve("out");
const routes = ["", "docs", "docs/tutorials", "docs/how-to", "docs/explanation", "docs/reference",
  "docs/tutorials/getting-started", "docs/how-to/adopt-one-squad",
  "docs/explanation/delivery-workflow", "docs/reference/repository-guide"];

test("every preserved route exports with one shared header and valid local targets", async () => {
  for (const route of routes) {
    const file = path.join(output, route, "index.html");
    const html = await readFile(file, "utf8");
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route}: one title`);
    assert.equal((html.match(/<header(?:\s|>)/g) ?? []).length, 1, `${route}: shared header`);
    assert.ok(html.indexOf("search-trigger") < html.indexOf("header-links"), `${route}: actions after search`);
    for (const label of ["Community", "Docs", "Contribute"]) assert.ok(html.includes(`>${label}</a>`), `${route}: ${label}`);
    const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? "";
    assert.match(header, /class="primary-link getting-started-cta"[^>]*href="\/docs\/tutorials\/getting-started\/"[^>]*>Getting started <svg[^>]*aria-hidden="true"[\s\S]*?<\/svg><\/a>/, `${route}: filled Getting started CTA with arrow`);
    assert.ok(!header.includes(">Guide</a>"), `${route}: no Guide link`);
    assert.ok(!header.includes('href="/#community"'), `${route}: no community scroll`);
    assert.ok(header.includes('href="https://chat.google.com/room/AAQADS7Zzp8?cls=7"'), `${route}: direct community destination`);
    assert.ok(header.indexOf("search-trigger") < header.indexOf("getting-started-cta"), `${route}: CTA after search`);
    assert.ok(header.indexOf("getting-started-cta") < header.indexOf("header-links"), `${route}: CTA before navigation`);
    assert.ok(header.indexOf(">Docs</a>") < header.indexOf(">Community</a>"), `${route}: Docs before Community`);
    assert.ok(header.includes("M12 6.253v13"), `${route}: reference open-book icon`);
    assert.ok(!html.includes("<<<<<<<"));
    for (const [, href] of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
      if (!href || href.startsWith("#") || /^(?:https?:|data:|mailto:|\/\/)/.test(href)) continue;
      const url = new URL(href.replaceAll("&amp;", "&"), `https://example.test/${route}/`);
      const target = path.join(output, decodeURIComponent(url.pathname), url.pathname.endsWith("/") ? "index.html" : "");
      assert.ok(existsSync(target), `${route}: missing target ${href}`);
    }
  }
});

test("published sources are not leaked and document frontmatter is not rendered", async () => {
  const home = await readFile(path.join(output, "index.html"), "utf8");
  assert.ok(!home.includes("Sources and team documentation"));
  assert.ok(!home.includes('id="sources"'));
  assert.ok(!home.includes("29 October 2026"));
  assert.ok(!existsSync(path.join(output, "docs/context-map.md")));
  const tutorial = await readFile(path.join(output, "docs/tutorials/getting-started/index.html"), "utf8");
  const visibleHtml = tutorial.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.ok(!visibleHtml.includes("id: TRAINING-GETTING-STARTED"));
  assert.ok(tutorial.includes("/edit/main/site/docs/tutorials/getting-started.md"));
  assert.ok(tutorial.includes('aria-label="On this page"'));
  assert.ok((await readdir(path.join(output, "assets"))).includes("one-squad-logo-transparent.png"));
});
