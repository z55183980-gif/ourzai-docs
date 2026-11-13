---
id: claude-desktop
title: 在 Claude 桌面版中使用
sidebar_label: Claude 桌面版
description: 通过 Claude 桌面应用的第三方推理配置，让 Chat、Cowork 和 Code 使用 ZAI API。
sidebar_position: 2
update_docs: none
---

# 在 Claude 桌面版中使用 {#claude-desktop}

Claude 桌面应用（macOS、Windows）可以通过「第三方推理」配置改用 ZAI API。配置后，应用里的 Chat、Cowork 和 Code 都通过 Anthropic Messages 接口请求 ZAI API，并按用量从余额扣费，因此只能选开放 `messages` 的模型，在[模型目录与接入](../models.md)里查看。

:::tip 不想手动配置？
ZAI 提供桌面端的[密钥管理工具](./key-tool.mdx)，用来集中管理 API 密钥并配置接入。[前往下载](./key-tool.mdx#download)
:::

:::note 环境变量对桌面版无效
桌面版 Code 的本地会话会使用应用自己设置的接口地址，在终端、系统环境变量或 `~/.claude/settings.json` 里设置的 `ANTHROPIC_BASE_URL` 都不会生效。请按本页步骤在应用内配置。只用命令行版时，见 [Claude Code](./claude-code.md)。
:::

## 打开配置窗口 {#open}

1. 把 Claude 桌面应用更新到最新版本。
2. 打开开发者模式：macOS 在菜单栏，Windows 在登录界面左上角的应用菜单（☰）中，选择 **Help → Troubleshooting → Enable Developer Mode**。
3. 选择 **Developer → Configure Third-Party Inference…**，打开配置窗口。

看不到 **Developer** 菜单时，重新执行第 2 步；仍然没有，说明应用版本还不支持第三方推理，先更新应用。

## 填写连接信息 {#connection}

在配置窗口的 **Connection** 部分，把 **Inference provider** 选为 **Gateway**，再按下表填写：

| 配置项 | 填写 |
| --- | --- |
| Gateway base URL | `https://api.ourzai.com`（不带 `/v1`） |
| Gateway API key | 你的 API 密钥 |
| Credential kind | **Static API key** |
| Gateway auth scheme | **Bearer** |

应用会在 Base URL 后面自己拼接 `/v1/messages` 和 `/v1/models`，所以这里不要加 `/v1`。

填好后可以点击 **Test connection** 测试连接，再继续下面的步骤。

![Claude 桌面版第三方推理配置窗口：Connection 部分已选 Gateway 并填好 ZAI API 的连接信息](/img/tools/claude-desktop-gateway-light.png#light-only)
![Claude 桌面版第三方推理配置窗口：Connection 部分已选 Gateway 并填好 ZAI API 的连接信息](/img/tools/claude-desktop-gateway-dark.png#dark-only)

## 选择模型 {#models}

应用默认请求 `GET /v1/models` 自动发现模型，只把能识别为 Claude 型号的模型 ID 放进模型选择器。选择器里没有你要的模型时，在配置窗口的模型列表中手动添加开放 `messages` 的模型 ID，原样填写。

## 应用配置 {#apply}

点击 **Apply Changes**，应用会把配置写到本机并重新启动。启动后在 Chat、Cowork 或 Code 中发一条消息，确认能正常回复。之后修改配置，同样需要应用并重启后才生效。

再次修改时，如果 **Developer** 菜单不见了，按[打开配置窗口](#open)第 2 步重新开启开发者模式。

## 常见问题 {#faq}

- **模型选择器为空**：检查密钥是否正确，或按[选择模型](#models)手动添加模型 ID。
- **401**：Gateway API key 填错，或 Gateway auth scheme 不是 **Bearer**。
- **404 或「模型不可用」**：模型 ID 写错，或该模型没有开放 `messages` 接口。

其他状态码按[错误、限制与用量](../errors.md)排查。
