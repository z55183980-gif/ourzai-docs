# 文档站发布与回滚

代码仓库：[ourzai-docs](https://github.com/z55183980-gif/ourzai-docs)。
仓库根目录为 Docusaurus 项目根目录，产物输出到 `build/`。

| 项目                  | 配置                                                 |
| --------------------- | ---------------------------------------------------- |
| 规范域名              | https://docs.ourzai.com                              |
| Cloudflare Pages 项目 | `zaidrama-docs`                                      |
| 备用入口              | https://zaidrama-docs.pages.dev                      |
| 生产分支              | `main`                                               |
| 部署方式              | Direct Upload，GitHub Actions 构建并由 Wrangler 上传 |

仓库拆分继续使用现有 Pages 项目及其自定义域名，不修改 DNS、语言前缀、页面 slug 或重定向。
Pages 项目名与 GitHub 仓库名无须相同。

## 自动发布

`.github/workflows/docs.yml` 在 PR 上运行全部检查；推送或合并到 `main` 后运行同样的检查并发布。
也可以在 Actions 页面选择 Documentation，针对 `main` 手动运行。
生产发布按分支串行执行，外部 PR 不会获得部署凭据或运行发布步骤。

仓库 Actions Secrets 必须配置 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`。
Token 需具备目标账户的 Pages 部署权限。凭据不得写进仓库或日志。
Node.js 版本取 `.node-version`，升级时同步 workflow 容器版本；pnpm 版本取 `package.json`。
Wrangler 版本固定在 workflow 中，升级需经过评审。

## 手动发布

由受保护的凭据系统注入上述环境变量，在仓库根目录运行：

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm test
pnpm check
pnpm check-consistency
pnpm build
npx --yes wrangler@4.159.0 pages deploy build --project-name zaidrama-docs --branch main
```

正式发布前可用 `--branch migration-preview` 上传预览并检查部署 URL。
必须从对应提交重新构建，不上传来源不明或过期的 `build/`。

## 验证

确认 Pages 最新部署成功，逐一检查根路径、`/en/`、`/zh-HK/`、`/fr/`、`/vi/`、`/ja/`、`/es/`。
确认 `sitemap.xml` 的规范域名和所有页面路径、`ai-index.json`、`llms.txt`、`llms-full.txt`、页面 `.md` 仍可访问。
`static/_redirects` 保留旧链接重定向。站内搜索在生产构建中验证。

## 回滚

在 Cloudflare Pages 的 Deployments 中回滚到上一个成功的生产部署；
或者回退仓库的故障提交，经 PR 合并到 `main`，由 Actions 重新构建发布。
回滚无需修改 DNS、VPS 或数据库。完成后重新验证主域名及所有语言入口。
