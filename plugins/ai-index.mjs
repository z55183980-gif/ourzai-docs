// 给 AI 读的文档派生物：构建时从同一份文档源生成，不另写一份。
//
// 每个 locale 构建完成后在该 locale 的输出目录写：
//   - llms.txt        目录（llmstxt.org 约定）：站点简介 + 各页标题、说明和 .md 链接
//   - llms-full.txt   全部页面的正文合集
//   - <路由>.md       每页一份去掉锚点语法、链接改成绝对地址的 Markdown
//   - ai-index.json   按 ##/### 切好的段落，每段带产品范围、标题路径和精确到锚点的 URL
//
// ai-index.json 是 zai 平台助手 docs_search 的检索源（zai 仓 backend/tool_runtime/docs_handlers.py）。
// 检索按段落取证，段落脱离原页后读不出「这说的是 API 还是 ZaiDrama」，所以产品范围与标题路径
// 必须随段落一起下发，而不是指望模型从页面标题猜。字段改动要同步 zai 侧的解析与测试。
//
// URL 由文件路径与 frontmatter 推出，并逐条对照本次构建的 routesPaths 校验；
// 对不上直接让构建失败——索引里出现死链比没有索引更糟。

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative, resolve, sep } from "node:path";

export const AI_INDEX_VERSION = 1;

/** 顶层目录 → 产品范围。根目录的首页归平台。新增顶层目录必须在这里登记，否则构建失败。 */
const PRODUCT_BY_DIR = {
  "": "platform",
  platform: "platform",
  api: "api",
  zai: "zai",
  zaidrama: "zaidrama",
};

const SITE_TITLE = { "zh-Hans": "ZAI 文档中心", en: "ZAI Documentation" };

const SITE_SUMMARY = {
  "zh-Hans":
    "ZAI 平台文档：平台账号与余额、遇见 Zai AI 陪伴（zai.gg）、ZaiDrama 创作与开发者 API 接入（api.ourzai.com）指南。",
  en: "ZAI platform documentation: accounts and balance, Meet Zai AI companionship (zai.gg), ZaiDrama creation, and developer API access (api.ourzai.com).",
};

const ANCHOR_RE = /\s*\{#[a-z0-9-]+\}\s*$/;
const FENCE_RE = /^\s*(```|~~~)/;

function toPosix(path) {
  return path.split(sep).join("/");
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    return /\.mdx?$/.test(entry.name) ? [path] : [];
  });
}

function parseFrontMatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (!pair) continue;
    let value = pair[2].trim();
    if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1);
    data[pair[1]] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function readJson(path) {
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
}

/** 顶层分类在当前 locale 下的显示名：中文取 _category_.json，其他语言取翻译 JSON。 */
function categoryLabel(docsRoot, sourceRoot, localizationDir, topDir) {
  const zh = readJson(join(docsRoot, topDir, "_category_.json"))?.label;
  if (!zh) return topDir;
  if (sourceRoot === docsRoot) return zh;
  const messages = readJson(join(localizationDir, "docusaurus-plugin-content-docs", "current.json")) ?? {};
  return messages[`sidebar.docsSidebar.category.${zh}`]?.message ?? zh;
}

function docRoute(baseUrl, relPath, frontMatter) {
  if (frontMatter.slug) {
    const slug = frontMatter.slug === "/" ? "" : frontMatter.slug.replace(/^\//, "");
    return `${baseUrl}${slug}`;
  }
  const dir = posix.dirname(relPath);
  const id = frontMatter.id || posix.basename(relPath).replace(/\.mdx?$/, "");
  return `${baseUrl}${dir === "." ? "" : `${dir}/`}${id}`;
}

/** 站内相对 .md 链接改成绝对 URL（保留 #锚点），段落离开原页后链接仍然可用。 */
function absolutizeLinks(text, relPath, routeBySource, origin) {
  return text.replace(/\]\((\.{1,2}\/[^)\s#]+\.mdx?)(#[^)\s]*)?\)/g, (whole, target, hash = "") => {
    const resolved = posix.normalize(posix.join(posix.dirname(relPath), target));
    const route = routeBySource.get(resolved);
    return route ? `](${origin}${route}${hash})` : whole;
  });
}

function cleanMarkdown(body) {
  return body
    .split(/\r?\n/)
    .map((line) => (/^#{1,6}\s/.test(line) ? line.replace(ANCHOR_RE, "") : line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * 按 ## / ### 切段。首个 ## 之前的导语自成一段（无锚点）。
 * 代码块里的 # 不当标题。#### 及更深的小标题留在所属段落里。
 */
function splitSections(body) {
  const sections = [];
  let current = { level: 1, heading: "", anchor: "", lines: [] };
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (FENCE_RE.test(line)) inFence = !inFence;
    const heading = !inFence && /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      sections.push(current);
      const anchor = /\{#([a-z0-9-]+)\}\s*$/.exec(heading[2])?.[1] ?? "";
      current = { level: heading[1].length, heading: heading[2].replace(ANCHOR_RE, "").trim(), anchor, lines: [] };
      continue;
    }
    current.lines.push(line);
  }
  sections.push(current);
  return sections;
}

function buildChunks(page, body) {
  const chunks = [];
  let h2 = "";
  for (const section of splitSections(body)) {
    // level 1：页面标题之后、第一个 ## 之前的导语，归到页面本身（无锚点）
    if (section.level === 2) h2 = section.heading;
    const text = cleanMarkdown(section.lines.join("\n"));
    if (!text) continue;
    const path = [page.productLabel, page.title];
    if (section.level === 2) path.push(section.heading);
    if (section.level === 3) path.push(...(h2 ? [h2] : []), section.heading);
    const anchor = section.level === 1 ? "" : section.anchor;
    chunks.push({
      id: anchor ? `${page.url}#${anchor}` : page.url,
      url: anchor ? `${page.url}#${anchor}` : page.url,
      product: page.product,
      product_label: page.productLabel,
      page_title: page.title,
      section_path: path,
      text,
    });
  }
  return chunks;
}

export default function aiIndexPlugin(context) {
  const { siteDir } = context;
  const docsRoot = resolve(siteDir, "docs");

  return {
    name: "zai-ai-index",

    async postBuild({ outDir, baseUrl, i18n, localizationDir, routesPaths, siteConfig }) {
      const locale = i18n.currentLocale;
      const sourceRoot =
        locale === i18n.defaultLocale
          ? docsRoot
          : resolve(localizationDir, "docusaurus-plugin-content-docs", "current");
      const origin = siteConfig.url.replace(/\/$/, "");
      const knownRoutes = new Set(routesPaths.map((route) => route.replace(/\/$/, "") || "/"));

      const sources = walk(sourceRoot).map((path) => {
        const relPath = toPosix(relative(sourceRoot, path));
        const { data, body } = parseFrontMatter(readFileSync(path, "utf8"));
        return { relPath, data, body, route: docRoute(baseUrl, relPath, data) };
      });
      const routeBySource = new Map(sources.map((source) => [source.relPath, source.route]));

      const pages = [];
      const chunks = [];
      for (const source of sources) {
        const normalizedRoute = source.route.replace(/\/$/, "") || "/";
        if (!knownRoutes.has(normalizedRoute)) {
          throw new Error(`[ai-index] ${source.relPath} 推出的路由 ${source.route} 不在本次构建的路由里`);
        }
        const topDir = source.relPath.includes("/") ? source.relPath.split("/")[0] : "";
        const product = PRODUCT_BY_DIR[topDir];
        if (!product) {
          throw new Error(`[ai-index] 顶层目录「${topDir}」未在 PRODUCT_BY_DIR 登记产品范围`);
        }
        const productLabel = categoryLabel(docsRoot, sourceRoot, localizationDir, topDir || "platform");
        const title = source.data.title || source.relPath;
        const url = `${origin}${source.route}`;
        const isMdx = source.relPath.endsWith(".mdx");
        // .mdx 页（首页）是 JSX 版面，不产正文段落；它在目录里出现，内容由各页承担
        const body = isMdx ? "" : absolutizeLinks(source.body, source.relPath, routeBySource, origin);
        const markdownPath = source.route === baseUrl ? `${baseUrl}index.md` : `${source.route}.md`;
        const page = {
          url,
          markdown_url: `${origin}${markdownPath}`,
          title,
          description: source.data.description || "",
          product,
          product_label: productLabel,
          order: Number(source.data.sidebar_position ?? 99),
          topDir,
        };
        pages.push(page);

        const cleaned = isMdx
          ? `# ${title}\n\n${page.description}`.trim()
          : cleanMarkdown(body).replace(/^(?!# )/, `# ${title}\n\n`);
        const header = `<!-- ${productLabel} · ${url} -->`;
        const target = join(outDir, markdownPath.slice(baseUrl.length));
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, `${header}\n${cleaned}\n`, "utf8");
        page.fullText = `${header}\n${cleaned}`;

        if (!isMdx) chunks.push(...buildChunks({ ...page, productLabel }, body));
      }

      const dirOrder = Object.keys(PRODUCT_BY_DIR);
      pages.sort(
        (a, b) =>
          dirOrder.indexOf(a.topDir) - dirOrder.indexOf(b.topDir) || a.order - b.order || a.url.localeCompare(b.url),
      );

      const messages = readJson(join(localizationDir, "code.json")) ?? {};
      const summary = messages["site.tagline"]?.message ?? SITE_SUMMARY[locale] ?? SITE_SUMMARY.en;
      const siteTitle = messages["site.title"]?.message ?? SITE_TITLE[locale] ?? SITE_TITLE.en;
      const groups = new Map();
      for (const page of pages) {
        if (!groups.has(page.product_label)) groups.set(page.product_label, []);
        groups.get(page.product_label).push(page);
      }
      const llms = [
        `# ${siteTitle}`,
        "",
        `> ${summary}`,
        "",
        `Markdown: ${origin}${baseUrl}llms-full.txt · JSON: ${origin}${baseUrl}ai-index.json`,
        "",
        ...[...groups].flatMap(([label, group]) => [
          `## ${label}`,
          "",
          ...group.map(
            (page) => `- [${page.title}](${page.markdown_url})${page.description ? `: ${page.description}` : ""}`,
          ),
          "",
        ]),
      ].join("\n");
      writeFileSync(join(outDir, "llms.txt"), `${llms.trim()}\n`, "utf8");
      writeFileSync(
        join(outDir, "llms-full.txt"),
        `# ${siteTitle}\n\n> ${summary}\n\n${pages.map((page) => page.fullText).join("\n\n---\n\n")}\n`,
        "utf8",
      );

      const index = {
        version: AI_INDEX_VERSION,
        site: origin,
        locale,
        generated_at: new Date().toISOString(),
        pages: pages.map(({ fullText: _fullText, topDir: _topDir, order: _order, ...page }) => page),
        chunks,
      };
      writeFileSync(join(outDir, "ai-index.json"), `${JSON.stringify(index, null, 2)}\n`, "utf8");
    },
  };
}
