---
id: grok-imagine-video-1.5
title: grok-imagine-video-1.5 — 接続ガイド
description: grok-imagine-video-1.5 — 接続ガイド
sidebar_position: 13
update_docs: none
---

# grok-imagine-video-1.5 — 接続ガイド {#integration}

model にはこのページの正確な ID を指定します。以下に記載されたエンドポイントのみが、このモデルの接続ガイドの対象です。

`model`: `grok-imagine-video-1.5`

## モデルとエンドポイント {#endpoints}

| 対応エンドポイント | HTTP |
|---|---|
| `videos.generations` | `POST /v1/videos/generations` |

## 準備と認証 {#setup}

すべての例は環境変数 ZAI_API_KEY を読み込みます。Python は標準ライブラリのみを使い、SDK は不要です。キーはサーバーに保管し、ブラウザーのコードに含めないでください。呼び出しは課金対象になるため、例では少量だけ生成します。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## パラメーターと制限 {#parameters}

以下は本プラットフォームでの最小構成です。全選択肢や上限値を示すものではありません。記載のない高度なパラメーターは本ガイドでは未検証です。他の提供元やモデルの制限を流用しないでください。

検証済み構成は duration=6 秒、resolution=480p、aspect_ratio=16:9、テキストのみの prompt です。duration は整数です。開始・終了フレーム、reference_images、reference_audios、generate_audio、seed、watermark は本ページでは未検証です。他モデルから対応を推測しないでください。両 Grok 動画モデルは同じ手順ですが、ID と料金は別です。

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


import time
from pathlib import Path
from urllib.parse import quote

created = json.loads(
    call(
        "/videos/generations",
        {
            "model": "grok-imagine-video-1.5",
            "prompt": "A red mug on a table, slow camera movement",
            "duration": 6,
            "resolution": "480p",
            "aspect_ratio": "16:9",
        },
    )
)
task_id = created.get("request_id") or created.get("id")
if not task_id:
    raise RuntimeError(created)
print("task_id:", task_id, flush=True)
path = "/videos/" + quote(task_id, safe="")
deadline = time.monotonic() + 600
while time.monotonic() < deadline:
    status = json.loads(call(path))
    if status.get("status") == "done":
        Path("result.mp4").write_bytes(call(path + "/content"))
        break
    if status.get("status") in ("failed", "expired"):
        raise RuntimeError(status)
    time.sleep(5)
else:
    raise TimeoutError(f"Keep task ID {task_id} and query its status later")
```

## 結果とエラー処理 {#results}

受付成功は動画完成を意味しません。例は request_id/id に対応し、pending → done を確認してから同じキーで /content を取得します。video.url は相対パスの場合があります。failed/expired は終了状態、409 は未完成です。他ドメインにキーを送らないでください。タイムアウト時は重複課金を避けるため、再送前に既存タスクを確認します。

この一覧は接続方法を示すもので、稼働状況ではありません。キーで利用できるモデルは GET /v1/models、料金はコンソールで確認してください。掲載モデルでも上流障害やクールダウン中は 502/503 になる場合があります。待機時間を増やして再試行してください。

## 関連ドキュメント {#related}

- [すべてのモデル](../models.md)
- [クイックスタート](../quickstart.md)
- [エラーと使用量](../errors.md)
