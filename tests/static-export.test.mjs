import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("exports a GitHub Pages entry point", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

  assert.match(html, /React Ecosystem Explorer/);
  assert.doesNotMatch(html, /\/api\/ecosystem/);
  await access(new URL("../out/.nojekyll", import.meta.url));
});

test("exports the generated ecosystem snapshot", async () => {
  const payload = JSON.parse(await readFile(new URL("../out/ecosystem.json", import.meta.url), "utf8"));

  assert.ok(Array.isArray(payload.libraries));
  assert.ok(payload.libraries.length >= 30);
  assert.equal(payload.source, "vault-developer/react-ecosystem-chart");
  assert.ok(Number.isFinite(Date.parse(payload.refreshedAt)));
});
