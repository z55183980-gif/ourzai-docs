---
id: claude-sonnet-5-5
title: claude-sonnet-5-5 — 接続ガイド
description: claude-sonnet-5-5 — 接続ガイド
sidebar_position: 4
update_docs: none
---

# claude-sonnet-5-5 — 接続ガイド {#integration}

model にはこのページの正確な ID を指定します。以下に記載されたエンドポイントのみが、このモデルの接続ガイドの対象です。

`model`: `claude-sonnet-5-5`

## モデルとエンドポイント {#endpoints}

| 対応エンドポイント | HTTP |
|---|---|
| `chat.completions` | `POST /v1/chat/completions` |

## 準備と認証 {#setup}

すべての例は環境変数 ZAI_API_KEY を読み込みます。Python は標準ライブラリのみを使い、SDK は不要です。キーはサーバーに保管し、ブラウザーのコードに含めないでください。呼び出しは課金対象になるため、例では少量だけ生成します。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## パラメーターと制限 {#parameters}

以下は本プラットフォームでの最小構成です。全選択肢や上限値を示すものではありません。記載のない高度なパラメーターは本ガイドでは未検証です。他の提供元やモデルの制限を流用しないでください。

messages はロールとテキストの配列です。max_tokens は出力予算で、例では 256 です。stream の既定値は false、true の場合は SSE を [DONE] まで読みます。

## 完全な呼び出し例 {#example}


```python
import json
import os
import urllib.error
import urllib.request

BASE = "https://api.ourzai.com/v1"
KEY = os.environ["ZAI_API_KEY"]


def call(path, body=None, timeout=180):
    headers = {"Authorization": f"Bearer {KEY}"}
    data = None
    if body is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(body).encode("utf-8")
    request = urllib.request.Request(BASE + path, data=data, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.read()
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"HTTP {error.code}: {error.read().decode(errors='replace')}") from error


body = {"model": "claude-sonnet-5-5", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 256}
response = json.loads(call("/chat/completions", body))
print(response["choices"][0]["message"]["content"])
```

## ストリーミング対話 {#streaming}


```bash
curl --fail-with-body --no-buffer https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-5-5","messages":[{"role":"user","content":"Hello"}],"max_tokens":256,"stream":true}'
```

## 結果とエラー処理 {#results}

通常は choices[0].message.content、ストリーミングは choices[].delta.content を読みます。HTTP 200 の後でも SSE エラーや途中切断を処理してください。Responses のテキストは output[].content[] の output_text、Messages は content[] の text です。応答形式は互換ではありません。

この一覧は接続方法を示すもので、稼働状況ではありません。キーで利用できるモデルは GET /v1/models、料金はコンソールで確認してください。掲載モデルでも上流障害やクールダウン中は 502/503 になる場合があります。待機時間を増やして再試行してください。

## 関連ドキュメント {#related}

- [すべてのモデル](../models.md)
- [クイックスタート](../quickstart.md)
- [エラーと使用量](../errors.md)
