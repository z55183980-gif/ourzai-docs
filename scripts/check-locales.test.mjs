import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { checkLocales, uiFiles } from "./check-locales.mjs";

function write(root, path, text) {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), text);
}

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "docs-locales-"));
  write(
    root,
    "locales.json",
    JSON.stringify({
      "zh-Hans": { source: null },
      en: { source: "zh-Hans" },
      "zh-HK": { source: "zh-Hans" },
      fr: { source: "en" },
    }),
  );
  for (const [locale, title] of [
    ["zh-Hans", "中文"],
    ["en", "English"],
    ["zh-HK", "繁體"],
    ["fr", "Français"],
  ]) {
    const prefix = locale === "zh-Hans" ? "docs" : `i18n/${locale}/docusaurus-plugin-content-docs/current`;
    write(
      root,
      `${prefix}/start.md`,
      `---\nid: start\ntitle: ${title}\n---\n# ${title} {#start}\n\n[Link](./start.md)\n\n\`\`\`sh\necho ok\n\`\`\`\n`,
    );
    for (const file of uiFiles)
      write(root, `i18n/${locale}/${file}`, JSON.stringify({ key: { message: `${title} {count}` } }));
  }
  return root;
}

test("tracks Chinese and English source changes independently", () => {
  const root = fixture();
  assert.deepEqual(checkLocales(root, { record: true }), { problems: [], stale: [] });
  const file = "i18n/en/docusaurus-plugin-content-docs/current/start.md";
  write(root, file, readFileSync(join(root, file), "utf8") + "Updated English.\n");
  assert.deepEqual(checkLocales(root).stale, ["i18n/fr/docusaurus-plugin-content-docs/current/start.md"]);
});

test("rejects missing pages, changed examples, anchors, links, and UI placeholders", () => {
  const root = fixture();
  const file = "i18n/fr/docusaurus-plugin-content-docs/current/start.md";
  write(
    root,
    file,
    readFileSync(join(root, file), "utf8")
      .replace("#start", "#other")
      .replace("echo ok", "echo changed")
      .replace("./start.md", "./missing.md"),
  );
  write(root, "i18n/fr/code.json", JSON.stringify({ key: { message: "Sans paramètre" } }));
  write(root, "docs/extra.md", "---\nid: extra\n---\n# Extra {#extra}\n");
  const { problems } = checkLocales(root, { record: true });
  for (const fragment of [
    "missing source or translation",
    "heading anchors differ",
    "executable examples differ",
    "link destinations differ",
    "placeholders differ",
  ])
    assert.ok(
      problems.some((p) => p.includes(fragment)),
      fragment,
    );
});
