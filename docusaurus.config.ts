import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import locales from "./locales.json";

const config: Config = {
  title: "ZAI 文档中心",
  tagline: "ZAI 平台、遇见 Zai、ZaiDrama 与开发者 API 使用文档",
  favicon: "img/docs-mark.svg",

  url: "https://docs.ourzai.com",
  baseUrl: "/",

  organizationName: "ZAI",
  projectName: "ZAI Docs",

  headTags: [
    {
      tagName: "script",
      attributes: { id: "zaidrama-theme-bootstrap" },
      innerHTML: `try {
  const theme = localStorage.getItem("zaidrama-color-theme");
  localStorage.setItem("theme", theme === "dark" ? "dark" : "light");
} catch {}`,
    },
  ],

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",

  markdown: {
    async parseFrontMatter({ defaultParseFrontMatter, ...params }) {
      const parsed = await defaultParseFrontMatter(params);
      // Editorial ownership belongs to repository tooling, not published page metadata.
      delete parsed.frontMatter.update_docs;
      return parsed;
    },
    // .md 按 CommonMark 解析，只有 .mdx 走 MDX：文档正文里的 `<1.0.0`、`<域名>` 等
    // 尖括号片段在 MDX 下会被当成 JSX 而编译失败，且 CONTRIBUTING.md 还要在 GitHub 上原样可读
    format: "detect",
    // 配合 @docusaurus/theme-mermaid，把 ```mermaid 围栏渲染成图
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  i18n: {
    defaultLocale: "zh-Hans",
    locales: Object.keys(locales),
    localeConfigs: Object.fromEntries(
      Object.entries(locales).map(([locale, { label, htmlLang }]) => [locale, { label, htmlLang }]),
    ),
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // docs-only 模式：文档直接挂在站点根，因此 src/pages/index.* 不能存在（路由冲突）
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  // 构建后为每个 locale 生成 llms.txt / llms-full.txt / 每页 .md / ai-index.json，
  // ai-index.json 是 zai 平台助手 docs_search 的检索源，见 plugins/ai-index.mjs 顶部说明
  plugins: ["./plugins/ai-index.mjs"],

  themes: [
    "@docusaurus/theme-mermaid",
    [
      "./plugins/localized-search.mjs",
      {
        indexBlog: false,
        // docs-only 模式下须与 docs 的 routeBasePath 一致，否则索引为空
        docsRouteBasePath: "/",
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        // Keep the keyboard shortcut active without showing its hint inside the search field.
        searchBarShortcutHint: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "文档",
      logo: {
        alt: "ZAI",
        src: "img/zai-logo.png",
        href: "https://ourzai.com/",
      },
      items: [
        {
          type: "search",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "资源",
          items: [{ label: "ZAI 官网", href: "https://ourzai.com" }],
        },
      ],
      // 企业主体（香港商业登记证上的英文名，各语言都不翻译）；页脚（src/theme/Footer）读这一条显示。
      copyright: `© ${new Date().getFullYear()} IM MASTER INC. LIMITED`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
