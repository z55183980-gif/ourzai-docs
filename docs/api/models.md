---
id: models
title: 模型目录与接入
description: 模型目录与接入
sidebar_position: 4
update_docs: none
---

# 模型目录与接入 {#models}

选择模型，查看它实际开放的接口与完整请求示例。模型 ID 必须原样填写；同一厂商的不同型号不一定支持相同接口。

此目录说明接入方式，不代表实时可用性。用 GET /v1/models 确认 Key 可见的模型，价格见控制台「模型定价」。已列出的模型仍可能因上游故障或冷却暂时返回 502/503；等待并退避重试。

## 模型与接口 {#matrix}

| 模型 | 类型 | 支持的接口 |
|---|---|---|
| [gpt-6-astra](./models/gpt-6-astra.md) | 对话 | `chat.completions`, `responses` |
| [gpt-6-sol](./models/gpt-6-sol.md) | 对话 | `chat.completions`, `responses` |
| [gpt-5.6-sol](./models/gpt-5.6-sol.md) | 对话 | `chat.completions` |
| [claude-sonnet-5-5](./models/claude-sonnet-5-5.md) | 对话 | `chat.completions` |
| [claude-opus-5-5](./models/claude-opus-5-5.md) | 对话 | `chat.completions`, `messages`, `messages.count_tokens` |
| [gpt-image-2](./models/gpt-image-2.md) | 图像 | `images.generations`, `images.edits` |
| [gpt-image-2.5-flare](./models/gpt-image-2.5-flare.md) | 图像 | `images.generations`, `images.edits` |
| [gpt-image-2.5-sunburst](./models/gpt-image-2.5-sunburst.md) | 图像 | `images.generations`, `images.edits` |
| [grok-imagine-image](./models/grok-imagine-image.md) | 图像 | `images.generations`, `images.edits` |
| [grok-imagine-image-2.0](./models/grok-imagine-image-2.0.md) | 图像 | `images.generations`, `images.edits` |
| [grok-imagine-image-quality](./models/grok-imagine-image-quality.md) | 图像 | `images.generations`, `images.edits` |
| [grok-imagine-video](./models/grok-imagine-video.md) | 视频 | `videos.generations` |
| [grok-imagine-video-1.5](./models/grok-imagine-video-1.5.md) | 视频 | `videos.generations` |
| [minimax-h3](./models/minimax-h3.md) | 视频 | `videos.generations` |
| [cosyvoice2-0.5b](./models/cosyvoice2-0.5b.md) | 语音 | `audio.speech` |

## 通过 API 获取实时模型列表 {#live-models}


```bash
curl --fail-with-body https://api.ourzai.com/v1/models \
  -H "Authorization: Bearer $ZAI_API_KEY"
```

## 相关文档 {#related}

- [快速开始](./quickstart.md)
- [错误与用量](./errors.md)
