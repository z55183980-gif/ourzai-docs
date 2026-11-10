---
id: cursor
title: 在 Cursor 中使用
sidebar_label: Cursor
description: 在 Cursor 中填入 ZAI API 密鑰並覆寫 OpenAI Base URL，在對話和 Agent 中使用 ZAI 模型。
sidebar_position: 5
update_docs: none
---

# 在 Cursor 中使用 {#cursor}

Cursor 透過 `chat.completions` 接口調用自訂模型，對話模型都可以使用，在[模型目錄與接入](../models.md)裡查看模型 ID。

## 設定步驟 {#setup}

1. 打開 Cursor Settings → Models。
2. 在 API Keys 中填入 OpenAI API Key，開啟 **Override OpenAI Base URL**，填 `https://api.ourzai.com/v1`。
3. 在模型列表中加入要用的模型 ID 並啟用。

## 使用範圍 {#scope}

自訂密鑰只用於你在對話和 Agent 中選擇的這些模型；Tab 補全等 Cursor 自帶功能仍由 Cursor 自己的服務提供。

接入後如果請求失敗，按[錯誤、限制與用量](../errors.md)裡的狀態碼排查：401 多半是密鑰填錯，404 多半是模型 ID 寫錯。
