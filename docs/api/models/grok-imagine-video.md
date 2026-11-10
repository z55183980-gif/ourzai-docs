---
id: grok-imagine-video
title: grok-imagine-video — 接入指南
description: grok-imagine-video — 接入指南
sidebar_position: 12
update_docs: none
---

# grok-imagine-video — 接入指南 {#integration}

请求中的 model 使用本页的精确 ID。只能调用下表列出的接口；未列出的接口不在此型号的接入范围内。

`model`: `grok-imagine-video`

## 模型与接口 {#endpoints}

| 支持的接口 | HTTP |
|---|---|
| `videos.generations` | `POST /v1/videos/generations` |

## 准备与鉴权 {#setup}

所有示例从环境变量读取 ZAI_API_KEY。Python 示例使用标准库，无需安装 SDK。把密钥放在服务端，不要放入浏览器代码。请求可能计费，示例只生成少量内容。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## 参数与边界 {#parameters}

下面给出本平台的最小请求配置。示例值不是所有可选值或最大限制；未在此页列出的高级参数没有经过本指南验证，不应直接套用其他厂商或型号的参数表。

已验证配置：duration=6（秒）、resolution=480p、aspect_ratio=16:9，纯文本 prompt。duration 使用整数。首尾帧、reference_images、reference_audios、generate_audio、seed、watermark 不在本页已验证参数范围内，不能从其他视频模型推断支持。两种 Grok 视频型号均使用本页流程，但型号与计价分别独立。

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

## 返回与错误处理 {#results}

提交成功不代表视频已完成。示例兼容 request_id/id，轮询 pending → done，再使用同一 Key 请求 /content；video.url 可能为相对路径。failed/expired 为终态，不应继续轮询；409 表示尚未完成。下载接口保持鉴权，不把 Key 发送到其他域名。生成失败或客户端超时时，已有任务应先查询状态，避免重复提交计费。

此目录说明接入方式，不代表实时可用性。用 GET /v1/models 确认 Key 可见的模型，价格见控制台「模型定价」。已列出的模型仍可能因上游故障或冷却暂时返回 502/503；等待并退避重试。

## 相关文档 {#related}

- [全部模型](../models.md)
- [快速开始](../quickstart.md)
- [错误与用量](../errors.md)
