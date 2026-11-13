import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";

import aiIndexPlugin from "../plugins/ai-index.mjs";

function write(root, relativePath, contents) {
  const path = join(root, relativePath);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents, "utf8");
}

function fixtureSite() {
  const siteDir = mkdtempSync(join(tmpdir(), "zai-ai-index-"));
  write(siteDir, "docs/index.mdx", "---\nid: index\nslug: /\ntitle: 文档中心\n---\n\n<div>首页</div>\n");
  write(siteDir, "docs/api/_category_.json", '{ "label": "API 接入" }');
  write(
    siteDir,
    "docs/api/quickstart.md",
    [
      "---",
      "id: quickstart",
      "title: 快速开始",
      "description: 三步接入",
      "sidebar_position: 1",
      "---",
      "",
      "# 快速开始 {#quickstart}",
      "",
      "导语段落。",
      "",
      "## 拿密钥 {#get-key}",
      "",
      "在控制台创建，见[错误](./errors.md#auth)。",
      "",
      "```bash",
      "# 这不是标题",
      "curl https://api.ourzai.com/v1/models",
      "```",
      "",
      "### 保管 {#keep-key}",
      "",
      "密钥只显示一次。",
      "",
    ].join("\n"),
  );
  write(
    siteDir,
    "docs/api/errors.md",
    "---\nid: errors\ntitle: 错误\n---\n\n# 错误 {#errors}\n\n## 鉴权 {#auth}\n\n401。\n",
  );
  return siteDir;
}

async function runBuild(siteDir, routesPaths) {
  const outDir = join(siteDir, "build");
  mkdirSync(outDir, { recursive: true });
  await aiIndexPlugin({ siteDir }).postBuild({
    outDir,
    baseUrl: "/",
    i18n: { currentLocale: "zh-Hans", defaultLocale: "zh-Hans" },
    localizationDir: join(siteDir, "i18n", "zh-Hans"),
    routesPaths,
    siteConfig: { url: "https://docs.example.com", title: "ignored" },
  });
  return outDir;
}

test("chunks carry product scope, heading path, and anchored absolute URLs", async () => {
  const siteDir = fixtureSite();
  const outDir = await runBuild(siteDir, ["/", "/api/quickstart", "/api/errors", "/search"]);
  const index = JSON.parse(readFileSync(join(outDir, "ai-index.json"), "utf8"));

  const keep = index.chunks.find((chunk) => chunk.url.endsWith("#keep-key"));
  assert.equal(keep.product, "api");
  assert.equal(keep.product_label, "API 接入");
  assert.deepEqual(keep.section_path, ["API 接入", "快速开始", "拿密钥", "保管"]);
  assert.equal(keep.url, "https://docs.example.com/api/quickstart#keep-key");

  const intro = index.chunks.find((chunk) => chunk.url === "https://docs.example.com/api/quickstart");
  assert.equal(intro.text, "导语段落。");

  const getKey = index.chunks.find((chunk) => chunk.url.endsWith("#get-key"));
  assert.match(getKey.text, /\]\(https:\/\/docs\.example\.com\/api\/errors#auth\)/);
  assert.match(getKey.text, /# 这不是标题/);
  assert.doesNotMatch(getKey.text, /\{#/);

  assert.ok(index.pages.some((page) => page.url === "https://docs.example.com/" && page.product === "platform"));
  assert.ok(!index.chunks.some((chunk) => chunk.url === "https://docs.example.com/"), ".mdx 首页不产段落");
});

test("download guide retains direct installer links and anchored chunks after MDX rendering", async () => {
  const siteDir = fixtureSite();
  write(
    siteDir,
    "docs/api/tools/key-tool.mdx",
    [
      "---",
      "id: key-tool",
      "title: Key Manager",
      "---",
      "",
      'import KeyToolDownload from "@site/src/components/KeyToolDownload";',
      "",
      "# Key Manager {#key-tool}",
      "",
      "## Download {#download}",
      "",
      '<KeyToolDownload keysLabel="Keys" previewLabel="App preview">',
      "",
      "[Windows](https://ourzai.com/downloads/key-manager/0.2.6/zAI-Key-Manager_Windows_x64-setup.exe)",
      "",
      "</KeyToolDownload>",
      "",
      "## Manual setup {#manual}",
      "",
      "Keep the existing guide.",
    ].join("\n"),
  );
  const outDir = await runBuild(siteDir, ["/", "/api/quickstart", "/api/errors", "/api/tools/key-tool"]);
  const markdown = readFileSync(join(outDir, "api/tools/key-tool.md"), "utf8");
  assert.match(markdown, /https:\/\/ourzai.com\/downloads\/key-manager\/0.2.6\//);
  assert.doesNotMatch(markdown, /KeyToolDownload|keysLabel|import /);
  const index = JSON.parse(readFileSync(join(outDir, "ai-index.json"), "utf8"));
  assert.ok(
    index.chunks.some(
      (chunk) => chunk.url.endsWith("/api/tools/key-tool#download") && chunk.text.includes("setup.exe"),
    ),
  );
});

test("writes llms.txt and per-page markdown", async () => {
  const siteDir = fixtureSite();
  const outDir = await runBuild(siteDir, ["/", "/api/quickstart", "/api/errors"]);
  const llms = readFileSync(join(outDir, "llms.txt"), "utf8");
  assert.match(llms, /^# ZAI 文档中心/);
  assert.match(llms, /- \[快速开始\]\(https:\/\/docs\.example\.com\/api\/quickstart\.md\): 三步接入/);
  assert.ok(existsSync(join(outDir, "api", "quickstart.md")));
  assert.ok(existsSync(join(outDir, "index.md")));
  assert.ok(existsSync(join(outDir, "llms-full.txt")));
});

test("fails the build when a derived route does not exist", async () => {
  const siteDir = fixtureSite();
  await assert.rejects(() => runBuild(siteDir, ["/", "/api/quickstart"]), /api\/errors/);
});

test("fails the build for an unregistered top-level directory", async () => {
  const siteDir = fixtureSite();
  write(siteDir, "docs/misc/page.md", "---\nid: page\ntitle: 杂项\n---\n\n# 杂项\n");
  await assert.rejects(
    () => runBuild(siteDir, ["/", "/api/quickstart", "/api/errors", "/misc/page"]),
    /PRODUCT_BY_DIR/,
  );
});
