#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";

const I18N_ROOT = "i18n";
const DOCS_TRANSLATION_SUBDIRECTORY = "docusaurus-plugin-content-docs/current";
const DOCS_TRANSLATION_ROOT = `${I18N_ROOT}/en/${DOCS_TRANSLATION_SUBDIRECTORY}`;
const LOCK_PATH = "i18n/translation.lock.json";

function toPosix(path) {
  return path.split(sep).join("/");
}

function walkMarkdown(root, directory) {
  const absoluteDirectory = resolve(root, directory);
  if (!existsSync(absoluteDirectory)) return [];

  return readdirSync(absoluteDirectory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(absoluteDirectory, entry.name);
    if (entry.isDirectory()) return walkMarkdown(root, toPosix(relative(root, path)));
    if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) return [];
    return [toPosix(relative(root, path))];
  });
}

function targetForSource(source) {
  if (source === "README.md") return "README.en.md";
  if (source.startsWith("docs/")) {
    return `${DOCS_TRANSLATION_ROOT}/${source.slice("docs/".length)}`;
  }
  return null;
}

function sourceTargets(root) {
  const mappings = [
    ["README.md", targetForSource("README.md")],
    ...walkMarkdown(root, "docs").map((source) => [source, targetForSource(source)]),
  ];
  return mappings
    .filter(([source]) => existsSync(resolve(root, source)))
    .sort(([left], [right]) => left.localeCompare(right));
}

// Additional locales follow their declared source language; English retains its existing lock.
function additionalTargets(root) {
  const configPath = resolve(root, "locales.json");
  if (!existsSync(configPath)) return [];
  const locales = JSON.parse(readFileSync(configPath, "utf8"));
  return Object.entries(locales)
    .filter(([locale, config]) => locale !== "en" && config.source)
    .flatMap(([locale]) =>
      walkMarkdown(root, "docs").map(
        (source) => `${I18N_ROOT}/${locale}/${DOCS_TRANSLATION_SUBDIRECTORY}/${source.slice("docs/".length)}`,
      ),
    );
}

function documentTranslationTargets(root) {
  const absoluteI18nRoot = resolve(root, I18N_ROOT);
  if (!existsSync(absoluteI18nRoot)) return [];

  return readdirSync(absoluteI18nRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => walkMarkdown(root, `${I18N_ROOT}/${entry.name}/${DOCS_TRANSLATION_SUBDIRECTORY}`))
    .sort((left, right) => left.localeCompare(right));
}

function sourceForTranslationTarget(target) {
  const marker = `/${DOCS_TRANSLATION_SUBDIRECTORY}/`;
  const relativeTarget = target.slice(target.indexOf(marker) + marker.length);
  return `docs/${relativeTarget}`;
}

// A target is registered when a current source maps to it (its lock entry may still be missing or
// stale) or when a lock entry maps to it (the forward scan already reports it as an orphan).
function unregisteredTranslationOrphans(root, lock, currentTargets) {
  const registeredTargets = new Set([
    ...currentTargets,
    ...Object.keys(lock)
      .map(targetForSource)
      .filter((target) => target !== null),
  ]);
  return documentTranslationTargets(root)
    .filter((target) => !registeredTargets.has(target))
    .map((target) => ({ source: sourceForTranslationTarget(target), target, state: "orphan" }));
}

function digest(path) {
  const normalized = readFileSync(path, "utf8").replace(/\r\n?/g, "\n");
  return createHash("sha256").update(normalized, "utf8").digest("hex");
}

function readLock(root) {
  const path = resolve(root, LOCK_PATH);
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, "utf8"));
}

function translationStatus(root) {
  const lock = readLock(root);
  const mappings = sourceTargets(root);
  const currentSources = new Set(mappings.map(([source]) => source));
  const currentTargets = new Set([...mappings.map(([, target]) => target), ...additionalTargets(root)]);
  const dirty = mappings.flatMap(([source, target]) => {
    if (!existsSync(resolve(root, target))) return [{ source, target, state: "missing" }];
    if (lock[source] !== digest(resolve(root, source))) return [{ source, target, state: "stale" }];
    return [];
  });
  const orphans = Object.keys(lock)
    .filter((source) => !currentSources.has(source))
    .map((source) => ({ source, target: targetForSource(source), state: "orphan" }));
  return [...dirty, ...orphans, ...unregisteredTranslationOrphans(root, lock, currentTargets)].sort(
    (left, right) => left.source.localeCompare(right.source) || left.target.localeCompare(right.target),
  );
}

function recordTranslations(root, sources = []) {
  const allMappings = sourceTargets(root);
  const mappings = sources.length ? allMappings.filter(([source]) => sources.includes(source)) : allMappings;
  const unknown = sources.filter((source) => !mappings.some(([current]) => source === current));
  if (unknown.length) throw new Error(`Unknown sources: ${unknown.join(", ")}`);
  const missing = mappings.filter(([, target]) => !existsSync(resolve(root, target)));
  if (missing.length > 0) {
    throw new Error(`Refusing to record missing translations:\n${missing.map(([source]) => source).join("\n")}`);
  }
  const currentSources = new Set(allMappings.map(([source]) => source));
  const currentTargets = new Set([...allMappings.map(([, target]) => target), ...additionalTargets(root)]);
  const orphanTargets = [
    ...Object.keys(readLock(root))
      .filter((source) => !currentSources.has(source))
      .map(targetForSource)
      .filter((target) => target !== null && existsSync(resolve(root, target))),
    ...documentTranslationTargets(root).filter((target) => !currentTargets.has(target)),
  ];
  if (orphanTargets.length > 0) {
    throw new Error(`Refusing to record orphan translations:\n${[...new Set(orphanTargets)].sort().join("\n")}`);
  }

  const lock = {
    ...(sources.length ? readLock(root) : {}),
    ...Object.fromEntries(mappings.map(([source]) => [source, digest(resolve(root, source))])),
  };
  const lockPath = resolve(root, LOCK_PATH);
  const temporaryPath = `${lockPath}.${process.pid}.tmp`;
  mkdirSync(dirname(lockPath), { recursive: true });
  writeFileSync(temporaryPath, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
  renameSync(temporaryPath, lockPath);
  return mappings.length;
}

function parseArguments(argv) {
  const command = argv[0];
  const rootIndex = argv.indexOf("--root");
  return {
    command,
    root: rootIndex === -1 ? process.cwd() : resolve(argv[rootIndex + 1]),
    json: argv.includes("--json"),
    sources: argv.flatMap((arg, index) => (arg === "--source" ? [argv[index + 1]] : [])),
  };
}

function pruneDeletedTranslations(root) {
  const lock = readLock(root);
  let removed = 0;
  for (const source of Object.keys(lock)) {
    const target = targetForSource(source);
    if (!existsSync(resolve(root, source)) && (!target || !existsSync(resolve(root, target)))) {
      delete lock[source];
      removed += 1;
    }
  }
  const lockPath = resolve(root, LOCK_PATH);
  const temporaryPath = `${lockPath}.${process.pid}.tmp`;
  writeFileSync(temporaryPath, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
  renameSync(temporaryPath, lockPath);
  return removed;
}

const { command, root, json, sources } = parseArguments(process.argv.slice(2));

if (!["status", "record", "prune"].includes(command)) {
  console.error("Usage: translation-lock.mjs <status|record|prune> [--root PATH] [--json] [--source PATH]");
  process.exitCode = 2;
} else if (command === "prune") {
  console.log(`Removed ${pruneDeletedTranslations(root)} deleted source/translation pairs; retained other hashes.`);
} else if (command === "record") {
  try {
    console.log(`Recorded ${recordTranslations(root, sources)} source hashes.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
} else {
  const status = translationStatus(root);
  if (json) {
    process.stdout.write(`${JSON.stringify(status, null, 2)}\n`);
  } else if (status.length === 0) {
    console.log("Translations are up to date.");
  } else {
    for (const item of status) console.log(`${item.state}\t${item.source}\t${item.target}`);
  }
}
