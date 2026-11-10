---
id: grok-imagine-image-2.0
title: grok-imagine-image-2.0 — 接入指南
description: grok-imagine-image-2.0 — 接入指南
sidebar_position: 10
update_docs: none
---

# grok-imagine-image-2.0 — 接入指南 {#integration}

请求中的 model 使用本页的精确 ID。只能调用下表列出的接口；未列出的接口不在此型号的接入范围内。

`model`: `grok-imagine-image-2.0`

## 模型与接口 {#endpoints}

| 支持的接口 | HTTP |
|---|---|
| `images.generations` | `POST /v1/images/generations` |
| `images.edits` | `POST /v1/images/edits` |

## 准备与鉴权 {#setup}

所有示例从环境变量读取 ZAI_API_KEY。Python 示例使用标准库，无需安装 SDK。把密钥放在服务端，不要放入浏览器代码。请求可能计费，示例只生成少量内容。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## 参数与边界 {#parameters}

下面给出本平台的最小请求配置。示例值不是所有可选值或最大限制；未在此页列出的高级参数没有经过本指南验证，不应直接套用其他厂商或型号的参数表。

model、prompt 必填。最小配置：n=1、size=1024x1024、response_format=b64_json。编辑使用 multipart/form-data，image 为本地 PNG 文件，prompt 描述修改。示例为单张参考图；不在此承诺多图上限、其他尺寸或 quality 的取值。

## 完整调用示例 {#example}


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
    "model": "grok-imagine-image-2.0",
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
  -F 'model=grok-imagine-image-2.0' \
  -F 'prompt=Change the mug to blue' \
  -F 'image=@input.png;type=image/png' \
  -F 'n=1' -F 'size=1024x1024' -F 'response_format=b64_json' \
  -o edited.json
```

```python
save_image(json.loads(Path("edited.json").read_text(encoding="utf-8")), "edited")
```

## 返回与错误处理 {#results}

返回 data 数组，每项可能是 b64_json 或 url。示例解码或下载后按真实文件头保存 PNG/JPEG，不能仅按请求格式猜扩展名。下载第三方图片链接时不要发送 ZAI_API_KEY。

此目录说明接入方式，不代表实时可用性。用 GET /v1/models 确认 Key 可见的模型，价格见控制台「模型定价」。已列出的模型仍可能因上游故障或冷却暂时返回 502/503；等待并退避重试。

## 相关文档 {#related}

- [全部模型](../models.md)
- [快速开始](../quickstart.md)
- [错误与用量](../errors.md)
