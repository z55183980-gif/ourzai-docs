---
id: claude-desktop
title: 在 Claude 桌面版中使用
sidebar_label: Claude 桌面版
description: 透過 Claude 桌面應用程式的第三方推理設定，讓 Chat、Cowork 和 Code 使用 ZAI API。
sidebar_position: 2
update_docs: none
---

# 在 Claude 桌面版中使用 {#claude-desktop}

Claude 桌面應用程式（macOS、Windows）可以透過「第三方推理」設定改用 ZAI API。設定後，應用程式裡的 Chat、Cowork 和 Code 都透過 Anthropic Messages 接口請求 ZAI API，並按用量從餘額扣費，因此只能選開放 `messages` 的模型，在[模型目錄與接入](../models.md)裡查看。

:::note 環境變數對桌面版無效
桌面版 Code 的本機工作階段會使用應用程式自己設定的接口地址，在終端機、系統環境變數或 `~/.claude/settings.json` 裡設定的 `ANTHROPIC_BASE_URL` 都不會生效。請按本頁步驟在應用程式內設定。只用命令列版時，見 [Claude Code](./claude-code.md)。
:::

## 打開設定視窗 {#open}

1. 把 Claude 桌面應用程式更新到最新版本。
2. 開啟開發者模式：macOS 在選單列，Windows 在登入介面左上角的應用程式選單（☰）中，選擇 **Help → Troubleshooting → Enable Developer Mode**。
3. 選擇 **Developer → Configure Third-Party Inference…**，打開設定視窗。

看不到 **Developer** 選單時，重新執行第 2 步；仍然沒有，說明應用程式版本還不支援第三方推理，先更新應用程式。

## 填寫連線資料 {#connection}

在設定視窗的 **Connection** 部分，把 **Inference provider** 選為 **Gateway**，再按下表填寫：

| 設定項 | 填寫 |
| --- | --- |
| Gateway base URL | `https://api.ourzai.com`（不帶 `/v1`） |
| Gateway API key | 你的 API 密鑰 |
| Credential kind | **Static API key** |
| Gateway auth scheme | **Bearer** |

應用程式會在 Base URL 後面自己拼接 `/v1/messages` 和 `/v1/models`，所以這裡不要加 `/v1`。

## 選擇模型 {#models}

應用程式預設請求 `GET /v1/models` 自動發現模型，只把能識別為 Claude 型號的模型 ID 放進模型選擇器。選擇器裡沒有你要的模型時，在設定視窗的模型列表中手動加入開放 `messages` 的模型 ID，原樣填寫。

## 套用設定 {#apply}

點擊 **Apply Changes**，應用程式會把設定寫到本機並重新啟動。啟動後在 Chat、Cowork 或 Code 中發一條訊息，確認能正常回覆。之後修改設定，同樣需要套用並重新啟動後才生效。

再次修改時，如果 **Developer** 選單不見了，按[打開設定視窗](#open)第 2 步重新開啟開發者模式。

## 常見問題 {#faq}

- **模型選擇器為空**：檢查密鑰是否正確，或按[選擇模型](#models)手動加入模型 ID。
- **401**：Gateway API key 填錯，或 Gateway auth scheme 不是 **Bearer**。
- **404 或「模型不可用」**：模型 ID 寫錯，或該模型沒有開放 `messages` 接口。

其他狀態碼按[錯誤、限制與用量](../errors.md)排查。
