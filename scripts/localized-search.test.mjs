import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import localizedSearch, { validateOptions } from "../plugins/localized-search.mjs";

const require = createRequire(import.meta.url);
const searchRequire = createRequire(require.resolve("@easyops-cn/docusaurus-search-local"));

test("successive locale builds use matching client and server search pipelines", () => {
  const siteDir = mkdtempSync(join(tmpdir(), "zai-search-"));
  const options = validateOptions({
    options: { docsRouteBasePath: "/", indexBlog: false },
    validate: (schema, value) => {
      const result = schema.validate(value);
      if (result.error) throw result.error;
      return result.value;
    },
  });
  try {
    for (const [locale, language, text, query] of [
      ["zh-Hans", ["en", "zh"], "记忆管理", "记忆"],
      ["zh-Hans", ["en", "zh"], "API 快速开始", "api"],
      ["fr", "fr", "Mémoire et données", "données"],
      ["vi", "vi", "Quản lý ký ức", "ức"],
      ["ja", "ja", "メモリーを管理する", "メモリー"],
      ["es", "es", "Memoria y datos", "datos"],
      ["en", "en", "Managing memories", "memories"],
    ]) {
      const languages = [language].flat();
      localizedSearch(
        { siteDir, generatedFilesDir: siteDir, siteConfig: { themeConfig: {} }, i18n: { currentLocale: locale } },
        options,
      );
      const constants = readFileSync(
        join(siteDir, "@easyops-cn/docusaurus-search-local/default/generated-constants.js"),
        "utf8",
      );
      assert.ok(constants.includes(`export const language = ${JSON.stringify(languages)}`));
      if (languages.includes("vi")) assert.ok(constants.includes("lunr-vi.cjs"));
      const { buildIndex } = searchRequire("./utils/buildIndex");
      const [{ index }] = buildIndex([[{ i: 1, t: text }]], {
        ...options,
        language: languages,
        removeDefaultStopWordFilter: [],
      });
      const lunr = searchRequire("lunr");
      const loaded = lunr.Index.load(JSON.parse(JSON.stringify(index)));
      assert.equal(loaded.search(query)[0]?.ref, "1", `${locale}: ${query}`);
    }
  } finally {
    rmSync(siteDir, { recursive: true, force: true });
  }
});
