import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readFrontMatterScalar, scanMarkdownLines } from "./markdown-scan.mjs";

const website = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = "docusaurus-plugin-content-docs/current";
export const uiFiles = [
  "code.json",
  "docusaurus-theme-classic/navbar.json",
  "docusaurus-theme-classic/footer.json",
  "docusaurus-plugin-content-docs/current.json",
];

function walk(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(root, entry.name);
    return entry.isDirectory() ? walk(path) : /\.mdx?$/.test(path) ? [path] : [];
  });
}

const read = (path) => readFileSync(path, "utf8").replace(/\r\n?/g, "\n");
const fingerprint = (text) => createHash("sha256").update(text).digest("hex");
const anchors = (text) =>
  [...scanMarkdownLines(text)].filter(({ hashes }) => hashes).map(({ text }) => text.match(/\{#[a-z0-9-]+\}$/)?.[0]);
const tokens = (text) => [...new Set(text.match(/\{\w+\}/g) ?? [])].sort();
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);

export function checkLocales(root = website, { record = false } = {}) {
  const locales = JSON.parse(read(resolve(root, "locales.json")));
  const lockPath = resolve(root, "i18n/localization.lock.json");
  const previous = existsSync(lockPath) ? JSON.parse(read(lockPath)) : {};
  const entries = {};
  const problems = [];
  const stale = [];
  const docPaths = walk(resolve(root, "docs")).map((path) =>
    relative(resolve(root, "docs"), path).replaceAll("\\", "/"),
  );
  for (const [locale, config] of Object.entries(locales)) {
    if (!config.source) continue;
    const sourceRoot = resolve(root, config.source === "zh-Hans" ? "docs" : `i18n/${config.source}/${contentDir}`);
    const targetRoot = resolve(root, `i18n/${locale}/${contentDir}`);
    for (const file of docPaths) {
      const source = resolve(sourceRoot, file);
      const target = resolve(targetRoot, file);
      if (!existsSync(source) || !existsSync(target)) {
        problems.push(`${locale}/${file}: missing source or translation`);
        continue;
      }
      const a = read(source);
      const b = read(target);
      if (!same(anchors(a), anchors(b))) problems.push(`${locale}/${file}: heading anchors differ`);
      for (const key of [
        "id",
        "slug",
        "sidebar_position",
        "update_docs",
        "hide_title",
        "hide_table_of_contents",
        "pagination_next",
        "pagination_prev",
      ]) {
        const value = (text) => readFrontMatterScalar(text, key);
        if (value(a) !== value(b)) problems.push(`${locale}/${file}: ${key} differs`);
      }
      if (locale !== "en") {
        const blocks = (text) => text.match(/^```[^\n]*\n[\s\S]*?^```/gm) ?? [];
        if (!same(blocks(a), blocks(b))) problems.push(`${locale}/${file}: executable examples differ`);
        const routes = (text) =>
          [...text.matchAll(/\]\(([^\s)]+)(?:\s+[^)]*)?\)|\bto="([^"]+)"/g)]
            .map((match) => match[1] ?? match[2])
            .filter((url) => !url.startsWith("https://docs.ourzai.com"));
        if (!same(routes(a), routes(b))) problems.push(`${locale}/${file}: link destinations differ`);
        const docLinks = (text) =>
          [...text.matchAll(/https:\/\/docs\.ourzai\.com(?:\/[^\s<>"')}]*)?/g)].map((m) => m[0]);
        const expectedLinks = docLinks(a).map((link) => {
          const url = new URL(link);
          const parts = url.pathname.split("/").filter(Boolean);
          if (parts[0] in locales) parts.shift();
          return `${url.origin}/${locale}/${parts.join("/")}${url.search}${url.hash}`;
        });
        if (!same(expectedLinks, docLinks(b))) problems.push(`${locale}/${file}: documentation locale links differ`);
        const key = `i18n/${locale}/${contentDir}/${file}`;
        entries[key] = { source: relative(root, source).replaceAll("\\", "/"), sha256: fingerprint(a) };
        if (!same(previous[key], entries[key])) stale.push(key);
        if (a === b) problems.push(`${locale}/${file}: untranslated source copy`);
      }
    }
    for (const file of walk(targetRoot)) {
      if (!docPaths.includes(relative(targetRoot, file).replaceAll("\\", "/")))
        problems.push(`${file}: orphan translation`);
    }
    for (const file of uiFiles) {
      const source = resolve(root, `i18n/${config.source === "zh-Hans" ? "zh-Hans" : "en"}/${file}`);
      const target = resolve(root, `i18n/${locale}/${file}`);
      if (!existsSync(target)) {
        problems.push(`${locale}/${file}: missing UI messages`);
        continue;
      }
      const reference = JSON.parse(read(resolve(root, `i18n/en/${file}`)));
      const actual = JSON.parse(read(target));
      for (const [key, value] of Object.entries(reference)) {
        if (key === "copyright") continue;
        if (!actual[key]?.message?.trim()) problems.push(`${locale}/${file}: missing ${key}`);
        else if (!same(tokens(value.message), tokens(actual[key].message)))
          problems.push(`${locale}/${file}: placeholders differ in ${key}`);
      }
      if (actual.copyright) problems.push(`${locale}/${file}: static copyright year`);
      if (locale !== "en" && existsSync(source)) {
        const key = `i18n/${locale}/${file}`;
        entries[key] = { source: relative(root, source).replaceAll("\\", "/"), sha256: fingerprint(read(source)) };
        if (!same(previous[key], entries[key])) stale.push(key);
      }
    }
  }
  if (record && problems.length === 0) writeFileSync(lockPath, `${JSON.stringify(entries, null, 2)}\n`);
  return { problems, stale: record && problems.length === 0 ? [] : stale };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const result = checkLocales(website, { record: process.argv.includes("--record") });
  for (const problem of result.problems) console.error(problem);
  for (const path of result.stale) console.error(`Translation source changed: ${path}`);
  if (result.problems.length || result.stale.length) process.exitCode = 1;
  else console.log("All locale pages, UI messages, anchors, placeholders, and source fingerprints are complete.");
}
