---
id: cline
title: 在 Cline 中使用
sidebar_label: Cline
description: 在 Cline 中選擇 OpenAI Compatible 服務商，填寫 ZAI API 的 Base URL、密鑰和模型 ID。
sidebar_position: 6
update_docs: none
---

# 在 Cline 中使用 {#cline}

Cline 透過 `chat.completions` 接口調用模型，對話模型都可以使用，在[模型目錄與接入](../models.md)裡查看模型 ID。

## 設定步驟 {#setup}

1. 打開 Cline 的設定，「API Provider」選 **OpenAI Compatible**。
2. 「Base URL」填 `https://api.ourzai.com/v1`。
3. 「API Key」填你的密鑰。
4. 「Model ID」填一個支援 `chat.completions` 的對話模型 ID。

Cline 完成一個任務會連續發出很多請求，建議為這把密鑰設定總額度，見[取得密鑰](../quickstart.md#get-key)。接入後如果請求失敗，按[錯誤、限制與用量](../errors.md)裡的狀態碼排查。
