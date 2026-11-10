---
id: endpoints
title: 接口与能力
description: api.ourzai.com 提供的对话、向量、图像、语音、视频接口，视频任务的提交、查询与下载流程。
sidebar_position: 2
update_docs: none
---

# 接口与能力 {#endpoints}

本文列出的接口位于 `https://api.ourzai.com/v1/`，支持 OpenAI 和 Anthropic 兼容格式。鉴权方式见 [API 快速开始](./quickstart.md#get-key)。

## 一个模型能用哪些接口 {#model-endpoints}

不同模型支持的接口不同：对话模型不能生图，生视频模型不能对话。控制台「模型定价」会标出每个模型支持的接口，调用前先确认。用模型不支持的接口，或调用了你的账号不能使用的模型，会返回 404。

## 鉴权方式 {#authentication}

按以下任一方式传 API 密钥：

- `Authorization: Bearer <密钥>`（推荐，OpenAI 兼容接口都用这种）；
- `x-api-key: <密钥>`（Anthropic SDK 的方式）；
- `x-goog-api-key: <密钥>`（也可用于传递密钥；这不代表支持 Gemini 原生接口）。

不要把密钥放在 URL 查询参数里（如 `?api_key=`），这类请求会被拒绝。

## 文本 {#text}

| 方法与路径 | 用途 |
| --- | --- |
| `POST /v1/chat/completions` | 对话补全，OpenAI 兼容，支持 `stream` 流式输出 |
| `POST /v1/responses` | OpenAI Responses 接口 |
| `POST /v1/messages` | Anthropic Messages 兼容 |
| `POST /v1/messages/count_tokens` | 计算 Anthropic 格式请求的 Token 数 |
| `POST /v1/embeddings` | 文本向量，仅部分模型支持 |
| `GET /v1/models` | 模型列表 |

## 图像 {#images}

| 方法与路径 | 用途 |
| --- | --- |
| `POST /v1/images/generations` | 文生图，OpenAI 兼容 |
| `POST /v1/images/edits` | 图生图与图片编辑，OpenAI 兼容 |

图像接口同步返回结果。

## 语音 {#audio}

| 方法与路径 | 用途 |
| --- | --- |
| `POST /v1/audio/speech` | 语音合成，OpenAI 兼容 |
| `POST /v1/audio/transcriptions` | 语音转文字，OpenAI 兼容 |

响应中可能包含 `X-Zai-Audio-Duration-Ms`（音频时长，毫秒）或 `X-Zai-Audio-Confidence`（转写置信度），是否提供取决于所用模型。

## 视频生成 {#video}

视频生成是异步的：先提交任务拿到 `request_id`，再轮询状态，出片后下载结果。

| 方法与路径 | 用途 |
| --- | --- |
| `POST /v1/videos/generations` | 提交视频任务，返回 `request_id` |
| `GET /v1/videos/generations/{request_id}` | 查询任务状态 |
| `GET /v1/videos/generations/{request_id}/content` | 下载生成的视频 |

`/v1/videos` 与 `/v1/videos/{request_id}` 是等价的简写路径。

### 提交任务 {#video-submit}

请求体字段：

| 字段 | 说明 |
| --- | --- |
| `model` | 必填，视频模型名 |
| `prompt` | 画面与动作描述 |
| `duration` | 时长（秒） |
| `aspect_ratio` | 画面比例 |
| `resolution` | 分辨率 |
| `generate_audio` | 是否生成音轨 |
| `seed` | 随机种子 |
| `watermark` | 是否加水印 |
| `image` | 首帧图片 |
| `last_frame` | 尾帧图片 |
| `reference_images` | 参考图列表 |
| `reference_audios` | 参考音频列表 |

各模型支持的字段和取值不同。「模型定价」用于确认视频接口和价格；具体参数应按所选模型支持的能力填写。参数校验失败时，响应可能返回 400 `video_input_unsupported`，并在 `field` 中指出需要调整的字段。

```bash
curl https://api.ourzai.com/v1/videos/generations \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<视频模型名>", "prompt": "海边日落，镜头缓慢推近", "duration": 5}'
```

### 查询状态，拿到结果 {#video-status}

查询返回 `request_id`、`status`，出片后带 `video.url`（以及时长、分辨率等），失败时带 `error.code` 与 `error.message`。`status` 的取值：

| 状态 | 含义 |
| --- | --- |
| `pending` | 生成中，稍后再查 |
| `done` | 已完成，可以下载 |
| `failed` | 生成失败，见 `error` |
| `expired` | 任务已过期 |

### 下载视频 {#video-download}

`done` 之后请求 `/content` 获取视频文件。还没出片时请求会返回 409 `video_not_ready`，稍后重试即可。

视频只在真正生成成功时计费一次，轮询多少次都不重复计费。

## 调用 Gemini 模型 {#gemini}

当前不提供 `/v1beta/` 下的 Gemini 原生接口。调用 Gemini 模型时，先在「模型定价」确认该模型支持的兼容接口，再使用相应的 `/v1/` 路径。

## 按型号接入 {#model-guides}

[模型目录与接入](./models.md) — 选择模型，查看它实际开放的接口与完整请求示例。模型 ID 必须原样填写；同一厂商的不同型号不一定支持相同接口。
