---
id: grok-imagine-image-quality
title: grok-imagine-image-quality — 接続ガイド
description: grok-imagine-image-quality — 接続ガイド
sidebar_position: 11
update_docs: none
---

# grok-imagine-image-quality — 接続ガイド {#integration}

model にはこのページの正確な ID を指定します。以下に記載されたエンドポイントのみが、このモデルの接続ガイドの対象です。

`model`: `grok-imagine-image-quality`

## モデルとエンドポイント {#endpoints}

| 対応エンドポイント | HTTP |
|---|---|
| `images.generations` | `POST /v1/images/generations` |
| `images.edits` | `POST /v1/images/edits` |

## 準備と認証 {#setup}

すべての例は環境変数 ZAI_API_KEY を読み込みます。Python は標準ライブラリのみを使い、SDK は不要です。キーはサーバーに保管し、ブラウザーのコードに含めないでください。呼び出しは課金対象になるため、例では少量だけ生成します。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## パラメーターと制限 {#parameters}

以下は本プラットフォームでの最小構成です。全選択肢や上限値を示すものではありません。記載のない高度なパラメーターは本ガイドでは未検証です。他の提供元やモデルの制限を流用しないでください。

model と prompt は必須です。最小構成は n=1、size=1024x1024、response_format=b64_json。編集は multipart/form-data で、image にローカル PNG、prompt に変更内容を指定します。参照画像は 1 枚の例です。複数画像の上限、他のサイズ、quality の値は保証しません。

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


import base64
from pathlib import Path
from urllib.parse import urlsplit


def save_image(response, name):
    item = response["data"][0]
    if item.get("b64_json"):
        data = base64.b64decode(item["b64_json"])
    else:
        url = item["url"]
        if url.startswith("data:"):
            data = base64.b64decode(url.split(",", 1)[1])
        else:
            if urlsplit(url).scheme != "https":
                raise ValueError("Expected an HTTPS image URL")
            with urllib.request.urlopen(url, timeout=180) as response:
                data = response.read()
    suffix = ".png" if data.startswith(b"\x89PNG") else ".jpg" if data.startswith(b"\xff\xd8") else None
    if suffix is None:
        raise ValueError("Unexpected image format")
    Path(name + suffix).write_bytes(data)


body = {
    "model": "grok-imagine-image-quality",
    "prompt": "A red mug on a white table",
    "n": 1,
    "size": "1024x1024",
    "response_format": "b64_json",
}
save_image(json.loads(call("/images/generations", body, timeout=240)), "generated")
```

### `/images/edits` {#edits}

```bash
curl --fail-with-body https://api.ourzai.com/v1/images/edits \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -F 'model=grok-imagine-image-quality' \
  -F 'prompt=Change the mug to blue' \
  -F 'image=@input.png;type=image/png' \
  -F 'n=1' -F 'size=1024x1024' -F 'response_format=b64_json' \
  -o edited.json
```

```python
save_image(json.loads(Path("edited.json").read_text(encoding="utf-8")), "edited")
```

## 結果とエラー処理 {#results}

data 配列には b64_json または url が入ります。例は復号またはダウンロード後、実際のファイル署名で PNG/JPEG を判別します。第三者の画像 URL に ZAI_API_KEY を送信しないでください。

この一覧は接続方法を示すもので、稼働状況ではありません。キーで利用できるモデルは GET /v1/models、料金はコンソールで確認してください。掲載モデルでも上流障害やクールダウン中は 502/503 になる場合があります。待機時間を増やして再試行してください。

## 関連ドキュメント {#related}

- [すべてのモデル](../models.md)
- [クイックスタート](../quickstart.md)
- [エラーと使用量](../errors.md)
