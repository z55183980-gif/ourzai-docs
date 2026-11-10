---
id: tools
slug: /api/tools
title: 在編程工具中使用
sidebar_label: 編程工具接入
description: 在 Claude Code、Claude 桌面版、Codex、Cursor、Cline 等編程工具裡接入 ZAI API 的通用設定與各工具教學入口。
sidebar_position: 0
update_docs: none
---

# 在編程工具中使用 {#tools}

支援自訂接口地址的編程工具和用戶端，都可以接入 ZAI API。各工具需要的是同樣三項設定：

| 設定 | 填寫 |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1`（Anthropic 協議的工具填 `https://api.ourzai.com`，見各工具頁面） |
| API Key | 在[開發者控制台](https://ourzai.com/console)「API 密鑰」裡新建的密鑰 |
| 模型 | [模型目錄](../models.md)中的模型 ID，原樣填寫 |

工具介面會隨版本變化，各工具頁面寫的是設定項名稱；找不到時按上表三項對應填寫。編程工具完成一次任務可能連續發出很多請求，每次都按用量從餘額扣費，建議為這把密鑰設定總額度，見[取得密鑰](../quickstart.md#get-key)。

:::tip 先確認模型開放的接口
對話模型都支援 `chat.completions`；只有部分模型開放 `responses` 或 Anthropic `messages` 接口。選型前先在[模型目錄與接入](../models.md)裡查看每個模型開放的接口。
:::

## 選擇你的工具 {#choose}

| 工具 | 形式 | 需要的接口 | 教學 |
| --- | --- | --- | --- |
| Claude Code | 命令列 | `messages` | [Claude Code](./claude-code.md) |
| Claude 桌面版 | 桌面應用程式（Chat、Cowork、Code） | `messages` | [Claude 桌面版](./claude-desktop.md) |
| Codex CLI | 命令列 | `responses` | [Codex CLI](./codex-cli.md) |
| Codex 桌面版 | 桌面應用程式 | `responses` | [Codex 桌面版](./codex-app.md) |
| Cursor | 編輯器 | `chat.completions` | [Cursor](./cursor.md) |
| Cline | 編輯器擴充功能 | `chat.completions` | [Cline](./cline.md) |

## 其他 OpenAI 兼容用戶端 {#other-clients}

Chatbox、Cherry Studio、LobeChat、Open WebUI、Dify、n8n 等應用程式，在「OpenAI 兼容」或「自訂 OpenAI」類型的服務商裡按開頭的三項設定填寫即可。讀取 OpenAI 標準環境變數的工具，見[用環境變數](../quickstart.md#env)。

## 接入失敗時 {#troubleshooting}

按[錯誤、限制與用量](../errors.md)裡的狀態碼排查：401 多半是密鑰填錯，404 多半是模型 ID 寫錯或模型不支援該接口。
