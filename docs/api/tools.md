---
id: tools
title: 在编程工具中使用
sidebar_label: 编程工具接入
description: 在 Cline、Cursor、Codex CLI、Claude Code 等编程工具里配置 ZAI API 的 base_url、密钥和模型。
sidebar_position: 5
update_docs: none
---

# 在编程工具中使用 {#tools}

支持自定义 OpenAI 兼容接口的编程工具和客户端，都可以接入 ZAI API。各工具需要的是同样三项设置：

| 设置 | 填写 |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` |
| API Key | 在[开发者控制台](https://ourzai.com/console)「API 密钥」里新建的密钥 |
| 模型 | [模型目录](./models.md)中的模型 ID，原样填写 |

工具界面会随版本变化，下面写的是各工具里的配置项名称；找不到时按上表三项对应填写。编程工具完成一次任务可能连续发出很多请求，每次都按用量从余额扣费，建议给这把密钥设置总额度，见[拿密钥](./quickstart.md#get-key)。

:::tip 先确认模型开放的接口
对话模型都支持 `chat.completions`；只有部分模型开放 `responses` 或 Anthropic `messages` 接口。Codex 需要 `responses`，Claude Code 需要 `messages`，选型前先在[模型目录与接入](./models.md)里查看每个模型开放的接口。
:::

## Cline {#cline}

1. 打开 Cline 的设置，「API Provider」选 **OpenAI Compatible**。
2. 「Base URL」填 `https://api.ourzai.com/v1`。
3. 「API Key」填你的密钥。
4. 「Model ID」填一个支持 `chat.completions` 的对话模型 ID。

## Cursor {#cursor}

1. 打开 Cursor Settings → Models。
2. 在 API Keys 中填入 OpenAI API Key，开启 **Override OpenAI Base URL**，填 `https://api.ourzai.com/v1`。
3. 在模型列表中添加要用的模型 ID 并启用。

自定义密钥只用于你在对话和 Agent 中选择的这些模型；Tab 补全等 Cursor 自带功能仍由 Cursor 自己的服务提供。

## Codex CLI {#codex}

Codex 通过 Responses 接口调用模型，要选开放 `responses` 的模型。在 `~/.codex/config.toml` 中添加：

```toml
model = "<开放 responses 的模型 ID>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

再在启动 Codex 的终端里设置密钥：

```bash
export ZAI_API_KEY="<你的 API 密钥>"
```

Windows PowerShell 写作 `$env:ZAI_API_KEY = "<你的 API 密钥>"`。

## Claude Code {#claude-code}

Claude Code 通过 Anthropic Messages 接口调用模型，只能选开放 `messages` 的模型。启动前设置环境变量：

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<你的 API 密钥>"
export ANTHROPIC_MODEL="<开放 messages 的模型 ID>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<同一个模型 ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<同一个模型 ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<同一个模型 ID>"
claude
```

- `ANTHROPIC_BASE_URL` 不带 `/v1`：Claude Code 会自己拼接 `/v1/messages`。
- Claude Code 的后台任务和子代理默认会用其他型号。把三个 `ANTHROPIC_DEFAULT_*_MODEL` 都指向平台上开放 `messages` 的模型，避免请求平台没有的型号而返回 404。
- Windows PowerShell 用 `$env:名称 = "值"` 的写法设置同样的变量。

## 其他 OpenAI 兼容客户端 {#other-clients}

Chatbox、Cherry Studio、LobeChat、Open WebUI、Dify、n8n 等应用，在「OpenAI 兼容」或「自定义 OpenAI」类型的服务商里按开头的三项设置填写即可。读取 OpenAI 标准环境变量的工具，见[用环境变量](./quickstart.md#env)。

接入后如果请求失败，按[错误、限制与用量](./errors.md)里的状态码排查：401 多半是密钥填错，404 多半是模型 ID 写错或模型不支持该接口。
