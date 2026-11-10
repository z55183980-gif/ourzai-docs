import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const scriptPath = join(dirname(fileURLToPath(import.meta.url)), "translation-lock.mjs");

function write(root, relativePath, contents) {
  const path = join(root, relativePath);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents, "utf8");
}

function status(root) {
  const output = execFileSync(process.execPath, [scriptPath, "status", "--root", root, "--json"], {
    encoding: "utf8",
  });
  return JSON.parse(output);
}

function record(root) {
  execFileSync(process.execPath, [scriptPath, "record", "--root", root], { encoding: "utf8" });
}

test("prune removes only deleted pairs and keeps stale hashes and surviving orphan targets", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  const original = { "README.md": "old", "docs/gone.md": "gone", "docs/orphan.md": "orphan" };
  write(root, "README.md", "changed");
  write(root, "README.en.md", "old translation");
  write(root, "i18n/en/docusaurus-plugin-content-docs/current/orphan.md", "surviving translation");
  write(root, "i18n/translation.lock.json", JSON.stringify(original));
  execFileSync(process.execPath, [scriptPath, "prune", "--root", root]);
  assert.deepEqual(JSON.parse(readFileSync(join(root, "i18n/translation.lock.json"), "utf8")), {
    "README.md": "old",
    "docs/orphan.md": "orphan",
  });
});

test("selective record leaves unrelated stale sources pending", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "README.md", "old");
  write(root, "README.en.md", "old");
  write(root, "docs/start.md", "old");
  write(root, "i18n/en/docusaurus-plugin-content-docs/current/start.md", "translated");
  record(root);
  write(root, "README.md", "new");
  write(root, "docs/start.md", "new");
  execFileSync(process.execPath, [scriptPath, "record", "--root", root, "--source", "docs/start.md"]);
  assert.deepEqual(status(root), [{ source: "README.md", target: "README.en.md", state: "stale" }]);
});

test("status reports every untranslated documentation source", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "docs/index.mdx", "# 首页 {#home}\n");
  write(root, "docs/guide/start.md", "# 入门 {#start}\n");
  write(root, "README.md", "# ZaiDrama\n");

  assert.deepEqual(status(root), [
    {
      source: "docs/guide/start.md",
      target: "i18n/en/docusaurus-plugin-content-docs/current/guide/start.md",
      state: "missing",
    },
    {
      source: "docs/index.mdx",
      target: "i18n/en/docusaurus-plugin-content-docs/current/index.mdx",
      state: "missing",
    },
    { source: "README.md", target: "README.en.md", state: "missing" },
  ]);
});

test("record writes LF-normalized source hashes to the flat lockfile", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "README.md", "hello\r\n");
  write(root, "README.en.md", "hello\n");

  record(root);

  assert.equal(
    readFileSync(join(root, "i18n/translation.lock.json"), "utf8"),
    '{\n  "README.md": "5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03"\n}\n',
  );
  assert.deepEqual(status(root), []);
});

test("status reports translations whose sources were deleted", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "README.md", "# ZaiDrama\n");
  write(root, "README.en.md", "# ZaiDrama\n");
  write(root, "docs/guide/start.md", "# 入门\n");
  write(root, "i18n/en/docusaurus-plugin-content-docs/current/guide/start.md", "# Getting started\n");
  record(root);
  renameSync(join(root, "README.md"), join(root, "README.deleted"));
  renameSync(join(root, "docs/guide/start.md"), join(root, "docs/guide/start.deleted"));

  assert.deepEqual(status(root), [
    {
      source: "docs/guide/start.md",
      target: "i18n/en/docusaurus-plugin-content-docs/current/guide/start.md",
      state: "orphan",
    },
    { source: "README.md", target: "README.en.md", state: "orphan" },
  ]);
});

test("status reports unregistered document translations but ignores locale assets", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "i18n/vi/docusaurus-plugin-content-docs/current/guide/unregistered.md", "# Unregistered\n");
  write(root, "i18n/en/docusaurus-plugin-content-docs/current.json", '{"title":"Docs"}\n');
  write(root, "i18n/en/docusaurus-theme-classic/navbar.json", '{"title":"Docs"}\n');
  write(root, "i18n/en/code.json", '{"theme.ErrorPageContent.title":"Error"}\n');

  assert.deepEqual(status(root), [
    {
      source: "docs/guide/unregistered.md",
      target: "i18n/vi/docusaurus-plugin-content-docs/current/guide/unregistered.md",
      state: "orphan",
    },
  ]);
});

test("status reports a translation as stale when its lock entry was removed", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "docs/guide/start.md", "# 入门\n");
  write(root, "i18n/en/docusaurus-plugin-content-docs/current/guide/start.md", "# Getting started\n");
  record(root);
  write(root, "i18n/translation.lock.json", "{}\n");

  assert.deepEqual(status(root), [
    {
      source: "docs/guide/start.md",
      target: "i18n/en/docusaurus-plugin-content-docs/current/guide/start.md",
      state: "stale",
    },
  ]);
});

test("status reports a translated source whose recorded content changed", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "README.md", "# ZaiDrama\n");
  write(root, "README.en.md", "# ZaiDrama\n");
  record(root);
  write(root, "README.md", "# ZaiDrama video creation\n");

  assert.deepEqual(status(root), [{ source: "README.md", target: "README.en.md", state: "stale" }]);
});

test("record refuses to hide a missing translation", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "README.md", "# ZaiDrama\n");

  const result = spawnSync(process.execPath, [scriptPath, "record", "--root", root], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Refusing to record missing translations:\nREADME\.md/);
  assert.equal(existsSync(join(root, "i18n/translation.lock.json")), false);
});

test("record refuses to hide an orphan translation that still exists", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "README.md", "# ZaiDrama\n");
  write(root, "README.en.md", "# ZaiDrama\n");
  record(root);
  renameSync(join(root, "README.md"), join(root, "README.deleted"));

  const result = spawnSync(process.execPath, [scriptPath, "record", "--root", root], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Refusing to record orphan translations:\nREADME\.en\.md/);
});

test("record refuses to hide an unregistered document translation", () => {
  const root = mkdtempSync(join(tmpdir(), "zaidrama-translation-lock-"));
  write(root, "i18n/en/docusaurus-plugin-content-docs/current/guide/unregistered.md", "# Unregistered\n");

  const result = spawnSync(process.execPath, [scriptPath, "record", "--root", root], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /Refusing to record orphan translations:\ni18n\/en\/docusaurus-plugin-content-docs\/current\/guide\/unregistered\.md/,
  );
});
