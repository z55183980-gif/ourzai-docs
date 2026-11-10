---
id: tools
title: 在編程工具中使用
sidebar_label: 編程工具接入
description: 在 Cline、Cursor、Codex CLI、Claude Code 等編程工具裡設定 ZAI API 的 base_url、密鑰和模型。
sidebar_position: 5
update_docs: none
---

# 在編程工具中使用 {#tools}

支援自訂 OpenAI 兼容接口的編程工具和用戶端，都可以接入 ZAI API。各工具需要的是同樣三項設定：

| 設定 | 填寫 |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` |
| API Key | 在[開發者控制台](https://ourzai.com/console)「API 密鑰」裡新建的密鑰 |
| 模型 | [模型目錄](./models.md)中的模型 ID，原樣填寫 |

工具介面會隨版本變化，下面寫的是各工具裡的設定項名稱；找不到時按上表三項對應填寫。編程工具完成一次任務可能連續發出很多請求，每次都按用量從餘額扣費，建議為這把密鑰設定總額度，見[取得密鑰](./quickstart.md#get-key)。

:::tip 先確認模型開放的接口
對話模型都支援 `chat.completions`；只有部分模型開放 `responses` 或 Anthropic `messages` 接口。Codex 需要 `responses`，Claude Code 需要 `messages`，選型前先在[模型目錄與接入](./models.md)裡查看每個模型開放的接口。
:::

## Cline {#cline}

1. 打開 Cline 的設定，「API Provider」選 **OpenAI Compatible**。
2. 「Base URL」填 `https://api.ourzai.com/v1`。
3. 「API Key」填你的密鑰。
4. 「Model ID」填一個支援 `chat.completions` 的對話模型 ID。

## Cursor {#cursor}

1. 打開 Cursor Settings → Models。
2. 在 API Keys 中填入 OpenAI API Key，開啟 **Override OpenAI Base URL**，填 `https://api.ourzai.com/v1`。
3. 在模型列表中加入要用的模型 ID 並啟用。

自訂密鑰只用於你在對話和 Agent 中選擇的這些模型；Tab 補全等 Cursor 自帶功能仍由 Cursor 自己的服務提供。

## Codex CLI {#codex}

Codex 透過 Responses 接口調用模型，要選開放 `responses` 的模型。在 `~/.codex/config.toml` 中加入：

```toml
model = "<开放 responses 的模型 ID>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

再在啟動 Codex 的終端機裡設定密鑰：

```bash
export ZAI_API_KEY="<你的 API 密钥>"
```

Windows PowerShell 寫作 `$env:ZAI_API_KEY = "<你的 API 密钥>"`。

## Claude Code {#claude-code}

Claude Code 透過 Anthropic Messages 接口調用模型，只能選開放 `messages` 的模型。啟動前設定環境變數：

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<你的 API 密钥>"
export ANTHROPIC_MODEL="<开放 messages 的模型 ID>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<同一个模型 ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<同一个模型 ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<同一个模型 ID>"
claude
```

- `ANTHROPIC_BASE_URL` 不帶 `/v1`：Claude Code 會自己拼接 `/v1/messages`。
- Claude Code 的背景任務和子代理預設會用其他型號。把三個 `ANTHROPIC_DEFAULT_*_MODEL` 都指向平台上開放 `messages` 的模型，避免請求平台沒有的型號而返回 404。
- Windows PowerShell 用 `$env:名稱 = "值"` 的寫法設定同樣的變數。

## 其他 OpenAI 兼容用戶端 {#other-clients}

Chatbox、Cherry Studio、LobeChat、Open WebUI、Dify、n8n 等應用，在「OpenAI 兼容」或「自訂 OpenAI」類型的服務商裡按開頭的三項設定填寫即可。讀取 OpenAI 標準環境變數的工具，見[用環境變數](./quickstart.md#env)。

接入後如果請求失敗，按[錯誤、限制與用量](./errors.md)裡的狀態碼排查：401 多半是密鑰填錯，404 多半是模型 ID 寫錯或模型不支援該接口。
