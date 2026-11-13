---
id: claude-code
title: 在 Claude Code 中使用
sidebar_label: Claude Code
description: 用環境變數或 settings.json 讓 Claude Code 命令列透過 Anthropic Messages 接口調用 ZAI API。
sidebar_position: 1
update_docs: none
---

# 在 Claude Code 中使用 {#claude-code}

Claude Code 透過 Anthropic Messages 接口調用模型，只能選開放 `messages` 的模型，在[模型目錄與接入](../models.md)裡查看。本頁適用於命令列版 Claude Code；在 Claude 桌面應用程式裡使用 Code，見 [Claude 桌面版](./claude-desktop.md)。

:::tip 不想手動配置？
ZAI 提供桌面端的[密鑰管理工具](./key-tool.mdx)，用來集中管理 API 密鑰並配置接入。[前往下載](./key-tool.mdx#download)
:::

## 用環境變數臨時接入 {#env}

在啟動 Claude Code 的終端機裡設定環境變數：

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<你的 API 密钥>"
export ANTHROPIC_MODEL="<开放 messages 的模型 ID>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<同一个模型 ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<同一个模型 ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<同一个模型 ID>"
claude
```

Windows PowerShell 用 `$env:名稱 = "值"` 的寫法設定同樣的變數。這些變數只在目前的終端機裡生效。

## 寫入設定檔長期生效 {#settings}

不想每次都設定環境變數時，把同樣的變數寫進 `~/.claude/settings.json` 的 `env` 欄位（Windows 為 `%USERPROFILE%\.claude\settings.json`），之後直接執行 `claude` 即可：

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

這個檔案以明文儲存密鑰，不要提交到程式碼倉庫或分享給他人。

## 注意事項 {#notes}

- `ANTHROPIC_BASE_URL` 不帶 `/v1`：Claude Code 會自己拼接 `/v1/messages`。
- Claude Code 的背景任務和子代理預設會用其他型號。把三個 `ANTHROPIC_DEFAULT_*_MODEL` 都指向平台上開放 `messages` 的模型，避免請求平台沒有的型號而返回 404。
- 可以在 Claude Code 裡輸入 `/status` 查看目前使用的接口地址和模型。

接入後如果請求失敗，按[錯誤、限制與用量](../errors.md)裡的狀態碼排查。
