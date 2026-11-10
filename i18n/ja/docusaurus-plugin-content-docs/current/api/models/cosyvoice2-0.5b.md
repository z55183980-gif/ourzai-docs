---
id: cosyvoice2-0.5b
title: cosyvoice2-0.5b — 接続ガイド
description: cosyvoice2-0.5b — 接続ガイド
sidebar_position: 14
update_docs: none
---

# cosyvoice2-0.5b — 接続ガイド {#integration}

model にはこのページの正確な ID を指定します。以下に記載されたエンドポイントのみが、このモデルの接続ガイドの対象です。

`model`: `cosyvoice2-0.5b`

## モデルとエンドポイント {#endpoints}

| 対応エンドポイント | HTTP |
|---|---|
| `audio.speech` | `POST /v1/audio/speech` |

## 準備と認証 {#setup}

すべての例は環境変数 ZAI_API_KEY を読み込みます。Python は標準ライブラリのみを使い、SDK は不要です。キーはサーバーに保管し、ブラウザーのコードに含めないでください。呼び出しは課金対象になるため、例では少量だけ生成します。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## パラメーターと制限 {#parameters}

以下は本プラットフォームでの最小構成です。全選択肢や上限値を示すものではありません。記載のない高度なパラメーターは本ガイドでは未検証です。他の提供元やモデルの制限を流用しないでください。

input は読み上げるテキストです。音声 ID は FunAudioLLM/CosyVoice2-0.5B:alex、response_format は mp3 を指定します。応答は JSON ではなく音声バイナリーです。この音声と形式のみ検証済みで、他の音声、速度、文字数上限は保証しません。

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


from pathlib import Path

audio = call(
    "/audio/speech",
    {
        "model": "cosyvoice2-0.5b",
        "input": "Hello. This is a speech test.",
        "voice": "FunAudioLLM/CosyVoice2-0.5B:alex",
        "response_format": "mp3",
    },
)
Path("speech.mp3").write_bytes(audio)
```

## 結果とエラー処理 {#results}

成功した応答を MP3 として保存します。短文でも時間がかかる場合があります。例のクライアントタイムアウト 180 秒は遅延の保証ではありません。非 2xx の場合はエラー本文を読み、JSON を音声として保存しないでください。

この一覧は接続方法を示すもので、稼働状況ではありません。キーで利用できるモデルは GET /v1/models、料金はコンソールで確認してください。掲載モデルでも上流障害やクールダウン中は 502/503 になる場合があります。待機時間を増やして再試行してください。

## 関連ドキュメント {#related}

- [すべてのモデル](../models.md)
- [クイックスタート](../quickstart.md)
- [エラーと使用量](../errors.md)
