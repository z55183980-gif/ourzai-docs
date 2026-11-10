---
id: quickstart
title: APIクイックスタート
description: コンソールからAPIキーを取得し、base_urlをhttps://api.ourzai.com/v1に変更して、最初のリクエストを送信します。
sidebar_position: 1
update_docs: none
---

# APIクイックスタート {#quickstart}

ZAI APIの利用開始は、キーの取得、base_urlの変更、リクエスト送信の3ステップだけです。ZAIの公開APIはOpenAIインターフェース形式と互換性があり、既存のOpenAI SDKやHTTPコードはbase_urlとAPIキーを変更するだけでプラットフォーム上のモデルを呼び出せます。チャット、画像、動画、音声はすべて同じエントリポイントを経由し、料金は実際の使用量に基づいてUSD残高から差し引かれます。

| 項目 | 値 |
| --- | --- |
| base_url (OpenAI互換SDK) | `https://api.ourzai.com/v1` |
| 認証 | リクエストヘッダー `Authorization: Bearer <YOUR_API_KEY>` |
| キーと使用状況 | [開発者コンソール](https://ourzai.com/console) |

## 1. キーの取得 {#get-key}

1. [開発者コンソール](https://ourzai.com/console)を開き、プラットフォームアカウントでログインします。アカウントをお持ちでない場合は、ログインページから直接登録できます。[アカウント、請求、サポート](../platform/account.md#register)をご参照ください。
2. **API keys** に移動し、**New** をクリックして名前を入力します。
3. 必要に応じて設定します。
   - **有効期間**: 7日、30日、90日、または最大3650日までのカスタム日付を選択します。有効期限制限を有効にしない場合、キーは無期限に有効です。
   - **総利用額制限**: 有効にすると、このキーが消費できる最大USD金額を設定します。無効にすると、キー自体の利用上限はありませんが、リクエストはアカウントの利用可能残高によって制限されます。
   - **IP許可リスト / ブロックリスト**: 単一IPまたはCIDRで、リストごとに最大100件まで登録できます。
4. 作成後、そのままコピーできる使用例がポップアップ表示されます。

コンソールではフルキーはデフォルトでマスク表示され、クリックしていつでも表示・コピーできます。キーは `sk-` の後に16進数の文字列が続く形式です。同じページで、後からキーの無効化、有効化、有効期間や制限の編集、削除が可能です。

:::caution キーは安全に保管してください
キーはアカウントの利用権限に相当します。フロントエンドのコードに埋め込んだり、コードリポジトリにコミットしたり、他人と共有したりしないでください。漏洩が疑われる場合は、直ちにコンソールで無効化または削除し、新しいキーを作成してください。
:::

## 2. base_urlの変更 {#set-base-url}

OpenAI互換SDKまたはHTTPリクエストで使用するアドレスを `https://api.ourzai.com/v1` に変更し、対応するエンドポイントをサポートするモデルを選択します。モデルによってサポートするパラメータが異なる場合があります。

- **`/v1` は必須です**: OpenAI互換SDKはbase_urlに `/chat/completions` のようなパスを追加します。 `/v1` が欠けていると404エラーになります。
- Anthropic SDKを使用して `/v1/messages` を呼び出す場合、base_urlを `https://api.ourzai.com` に設定します（SDKが自動的に `/v1` を追加します）。

## 3. 最初のリクエストを送信 {#first-request}

まずコンソールの **Pricing** からチャット対応モデルを選び、その名前を `model` フィールドに入力します。

### cURL {#curl}

```bash
curl https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Python {#python}

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.ourzai.com/v1",
    api_key="<YOUR_API_KEY>",
)

response = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "Hello"}],
)
print(response.choices[0].message.content)
```

### Node.js {#nodejs}

```js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.ourzai.com/v1",
  apiKey: process.env.ZAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "<MODEL_ID>",
  messages: [{ role: "user", content: "Hello" }],
});
console.log(response.choices[0].message.content);
```

### 環境変数の使用 {#env}

多くのツールはOpenAIの標準環境変数を読み取るため、設定後はコードを変更する必要はありません。

```bash
export OPENAI_BASE_URL="https://api.ourzai.com/v1"
export OPENAI_API_KEY="<YOUR_API_KEY>"
```

## 4. ストリーミング出力 {#streaming}

チャットエンドポイントはSSEストリーミング出力に対応しています。リクエストボディに `"stream": true` を追加します。使い方はOpenAIと同じです。ストリーム開始後にエラーが発生した場合、SSEイベントとして返されるため、クライアント側で処理する必要があります。

## 5. 対応モデルと料金 {#models}

- **コンソールのPricing**: プラットフォームが提供するモデル、各モデルが対応するエンドポイント（チャット、埋め込み、画像生成、動画生成など）、USD単価（100万トークンあたりまたは課金単位あたり）、base_urlを確認できます。これが最も信頼できる情報源です。
- **`GET /v1/models`**: APIキーを使用してプログラムでモデルリストを取得できます。

モデル名はリクエストの `model` フィールドに直接入力します。モデルが呼び出すエンドポイントに対応していない場合は404が返されます。[エラー、制限、使用状況](./errors.md)をご参照ください。

## 6. 使用状況の確認 {#usage}

コンソールの **Usage** ページでは、期間、キー、モデルで絞り込み、リクエスト数、トークン数、費用（USD）、使用傾向、モデル別の分布を確認できます。通話詳細をCSVとしてエクスポートすることも可能で、クエリ範囲は最大90日間です。**API keys** ページでは、各キーの今日の利用額と累計利用額を確認できます。

API呼び出しとZaiDramaの作成は同じUSD残高を共有します。チャージ方法については[アカウント、請求、サポート](../platform/account.md#credits)をご参照ください。

## 次のステップ {#next-steps}

- [エンドポイントと機能](./endpoints.md): すべてのチャット、画像、音声、動画などのエンドポイント。
- [エラー、制限、使用状況](./errors.md): エラーコード、リクエスト制限、よくある質問。

## モデル別の接続 {#model-guides}

[モデル一覧と接続方法](./models.md) — モデルを選び、公開されているエンドポイントと完全なリクエスト例を確認してください。モデル ID は正確に指定します。同じ提供元でも対応する API は異なります。
