# ZAI 文档中心

ZAI 平台、遇见 Zai、ZaiDrama 和开发者 API 的公共文档站。

[阅读文档](https://docs.ourzai.com/) · [English](README.en.md)

## 本地开发

Node.js 版本见 `.node-version`，pnpm 版本固定在 `package.json`。

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm start
```

提交前运行 `pnpm test`、`pnpm check`、`pnpm check-consistency` 和 `pnpm build`。
站内搜索需要构建后使用 `pnpm serve` 检查。

## 内容与发布

`docs/` 为简体中文源文档，`i18n/` 为其他六种语言；翻译流程见 [语言维护说明](i18n/README.md)。
页面职责与贡献要求见 [CONTRIBUTING.md](CONTRIBUTING.md)。
主分支通过全部检查后发布到现有 Cloudflare Pages 项目 `zaidrama-docs`，
规范域名保持 `docs.ourzai.com`，所有页面路径保持不变。部署与回滚见 [PUBLISHING.md](PUBLISHING.md)。

文档站从 `z55183980-gif/zaidrama` 的 `website/` 迁入，源提交为
`b1341cdff176073704fd79d63e3cbac5c8392e8b`。沿用原项目 [许可证](LICENSE)。
产品代码、运行配置和内部架构文档由各产品仓库维护。
