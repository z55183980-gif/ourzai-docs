import { translate } from "@docusaurus/Translate";

export function getSiteTitle(): string {
  return translate({
    id: "site.title",
    message: "ZAI 文档中心",
    description: "The documentation site title used in browser tabs and social cards",
  });
}

export function getSiteTagline(): string {
  return translate({
    id: "site.tagline",
    message: "ZAI 平台、遇见 Zai、ZaiDrama 与开发者 API 使用文档",
    description: "The documentation site description used in social cards",
  });
}
