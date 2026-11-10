import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { checkModelDocs } from "./check-model-docs.mjs";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(readFileSync(resolve(root, "public-models.json"), "utf8"));

test("all documented models have localized guides and exact request IDs", () => {
  assert.deepEqual(checkModelDocs(root, { catalog: { data: manifest.models } }), []);
});
test("a newly exposed model fails coverage", () => {
  assert.ok(
    checkModelDocs(root, { catalog: { data: [{ id: "undocumented-model" }] } }).some((p) =>
      p.includes("Public model has no documentation"),
    ),
  );
});
test("an additional public endpoint requires documentation", () => {
  assert.ok(
    checkModelDocs(root, { catalog: { data: [{ id: "gpt-6-sol", endpoints: ["images.generations"] }] } }).some((p) =>
      p.includes("Undocumented public endpoint"),
    ),
  );
});
test("an empty catalog or stale console route fails coverage", () => {
  assert.ok(checkModelDocs(root, { catalog: { data: [] } }).length);
  assert.ok(checkModelDocs(root, { siteManifest: { "gpt-6-sol": "api/quickstart" } }).length);
});
