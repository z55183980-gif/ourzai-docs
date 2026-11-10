---
id: cosyvoice2-0.5b
title: cosyvoice2-0.5b — 接入指南
description: cosyvoice2-0.5b — 接入指南
sidebar_position: 14
update_docs: none
---

# cosyvoice2-0.5b — 接入指南 {#integration}

model 使用本頁的精確 ID。只可呼叫下表列出的介面；未列出的介面不屬於此型號的接入範圍。

`model`: `cosyvoice2-0.5b`

## 模型與介面 {#endpoints}

| 支援的介面 | HTTP |
|---|---|
| `audio.speech` | `POST /v1/audio/speech` |

## 準備與驗證 {#setup}

所有範例從環境變數讀取 ZAI_API_KEY。Python 範例使用標準函式庫，毋須安裝 SDK。金鑰只應存放於伺服器，不應放進瀏覽器程式。請求可能收費，範例只產生少量內容。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## 參數與限制 {#parameters}

以下為本平台的最小請求配置，並非所有可選值或最大限制。未列出的進階參數尚未由本指南驗證，請勿直接套用其他廠商或型號的參數表。

input 是朗讀文字；voice 使用完整 ID FunAudioLLM/CosyVoice2-0.5B:alex；response_format=mp3。回應是音訊二進位資料，不是 JSON。本頁僅驗證此音色與格式，不承諾其他音色、語速或文字長度上限。

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

## 結果與錯誤處理 {#results}

成功後保存 MP3。短文字亦可能等候較久，範例使用 180 秒客戶端逾時，並非延遲保證。非 2xx 回應須讀取錯誤正文，不要把錯誤 JSON 當音訊儲存。

此目錄說明接入方式，不代表即時可用性。以 GET /v1/models 確認金鑰可見的模型，價格見控制台。已列出的模型仍可能因上游故障或冷卻回傳 502/503；請等待並以退避方式重試。

## 相關文件 {#related}

- [全部模型](../models.md)
- [快速開始](../quickstart.md)
- [錯誤與用量](../errors.md)
