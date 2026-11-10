import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const website = resolve(import.meta.dirname, "..");
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

export function checkModelDocs(root = website, { catalog, siteManifest } = {}) {
  const problems = [];
  const manifest = readJson(resolve(root, "public-models.json"));
  const locales = Object.keys(readJson(resolve(root, "locales.json")));
  const ids = new Set();
  for (const model of manifest.models) {
    if (ids.has(model.id)) problems.push(`Duplicate model: ${model.id}`);
    ids.add(model.id);
    if (model.path !== `api/models/${model.id}`) problems.push(`Invalid model path: ${model.id}`);
    for (const locale of locales) {
      const docs = resolve(
        root,
        locale === "zh-Hans" ? "docs" : `i18n/${locale}/docusaurus-plugin-content-docs/current`,
      );
      const path = resolve(docs, `${model.path}.md`);
      if (!existsSync(path)) {
        problems.push(`${locale}: missing ${model.path}`);
        continue;
      }
      const body = readFileSync(path, "utf8");
      for (const anchor of ["integration", "endpoints", "parameters", "example", "results"])
        if (!body.includes(`{#${anchor}}`)) problems.push(`${locale}/${model.id}: missing ${anchor}`);
      if (!body.includes(`"model": "${model.id}"`))
        problems.push(`${locale}/${model.id}: missing exact-ID request example`);
      for (const endpoint of model.endpoints)
        if (!body.includes(`\`${endpoint}\``)) problems.push(`${locale}/${model.id}: missing ${endpoint}`);
      const index = readFileSync(resolve(docs, "api/models.md"), "utf8");
      if (!index.includes(`](./models/${model.id}.md)`))
        problems.push(`${locale}: model absent from index: ${model.id}`);
    }
  }
  if (catalog) {
    if (!Array.isArray(catalog.data) || !catalog.data.length)
      problems.push("Live catalog has no data array or is empty");
    for (const model of catalog.data ?? []) {
      const documented = manifest.models.find((item) => item.id === model.id);
      if (!documented) problems.push(`Public model has no documentation: ${model.id}`);
      for (const endpoint of model.endpoints ?? [])
        if (documented && !documented.endpoints.includes(endpoint))
          problems.push(`Undocumented public endpoint: ${model.id}/${endpoint}`);
    }
  }
  if (siteManifest) {
    const routes = Object.fromEntries(manifest.models.map((model) => [model.id, model.path]));
    if (JSON.stringify(Object.entries(routes).sort()) !== JSON.stringify(Object.entries(siteManifest).sort()))
      problems.push("Console model links differ from the documentation manifest");
  }
  return problems;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const args = process.argv.slice(2);
  const value = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined);
  let catalog = value("--catalog") ? readJson(resolve(value("--catalog"))) : undefined;
  if (args.includes("--live")) {
    if (!process.env.ZAI_API_KEY) throw new Error("--live requires ZAI_API_KEY in the environment");
    const response = await fetch("https://api.ourzai.com/v1/models", {
      headers: { Authorization: `Bearer ${process.env.ZAI_API_KEY}` },
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`Live model catalog returned HTTP ${response.status}`);
    catalog = await response.json();
  }
  const siteManifest = value("--site-manifest") ? readJson(resolve(value("--site-manifest"))) : undefined;
  const problems = checkModelDocs(website, { catalog, siteManifest });
  for (const problem of problems) console.error(problem);
  if (problems.length) process.exitCode = 1;
  else console.log(`Model documentation coverage passed${catalog ? " against public catalog" : ""}.`);
}
