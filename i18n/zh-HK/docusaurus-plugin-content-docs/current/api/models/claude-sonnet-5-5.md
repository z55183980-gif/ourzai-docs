---
id: claude-sonnet-5-5
title: claude-sonnet-5-5 — 接入指南
description: claude-sonnet-5-5 — 接入指南
sidebar_position: 4
update_docs: none
---

# claude-sonnet-5-5 — 接入指南 {#integration}

model 使用本頁的精確 ID。只可呼叫下表列出的介面；未列出的介面不屬於此型號的接入範圍。

`model`: `claude-sonnet-5-5`

## 模型與介面 {#endpoints}

| 支援的介面 | HTTP |
|---|---|
| `chat.completions` | `POST /v1/chat/completions` |

## 準備與驗證 {#setup}

所有範例從環境變數讀取 ZAI_API_KEY。Python 範例使用標準函式庫，毋須安裝 SDK。金鑰只應存放於伺服器，不應放進瀏覽器程式。請求可能收費，範例只產生少量內容。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## 參數與限制 {#parameters}

以下為本平台的最小請求配置，並非所有可選值或最大限制。未列出的進階參數尚未由本指南驗證，請勿直接套用其他廠商或型號的參數表。

messages 是角色與文字陣列；max_tokens 限制輸出預算，範例為 256。stream 預設 false，設為 true 時按 SSE 讀取增量直到 [DONE]。

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


body = {"model": "claude-sonnet-5-5", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 256}
response = json.loads(call("/chat/completions", body))
print(response["choices"][0]["message"]["content"])
```

## 串流對話 {#streaming}


```bash
curl --fail-with-body --no-buffer https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-5-5","messages":[{"role":"user","content":"Hello"}],"max_tokens":256,"stream":true}'
```

## 結果與錯誤處理 {#results}

普通回應讀取 choices[0].message.content，串流讀取 choices[].delta.content。即使 HTTP 為 200，也須處理 SSE 錯誤及提前斷線。Responses 的文字位於 output[].content[] 的 output_text 項；Messages 的文字位於 content[] 的 text 項。不同協定的回應結構不可混用。

此目錄說明接入方式，不代表即時可用性。以 GET /v1/models 確認金鑰可見的模型，價格見控制台。已列出的模型仍可能因上游故障或冷卻回傳 502/503；請等待並以退避方式重試。

## 相關文件 {#related}

- [全部模型](../models.md)
- [快速開始](../quickstart.md)
- [錯誤與用量](../errors.md)
