---
id: grok-imagine-video
title: grok-imagine-video — 接入指南
description: grok-imagine-video — 接入指南
sidebar_position: 12
update_docs: none
---

# grok-imagine-video — 接入指南 {#integration}

model 使用本頁的精確 ID。只可呼叫下表列出的介面；未列出的介面不屬於此型號的接入範圍。

`model`: `grok-imagine-video`

## 模型與介面 {#endpoints}

| 支援的介面 | HTTP |
|---|---|
| `videos.generations` | `POST /v1/videos/generations` |

## 準備與驗證 {#setup}

所有範例從環境變數讀取 ZAI_API_KEY。Python 範例使用標準函式庫，毋須安裝 SDK。金鑰只應存放於伺服器，不應放進瀏覽器程式。請求可能收費，範例只產生少量內容。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## 參數與限制 {#parameters}

以下為本平台的最小請求配置，並非所有可選值或最大限制。未列出的進階參數尚未由本指南驗證，請勿直接套用其他廠商或型號的參數表。

已驗證配置：duration=6 秒、resolution=480p、aspect_ratio=16:9，以及純文字 prompt。duration 使用整數。首尾幀、reference_images、reference_audios、generate_audio、seed、watermark 不在本頁已驗證範圍，不可由其他模型推斷支援。兩款 Grok 影片模型流程相同，型號及計價各自獨立。

## 完整呼叫範例 {#example}


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
            "model": "grok-imagine-video",
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

## 結果與錯誤處理 {#results}

提交成功不表示影片已完成。範例兼容 request_id/id，輪詢 pending → done，再以同一金鑰下載 /content；video.url 可能是相對路徑。failed/expired 為終態；409 表示尚未完成。下載須保留驗證，但不可將金鑰送至其他網域。客戶端逾時後先查詢既有任務，避免重複提交收費。

此目錄說明接入方式，不代表即時可用性。以 GET /v1/models 確認金鑰可見的模型，價格見控制台。已列出的模型仍可能因上游故障或冷卻回傳 502/503；請等待並以退避方式重試。

## 相關文件 {#related}

- [全部模型](../models.md)
- [快速開始](../quickstart.md)
- [錯誤與用量](../errors.md)
