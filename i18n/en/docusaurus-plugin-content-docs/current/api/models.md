---
id: models
title: Model catalog and integration
description: Model catalog and integration
sidebar_position: 4
update_docs: none
---

# Model catalog and integration {#models}

Choose a model to see its exposed endpoints and complete request examples. Use the exact model ID; models from the same provider do not necessarily support the same interfaces.

This catalog describes integration, not live availability. GET /v1/models lists models visible to your key; current prices are in the console. Listed models can still return 502/503 during upstream failures or cooldowns. Wait and retry with backoff.

## Models and endpoints {#matrix}

| Model | Type | Supported endpoints |
|---|---|---|
| [gpt-6-astra](./models/gpt-6-astra.md) | Chat | `chat.completions`, `responses` |
| [gpt-6-sol](./models/gpt-6-sol.md) | Chat | `chat.completions`, `responses` |
| [gpt-5.6-sol](./models/gpt-5.6-sol.md) | Chat | `chat.completions` |
| [claude-sonnet-5-5](./models/claude-sonnet-5-5.md) | Chat | `chat.completions` |
| [claude-opus-5-5](./models/claude-opus-5-5.md) | Chat | `chat.completions`, `messages`, `messages.count_tokens` |
| [gpt-image-2](./models/gpt-image-2.md) | Image | `images.generations`, `images.edits` |
| [gpt-image-2.5-flare](./models/gpt-image-2.5-flare.md) | Image | `images.generations`, `images.edits` |
| [gpt-image-2.5-sunburst](./models/gpt-image-2.5-sunburst.md) | Image | `images.generations`, `images.edits` |
| [grok-imagine-image](./models/grok-imagine-image.md) | Image | `images.generations`, `images.edits` |
| [grok-imagine-image-2.0](./models/grok-imagine-image-2.0.md) | Image | `images.generations`, `images.edits` |
| [grok-imagine-image-quality](./models/grok-imagine-image-quality.md) | Image | `images.generations`, `images.edits` |
| [grok-imagine-video](./models/grok-imagine-video.md) | Video | `videos.generations` |
| [grok-imagine-video-1.5](./models/grok-imagine-video-1.5.md) | Video | `videos.generations` |
| [minimax-h3](./models/minimax-h3.md) | Video | `videos.generations` |
| [cosyvoice2-0.5b](./models/cosyvoice2-0.5b.md) | Speech | `audio.speech` |

## Fetch the live model list {#live-models}


```bash
curl --fail-with-body https://api.ourzai.com/v1/models \
  -H "Authorization: Bearer $ZAI_API_KEY"
```

## Related documentation {#related}

- [Quickstart](./quickstart.md)
- [Errors and usage](./errors.md)
