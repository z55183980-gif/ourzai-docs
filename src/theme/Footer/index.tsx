import { memo, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useThemeConfig } from "@docusaurus/theme-common";

// 「联系我们」去官网统一的联系页（人工客服、WhatsApp、邮件都在那里），不在文档站另做一套。
// 官网用 ?lang= 选语言，代码与文档站一致，只有简体中文叫 zh。
const CONTACT_URL = "https://ourzai.com/contact";
const contactLanguage = (locale: string) => (locale === "zh-Hans" ? "zh" : locale);

function Footer(): ReactNode {
  const logoSrc = useBaseUrl("img/zai-logo.png");
  const copyright = useThemeConfig().footer?.copyright;
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const contactHref = `${CONTACT_URL}?lang=${contactLanguage(currentLocale)}`;

  const navigationLabel = translate({
    id: "theme.docsFooter.navigation",
    message: "页脚导航",
    description: "The ARIA label for the documentation footer navigation",
  });
  const productLabel = translate({
    id: "theme.docsFooter.product",
    message: "平台、API 与 ZaiDrama 文档",
    description: "The product descriptor shown below the footer logo",
  });
  const docsLabel = translate({
    id: "theme.docsFooter.docs",
    message: "文档中心",
    description: "The footer link label for the documentation home",
  });
  const contactLabel = translate({
    id: "theme.docsFooter.contact",
    message: "联系我们",
    description: "The footer link label for contacting the team",
  });
  const consoleLabel = translate({
    id: "theme.docsFooter.console",
    message: "开发者控制台",
    description: "The footer link label for opening the developer console",
  });
  const studioLabel = translate({
    id: "theme.docsFooter.studio",
    message: "ZaiDrama",
    description: "The footer link label for opening the ZaiDrama creation app",
  });
  const legalLabel = translate({
    id: "theme.docsFooter.legal",
    message: "一个账号，接上 AI 模型与短剧创作。",
    description: "The brand line shown at the right side of the footer",
  });
  const brandLinkLabel = translate({
    id: "theme.docsFooter.brandLink",
    message: "访问 ZAI 官网",
    description: "The ARIA label for the documentation footer brand link",
  });

  return (
    <footer className="docsBrandFooter">
      <div className="docsBrandFooterInner">
        <div className="docsBrandFooterBrand">
          <a className="docsBrandFooterLogo" href="https://ourzai.com/" aria-label={brandLinkLabel}>
            <img src={logoSrc} alt="ZAI" />
          </a>
          <p>{productLabel}</p>
        </div>

        <nav className="docsBrandFooterLinks" aria-label={navigationLabel}>
          <Link to="/">{docsLabel}</Link>
          <a href={contactHref} target="_blank" rel="noreferrer">
            {contactLabel}
          </a>
          <a href="https://ourzai.com/console">{consoleLabel}</a>
          <a href="https://zaidrama.com">{studioLabel}</a>
        </nav>

        <div className="docsBrandFooterLegal">
          <p>{legalLabel}</p>
          {copyright && <p>{copyright}</p>}
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
