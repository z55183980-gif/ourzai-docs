---
id: claude-code
title: 在 Claude Code 中使用
sidebar_label: Claude Code
description: 用环境变量或 settings.json 让 Claude Code 命令行通过 Anthropic Messages 接口调用 ZAI API。
sidebar_position: 1
update_docs: none
---

# 在 Claude Code 中使用 {#claude-code}

Claude Code 通过 Anthropic Messages 接口调用模型，只能选开放 `messages` 的模型，在[模型目录与接入](../models.md)里查看。本页适用于命令行版 Claude Code；在 Claude 桌面应用里使用 Code，见 [Claude 桌面版](./claude-desktop.md)。

:::tip 不想手动配置？
ZAI 提供桌面端的[密钥管理工具](./key-tool.md)，用来集中管理 API 密钥并配置接入。[前往下载](./key-tool.md#download)
:::

## 用环境变量临时接入 {#env}

在启动 Claude Code 的终端里设置环境变量：

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<你的 API 密钥>"
export ANTHROPIC_MODEL="<开放 messages 的模型 ID>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<同一个模型 ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<同一个模型 ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<同一个模型 ID>"
claude
```

Windows PowerShell 用 `$env:名称 = "值"` 的写法设置同样的变量。这些变量只在当前终端里生效。

## 写入配置文件长期生效 {#settings}

不想每次都设置环境变量时，把同样的变量写进 `~/.claude/settings.json` 的 `env` 字段（Windows 为 `%USERPROFILE%\.claude\settings.json`），之后直接运行 `claude` 即可：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.ourzai.com",
    "ANTHROPIC_AUTH_TOKEN": "<你的 API 密钥>",
    "ANTHROPIC_MODEL": "<开放 messages 的模型 ID>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<同一个模型 ID>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<同一个模型 ID>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<同一个模型 ID>"
  }
}
```

这个文件以明文保存密钥，不要提交到代码仓库或分享给他人。

## 注意事项 {#notes}

- `ANTHROPIC_BASE_URL` 不带 `/v1`：Claude Code 会自己拼接 `/v1/messages`。
- Claude Code 的后台任务和子代理默认会用其他型号。把三个 `ANTHROPIC_DEFAULT_*_MODEL` 都指向平台上开放 `messages` 的模型，避免请求平台没有的型号而返回 404。
- 可以在 Claude Code 里输入 `/status` 查看当前使用的接口地址和模型。

接入后如果请求失败，按[错误、限制与用量](../errors.md)里的状态码排查。
