---
id: models
title: 模型目錄與接入
description: 模型目錄與接入
sidebar_position: 4
update_docs: none
---

# 模型目錄與接入 {#models}

選擇模型，查看實際開放的介面與完整請求範例。模型 ID 必須原樣填寫；同一廠商的不同型號不一定支援相同介面。

此目錄說明接入方式，不代表即時可用性。以 GET /v1/models 確認金鑰可見的模型，價格見控制台。已列出的模型仍可能因上游故障或冷卻回傳 502/503；請等待並以退避方式重試。

## 模型與介面 {#matrix}

| 模型 | 類型 | 支援的介面 |
|---|---|---|
| [gpt-6-astra](./models/gpt-6-astra.md) | 對話 | `chat.completions`, `responses` |
| [gpt-6-sol](./models/gpt-6-sol.md) | 對話 | `chat.completions`, `responses` |
| [gpt-5.6-sol](./models/gpt-5.6-sol.md) | 對話 | `chat.completions` |
| [claude-sonnet-5-5](./models/claude-sonnet-5-5.md) | 對話 | `chat.completions` |
| [claude-opus-5-5](./models/claude-opus-5-5.md) | 對話 | `chat.completions`, `messages`, `messages.count_tokens` |
| [gpt-image-2](./models/gpt-image-2.md) | 圖像 | `images.generations`, `images.edits` |
| [gpt-image-2.5-flare](./models/gpt-image-2.5-flare.md) | 圖像 | `images.generations`, `images.edits` |
| [gpt-image-2.5-sunburst](./models/gpt-image-2.5-sunburst.md) | 圖像 | `images.generations`, `images.edits` |
| [grok-imagine-image](./models/grok-imagine-image.md) | 圖像 | `images.generations`, `images.edits` |
| [grok-imagine-image-2.0](./models/grok-imagine-image-2.0.md) | 圖像 | `images.generations`, `images.edits` |
| [grok-imagine-image-quality](./models/grok-imagine-image-quality.md) | 圖像 | `images.generations`, `images.edits` |
| [grok-imagine-video](./models/grok-imagine-video.md) | 影片 | `videos.generations` |
| [grok-imagine-video-1.5](./models/grok-imagine-video-1.5.md) | 影片 | `videos.generations` |
| [minimax-h3](./models/minimax-h3.md) | 影片 | `videos.generations` |
| [cosyvoice2-0.5b](./models/cosyvoice2-0.5b.md) | 語音 | `audio.speech` |

## 取得即時模型清單 {#live-models}


```bash
curl --fail-with-body https://api.ourzai.com/v1/models \
  -H "Authorization: Bearer $ZAI_API_KEY"
```

## 相關文件 {#related}

- [快速開始](./quickstart.md)
- [錯誤與用量](./errors.md)
