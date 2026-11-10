---
id: gpt-image-2
title: gpt-image-2 — 接入指南
description: gpt-image-2 — 接入指南
sidebar_position: 6
update_docs: none
---

# gpt-image-2 — 接入指南 {#integration}

model 使用本頁的精確 ID。只可呼叫下表列出的介面；未列出的介面不屬於此型號的接入範圍。

`model`: `gpt-image-2`

## 模型與介面 {#endpoints}

| 支援的介面 | HTTP |
|---|---|
| `images.generations` | `POST /v1/images/generations` |
| `images.edits` | `POST /v1/images/edits` |

## 準備與驗證 {#setup}

所有範例從環境變數讀取 ZAI_API_KEY。Python 範例使用標準函式庫，毋須安裝 SDK。金鑰只應存放於伺服器，不應放進瀏覽器程式。請求可能收費，範例只產生少量內容。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## 參數與限制 {#parameters}

以下為本平台的最小請求配置，並非所有可選值或最大限制。未列出的進階參數尚未由本指南驗證，請勿直接套用其他廠商或型號的參數表。

model、prompt 必填。最小配置：n=1、size=1024x1024、response_format=b64_json。編輯使用 multipart/form-data，image 為本機 PNG，prompt 描述修改。範例使用一張參考圖；不承諾多圖上限、其他尺寸或 quality 值。

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
    "model": "gpt-image-2",
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
  -F 'model=gpt-image-2' \
  -F 'prompt=Change the mug to blue' \
  -F 'image=@input.png;type=image/png' \
  -F 'n=1' -F 'size=1024x1024' -F 'response_format=b64_json' \
  -o edited.json
```

```python
save_image(json.loads(Path("edited.json").read_text(encoding="utf-8")), "edited")
```

## 結果與錯誤處理 {#results}

data 陣列內可能包含 b64_json 或 url。範例解碼或下載後，按真實檔案標頭保存 PNG/JPEG，不能按請求格式猜副檔名。下載第三方圖片時不要傳送 ZAI_API_KEY。

此目錄說明接入方式，不代表即時可用性。以 GET /v1/models 確認金鑰可見的模型，價格見控制台。已列出的模型仍可能因上游故障或冷卻回傳 502/503；請等待並以退避方式重試。

## 相關文件 {#related}

- [全部模型](../models.md)
- [快速開始](../quickstart.md)
- [錯誤與用量](../errors.md)
