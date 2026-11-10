---
id: models
title: モデル一覧と接続方法
description: モデル一覧と接続方法
sidebar_position: 4
update_docs: none
---

# モデル一覧と接続方法 {#models}

モデルを選び、公開されているエンドポイントと完全なリクエスト例を確認してください。モデル ID は正確に指定します。同じ提供元でも対応する API は異なります。

この一覧は接続方法を示すもので、稼働状況ではありません。キーで利用できるモデルは GET /v1/models、料金はコンソールで確認してください。掲載モデルでも上流障害やクールダウン中は 502/503 になる場合があります。待機時間を増やして再試行してください。

## モデルとエンドポイント {#matrix}

| モデル | 種類 | 対応エンドポイント |
|---|---|---|
| [gpt-6-astra](./models/gpt-6-astra.md) | 対話 | `chat.completions`, `responses` |
| [gpt-6-sol](./models/gpt-6-sol.md) | 対話 | `chat.completions`, `responses` |
| [gpt-5.6-sol](./models/gpt-5.6-sol.md) | 対話 | `chat.completions` |
| [claude-sonnet-5-5](./models/claude-sonnet-5-5.md) | 対話 | `chat.completions` |
| [claude-opus-5-5](./models/claude-opus-5-5.md) | 対話 | `chat.completions`, `messages`, `messages.count_tokens` |
| [gpt-image-2](./models/gpt-image-2.md) | 画像 | `images.generations`, `images.edits` |
| [gpt-image-2.5-flare](./models/gpt-image-2.5-flare.md) | 画像 | `images.generations`, `images.edits` |
| [gpt-image-2.5-sunburst](./models/gpt-image-2.5-sunburst.md) | 画像 | `images.generations`, `images.edits` |
| [grok-imagine-image](./models/grok-imagine-image.md) | 画像 | `images.generations`, `images.edits` |
| [grok-imagine-image-2.0](./models/grok-imagine-image-2.0.md) | 画像 | `images.generations`, `images.edits` |
| [grok-imagine-image-quality](./models/grok-imagine-image-quality.md) | 画像 | `images.generations`, `images.edits` |
| [grok-imagine-video](./models/grok-imagine-video.md) | 動画 | `videos.generations` |
| [grok-imagine-video-1.5](./models/grok-imagine-video-1.5.md) | 動画 | `videos.generations` |
| [minimax-h3](./models/minimax-h3.md) | 動画 | `videos.generations` |
| [cosyvoice2-0.5b](./models/cosyvoice2-0.5b.md) | 音声合成 | `audio.speech` |

## 現在のモデル一覧を取得 {#live-models}


```bash
curl --fail-with-body https://api.ourzai.com/v1/models \
  -H "Authorization: Bearer $ZAI_API_KEY"
```

## 関連ドキュメント {#related}

- [クイックスタート](./quickstart.md)
- [エラーと使用量](./errors.md)
