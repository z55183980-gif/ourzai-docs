---
id: endpoints
title: インターフェースと機能
description: api.ourzai.com が提供するチャット、ベクター、画像、音声、動画の各インターフェースと、動画タスクの送信、問い合わせ、ダウンロードのワークフローについて説明します。
sidebar_position: 2
update_docs: none
---

# インターフェースと機能 {#endpoints}

このドキュメントに記載されているインターフェースは、`https://api.ourzai.com/v1/` にあり、OpenAI 互換形式と Anthropic 互換形式の両方をサポートしています。認証の詳細については、[API クイックスタート](./quickstart.md#get-key) を参照してください。

## モデルが使用できるインターフェース {#model-endpoints}

モデルごとにサポートするインターフェースは異なります。チャットモデルは画像を生成できず、動画生成モデルはチャットできません。コンソールの **Pricing** ページで、各モデルがサポートするインターフェースを確認してから呼び出しを行ってください。モデルがサポートしていないインターフェースを使用した場合や、アカウントで利用できないモデルを呼び出した場合は、404 が返されます。

## 認証 {#authentication}

API キーは、次のいずれかの方法で渡します。

- `Authorization: Bearer <YOUR_API_KEY>` (推奨。すべての OpenAI 互換インターフェースで使用)
- `x-api-key: <YOUR_API_KEY>` (Anthropic SDK の方式)
- `x-goog-api-key: <YOUR_API_KEY>` (キーの受け渡しに使用可能。ただし、ネイティブ Gemini インターフェースのサポートを意味するものではありません)

キーを URL クエリパラメータ (例: `?api_key=`) に含めないでください。そのようなリクエストは拒否されます。

## テキスト {#text}

| メソッドとパス | 目的 |
| --- | --- |
| `POST /v1/chat/completions` | チャット補完 (OpenAI 互換)。`stream` によるストリーミングに対応 |
| `POST /v1/responses` | OpenAI Responses インターフェース |
| `POST /v1/messages` | Anthropic Messages 互換 |
| `POST /v1/messages/count_tokens` | Anthropic 形式のリクエストのトークン数を計算 |
| `POST /v1/embeddings` | テキストベクター。一部のモデルのみ対応 |
| `GET /v1/models` | モデル一覧 |

## 画像 {#images}

| メソッドとパス | 目的 |
| --- | --- |
| `POST /v1/images/generations` | テキストからの画像生成 (OpenAI 互換) |
| `POST /v1/images/edits` | 画像からの画像生成および画像編集 (OpenAI 互換) |

画像インターフェースは同期的に結果を返します。

## 音声 {#audio}

| メソッドとパス | 目的 |
| --- | --- |
| `POST /v1/audio/speech` | テキスト読み上げ (OpenAI 互換) |
| `POST /v1/audio/transcriptions` | 音声認識 (OpenAI 互換) |

使用するモデルに応じて、レスポンスに `X-Zai-Audio-Duration-Ms` (音声の長さ、ミリ秒単位) または `X-Zai-Audio-Confidence` (文字起こしの信頼度) が含まれる場合があります。

## 動画生成 {#video}

動画生成は非同期で行われます。まずタスクを送信して `request_id` を受け取り、その後ステータスをポーリングし、動画が完成したら結果をダウンロードします。

| メソッドとパス | 目的 |
| --- | --- |
| `POST /v1/videos/generations` | 動画タスクを送信。`request_id` を返します |
| `GET /v1/videos/generations/{request_id}` | タスクのステータスを問い合わせ |
| `GET /v1/videos/generations/{request_id}/content` | 生成された動画をダウンロード |

`/v1/videos` と `/v1/videos/{request_id}` は同等の短縮パスです。

### タスクの送信 {#video-submit}

リクエストボディのフィールド:

| フィールド | 説明 |
| --- | --- |
| `model` | 必須。動画モデル名 |
| `prompt` | 映像と動きの説明 |
| `duration` | 長さ (秒) |
| `aspect_ratio` | アスペクト比 |
| `resolution` | 解像度 |
| `generate_audio` | 音声トラックを生成するかどうか |
| `seed` | 乱数シード |
| `watermark` | ウォーターマークを追加するかどうか |
| `image` | 最初のフレーム画像 |
| `last_frame` | 最後のフレーム画像 |
| `reference_images` | 参照画像のリスト |
| `reference_audios` | 参照音声クリップのリスト |

サポートされるフィールドと値はモデルによって異なります。**Pricing** ページで動画インターフェースと料金を確認し、選択したモデルの機能に応じて具体的なパラメータを指定してください。パラメータの検証に失敗した場合、レスポンスとして 400 と `video_input_unsupported` が返され、`field` にどのフィールドを調整する必要があるかが示されることがあります。

```bash
curl https://api.ourzai.com/v1/videos/generations \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<VIDEO_MODEL_ID>", "prompt": "Sunset by the sea, with a slow camera push-in", "duration": 5}'
```

### ステータスの問い合わせと結果の取得 {#video-status}

問い合わせ結果には `request_id` と `status` が含まれます。動画の準備が完了すると、`video.url` (長さや解像度などの情報も含む) が含まれます。失敗した場合は、`error.code` と `error.message` が含まれます。`status` に指定できる値:

| ステータス | 意味 |
| --- | --- |
| `pending` | 生成中。後で再度確認してください |
| `done` | 完了。ダウンロード可能 |
| `failed` | 生成失敗。`error` を参照 |
| `expired` | タスクの有効期限切れ |

### 動画のダウンロード {#video-download}

`done` の後、`/content` をリクエストして動画ファイルを取得します。動画がまだ準備できていない場合、リクエストは 409 `video_not_ready` を返します。その場合は、後で再試行してください。

動画生成の課金は、正常に完了した場合にのみ一度だけ発生します。ポーリングは何度行っても追加料金はかかりません。

## Gemini モデルの呼び出し {#gemini}

`/v1beta/` 配下のネイティブ Gemini インターフェースは現在利用できません。Gemini モデルを呼び出すには、まず **Pricing** ページでそのモデルがサポートする互換インターフェースを確認し、対応する `/v1/` パスを使用してください。

## モデル別の接続 {#model-guides}

[モデル一覧と接続方法](./models.md) — モデルを選び、公開されているエンドポイントと完全なリクエスト例を確認してください。モデル ID は正確に指定します。同じ提供元でも対応する API は異なります。
