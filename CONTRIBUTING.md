# 文档站贡献指南

本仓维护平台公共文档。产品实现、ADR、内部运维和私有配置留在各产品仓库。
功能变化需要同时提交对应产品修改与文档修改，并在两个 PR 中互相引用；文档描述以已发布行为为准。

## 开发与检查

使用 `.node-version` 和 `package.json` 固定的 Node.js、pnpm 版本。

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm test
pnpm check
pnpm check-consistency
pnpm build
```

`pnpm format` 格式化工具与配置，不重排正文和翻译文件。
CI 检查脚本测试、类型、Lint、格式、页面库存、模型文档、译文完整性、锚点、UI 文案和全部语言构建。
翻译维护见 [i18n/README.md](i18n/README.md)。缺译或滞后报告保留真实状态，不为通过检查重新登记未审阅译文。

## 内容维护

### 各页职责

| 页面                                            | 应该包含                                                                     | 不应该包含                               |
| ----------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------- |
| `docs/index.mdx`                                | 文档站定位、平台各入口和导航概览                                             | 具体功能的完整操作步骤                   |
| `docs/platform/overview.md`                     | 平台提供什么、各入口地址、统一账号与积分、首页平台助手的能力边界             | 各产品的操作步骤                         |
| `docs/platform/account.md`                      | 注册登录、找回密码、账号安全、积分充值与奖励、退款、联系渠道                 | 具体金额、单价和活动数额                 |
| `docs/api/quickstart.md`                        | 拿密钥、base_url、第一个请求、流式、模型与用量入口                           | 具体模型名和价格                         |
| `docs/api/endpoints.md`                         | 对外接口清单、鉴权方式、视频异步流程                                         | 未对外承诺的实验接口、内部 `/zai/*` 接口 |
| `docs/api/errors.md`                            | 错误格式、常见状态码与处理、请求限制、计费规则、排查清单                     | 具体频率与并发数值                       |
| `docs/api/models.md`                            | 公开模型目录、协议矩阵与接入导航                                             | 实时可用性与价格副本                     |
| `docs/api/models/gpt-6-astra.md`                | gpt-6-astra 的接口、参数示例与完整调用                                       | 未验证的能力或参数上限                   |
| `docs/api/models/gpt-6-sol.md`                  | gpt-6-sol 的接口、参数示例与完整调用                                         | 未验证的能力或参数上限                   |
| `docs/api/models/gpt-5.6-sol.md`                | gpt-5.6-sol 的接口、参数示例与完整调用                                       | 未验证的能力或参数上限                   |
| `docs/api/models/claude-sonnet-5-5.md`          | claude-sonnet-5-5 的接口、参数示例与完整调用                                 | 未验证的能力或参数上限                   |
| `docs/api/models/claude-opus-5-5.md`            | claude-opus-5-5 的接口、参数示例与完整调用                                   | 未验证的能力或参数上限                   |
| `docs/api/models/gpt-image-2.md`                | gpt-image-2 的接口、参数示例与完整调用                                       | 未验证的能力或参数上限                   |
| `docs/api/models/gpt-image-2.5-flare.md`        | gpt-image-2.5-flare 的接口、参数示例与完整调用                               | 未验证的能力或参数上限                   |
| `docs/api/models/gpt-image-2.5-sunburst.md`     | gpt-image-2.5-sunburst 的接口、参数示例与完整调用                            | 未验证的能力或参数上限                   |
| `docs/api/models/grok-imagine-image.md`         | grok-imagine-image 的接口、参数示例与完整调用                                | 未验证的能力或参数上限                   |
| `docs/api/models/grok-imagine-image-2.0.md`     | grok-imagine-image-2.0 的接口、参数示例与完整调用                            | 未验证的能力或参数上限                   |
| `docs/api/models/grok-imagine-image-quality.md` | grok-imagine-image-quality 的接口、参数示例与完整调用                        | 未验证的能力或参数上限                   |
| `docs/api/models/grok-imagine-video.md`         | grok-imagine-video 的接口、参数示例与完整调用                                | 未验证的能力或参数上限                   |
| `docs/api/models/grok-imagine-video-1.5.md`     | grok-imagine-video-1.5 的接口、参数示例与完整调用                            | 未验证的能力或参数上限                   |
| `docs/api/models/minimax-h3.md`                 | minimax-h3 的接口、参数示例与完整调用                                        | 未验证的能力或参数上限                   |
| `docs/api/models/cosyvoice2-0.5b.md`            | cosyvoice2-0.5b 的接口、参数示例与完整调用                                   | 未验证的能力或参数上限                   |
| `docs/api/tools/tools.md`                       | 编程工具接入的通用三项设置、各工具所需接口与教程入口、其他 OpenAI 兼容客户端 | 单个工具的完整配置步骤                   |
| `docs/api/tools/claude-code.md`                 | Claude Code 命令行的环境变量与 settings.json 配置                            | 具体模型名、价格和未验证的工具能力       |
| `docs/api/tools/claude-desktop.md`              | Claude 桌面版第三方推理（Gateway）配置、模型选择与排查                       | 具体模型名、价格和未验证的工具能力       |
| `docs/api/tools/codex-cli.md`                   | Codex CLI 的 config.toml 服务商与密钥设置                                    | 具体模型名、价格和未验证的工具能力       |
| `docs/api/tools/codex-app.md`                   | Codex 桌面版的 config.toml 配置与让应用读到密钥的方法                        | 具体模型名、价格和未验证的工具能力       |
| `docs/api/tools/cursor.md`                      | Cursor 的密钥、Base URL 覆盖与模型添加步骤                                   | 具体模型名、价格和未验证的工具能力       |
| `docs/api/tools/cline.md`                       | Cline 的 OpenAI Compatible 服务商配置步骤                                    | 具体模型名、价格和未验证的工具能力       |
| `docs/api/tools/key-tool.md`                    | 密钥管理工具的用途、各系统安装包下载入口、手动配置教程入口                   | 未发布的安装包地址和未验证的工具能力     |
| `docs/api/faq.md`                               | 开发者 API 的可用地区、付款、计费方式、价格入口、与官方 API 的区别等短答     | 具体金额、单价与折扣数字，长篇教程       |
| `docs/zai/getting-started.md`                   | 遇见 Zai 的入口、首次聊天、账号与权益概览，以及各产品中 Zai 的用途           | 完整设置教程与 API 接入步骤              |
| `docs/zai/chat-and-voice.md`                    | 文字、语音消息、语音回复、实时通话的操作与权限排查                           | 具体语音模型和额度数字                   |
| `docs/zai/appearance-and-relationship.md`       | 形象、音色、名字、相处关系的设置与保留范围                                   | 内部人格实现与未上线能力                 |
| `docs/zai/memory-and-data.md`                   | 查看、修正、删除和暂停记忆，导出、导入与重新开始的范围                       | 内部记忆架构与逐句记忆承诺               |
| `docs/zai/plans-and-usage.md`                   | 免费版与会员入口、语音额度、加量包、有效期及平台余额区别                     | 具体价格与固定额度承诺                   |
| `docs/zai/faq.md`                               | 陪伴产品登录、声音、额度、记忆和支持的常见问题                               | 长篇教程                                 |
| `docs/zaidrama/getting-started.md`              | 从账号、对话到第一条成片的 ZaiDrama 完整操作路径                             | 平台内部部署、反向代理和备份策略         |
| `docs/zaidrama/workflows.md`                    | 三层方案、片段类型与视频生成方式、批次与集、产物状态、自动校验与返修、确认点 | 供应商密钥和运维命令                     |
| `docs/zaidrama/canvas.md`                       | 创意画布的定位、节点与生成、画布 Zai 与生成确认、历史版本与分享              | 项目生产流程和模型清单                   |
| `docs/zaidrama/models.md`                       | ZaiDrama 内的模型用途、用户可选入口、能力类别、管理员配置层级                | 容易过期的价格承诺和具体模型矩阵         |
| `docs/zaidrama/faq.md`                          | ZaiDrama 高频问题和短答案                                                    | 长篇教程                                 |

### 写作约定

- 每个页面通过 frontmatter 的 `update_docs` 声明维护归属；增删页面时同步上面的职责表。
- 每个 Markdown 标题保留显式 `{#english-id}`，所有语言共用锚点、页面 ID 和 slug。
- 站内链接使用相对文件路径；外部文档链接使用目标语言路径。
- `.md` 使用 CommonMark；需要 JSX 的页面使用 `.mdx`。
- API 模型目录以 `public-models.json` 为发布清单；与实际 API 目录和官网模型链接同步核对，使用 `pnpm check:models`。
- 平台助手消费构建产生的 `ai-index.json`、`llms.txt` 和页面 Markdown，修改格式时同步消费方。
- 保持 `https://docs.ourzai.com`、`baseUrl: /`、既有语言前缀与页面路径。改路径须提供重定向。

## 提交流程

从 `main` 创建短分支，经 Pull Request 检查后 squash 合并；提交标题使用 Conventional Commits。
发布流程见 [PUBLISHING.md](PUBLISHING.md)。主观视觉验收由维护者完成，自动化检查覆盖结构、链接和构建。
