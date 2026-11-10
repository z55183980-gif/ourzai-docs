---
id: endpoints
title: 接口與能力
description: api.ourzai.com 提供的對話、向量、圖像、語音、影片接口，影片任務的提交、查詢與下載流程。
sidebar_position: 2
update_docs: none
---

# 接口與能力 {#endpoints}

本文列出的接口位於 `https://api.ourzai.com/v1/`，支持 OpenAI 和 Anthropic 兼容格式。鑑權方式見 [API 快速開始](./quickstart.md#get-key)。

## 一個模型能用哪些接口 {#model-endpoints}

不同模型支持的接口不同：對話模型不能生成圖像，生成影片模型不能對話。控制台「模型定價」會標出每個模型支持的接口，調用前先確認。用模型不支持的接口，或調用了你的賬戶不能使用的模型，會返回 404。

## 鑑權方式 {#authentication}

按以下任一方式傳 API 密鑰：

- `Authorization: Bearer <密钥>`（推薦，OpenAI 兼容接口都用這種）；
- `x-api-key: <密钥>`（Anthropic SDK 的方式）；
- `x-goog-api-key: <密钥>`（也可用於傳遞密鑰；這不代表支持 Gemini 原生接口）。

不要把密鑰放在 URL 查詢參數裡（如 `?api_key=`），這類請求會被拒絕。

## 文本 {#text}

| 方法與路徑 | 用途 |
| --- | --- |
| `POST /v1/chat/completions` | 對話補全，OpenAI 兼容，支持 `stream` 流式輸出 |
| `POST /v1/responses` | OpenAI Responses 接口 |
| `POST /v1/messages` | Anthropic Messages 兼容 |
| `POST /v1/messages/count_tokens` | 計算 Anthropic 格式請求的 Token 數 |
| `POST /v1/embeddings` | 文本向量，僅部分模型支持 |
| `GET /v1/models` | 模型列表 |

## 圖像 {#images}

| 方法與路徑 | 用途 |
| --- | --- |
| `POST /v1/images/generations` | 文生圖，OpenAI 兼容 |
| `POST /v1/images/edits` | 圖生圖與圖片編輯，OpenAI 兼容 |

圖像接口同步返回結果。

## 語音 {#audio}

| 方法與路徑 | 用途 |
| --- | --- |
| `POST /v1/audio/speech` | 語音合成，OpenAI 兼容 |
| `POST /v1/audio/transcriptions` | 語音轉文字，OpenAI 兼容 |

響應中可能包含 `X-Zai-Audio-Duration-Ms`（音頻時長，毫秒）或 `X-Zai-Audio-Confidence`（轉寫置信度），是否提供取決於所用模型。

## 影片生成 {#video}

影片生成是異步的：先提交任務拿到 `request_id`，再輪詢狀態，出片後下載結果。

| 方法與路徑 | 用途 |
| --- | --- |
| `POST /v1/videos/generations` | 提交影片任務，返回 `request_id` |
| `GET /v1/videos/generations/{request_id}` | 查詢任務狀態 |
| `GET /v1/videos/generations/{request_id}/content` | 下載生成的影片 |

`/v1/videos` 與 `/v1/videos/{request_id}` 是等價的簡寫路徑。

### 提交任務 {#video-submit}

請求體字段：

| 字段 | 說明 |
| --- | --- |
| `model` | 必填，影片模型名 |
| `prompt` | 畫面與動作描述 |
| `duration` | 時長（秒） |
| `aspect_ratio` | 畫面比例 |
| `resolution` | 分辨率 |
| `generate_audio` | 是否生成音軌 |
| `seed` | 隨機種子 |
| `watermark` | 是否加水印 |
| `image` | 首幀圖片 |
| `last_frame` | 尾幀圖片 |
| `reference_images` | 參考圖列表 |
| `reference_audios` | 參考音頻列表 |

各模型支持的字段和取值不同。「模型定價」用於確認影片接口和價格；具體參數應按所選模型支持的能力填寫。參數校驗失敗時，響應可能返回 400 `video_input_unsupported`，並在 `field` 中指出需要調整的字段。

```bash
curl https://api.ourzai.com/v1/videos/generations \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<视频模型名>", "prompt": "海边日落，镜头缓慢推近", "duration": 5}'
```

### 查詢狀態，拿到結果 {#video-status}

查詢返回 `request_id`、`status`，出片後帶 `video.url`（以及時長、分辨率等），失敗時帶 `error.code` 與 `error.message`。`status` 的取值：

| 狀態 | 含義 |
| --- | --- |
| `pending` | 生成中，稍後再查 |
| `done` | 已完成，可以下載 |
| `failed` | 生成失敗，見 `error` |
| `expired` | 任務已過期 |

### 下載影片 {#video-download}

`done` 之後請求 `/content` 獲取影片文件。還沒出片時請求會返回 409 `video_not_ready`，稍後重試即可。

影片只在真正生成成功時計費一次，輪詢多少次都不重複計費。

## 調用 Gemini 模型 {#gemini}

當前不提供 `/v1beta/` 下的 Gemini 原生接口。調用 Gemini 模型時，先在「模型定價」確認該模型支持的兼容接口，再使用相應的 `/v1/` 路徑。

## 按型號接入 {#model-guides}

[模型目錄與接入](./models.md) — 選擇模型，查看實際開放的介面與完整請求範例。模型 ID 必須原樣填寫；同一廠商的不同型號不一定支援相同介面。
