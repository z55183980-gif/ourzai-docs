import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const locales = JSON.parse(readFileSync(new URL("../locales.json", import.meta.url), "utf8"));

const entry = require.resolve("@easyops-cn/docusaurus-search-local");
const searchRequire = createRequire(entry);
const vietnamesePath = searchRequire.resolve("lunr-languages/lunr.vi");
const vietnameseReplacement = require.resolve("./lunr-vi.cjs");

export default function localizedSearch(context, options) {
  // 中文分词（lunr.zh）会把拉丁字母词整个丢掉，「API」「base_url」都搜不到，
  // 所以中文站在 locales.json 里写 ["en", "zh"]，两套分词一起建索引。
  const languages = [locales[context.i18n.currentLocale].search].flat();
  if (languages.includes("vi")) {
    // The bundled Vietnamese analyzer strips precomposed accents and keeps the
    // English query stemmer. Use the same Unicode analyzer on server and client.
    require(vietnamesePath);
    require.cache[vietnamesePath].exports = require(vietnameseReplacement);
  }
  // The upstream index builder caches its first language pipeline at module scope.
  // Docusaurus builds all locales in one process, so each locale needs a fresh builder.
  for (const path of [
    entry,
    searchRequire.resolve("./utils/postBuildFactory"),
    searchRequire.resolve("./utils/buildIndex"),
  ]) {
    delete require.cache[path];
  }
  const plugin = require(entry).default(context, { ...options, language: languages });
  if (languages.includes("vi")) {
    const constantsPath = join(
      context.generatedFilesDir,
      "@easyops-cn/docusaurus-search-local/default/generated-constants.js",
    );
    const constants = readFileSync(constantsPath, "utf8");
    if (!constants.includes(JSON.stringify(vietnamesePath))) throw new Error("Vietnamese search module is missing");
    writeFileSync(
      constantsPath,
      constants.replace(JSON.stringify(vietnamesePath), JSON.stringify(vietnameseReplacement)),
    );
  }
  return plugin;
}

export const validateOptions = require(entry).validateOptions;
