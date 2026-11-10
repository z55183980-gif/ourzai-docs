---
id: cosyvoice2-0.5b
title: cosyvoice2-0.5b — 接入指南
description: cosyvoice2-0.5b — 接入指南
sidebar_position: 14
update_docs: none
---

# cosyvoice2-0.5b — 接入指南 {#integration}

请求中的 model 使用本页的精确 ID。只能调用下表列出的接口；未列出的接口不在此型号的接入范围内。

`model`: `cosyvoice2-0.5b`

## 模型与接口 {#endpoints}

| 支持的接口 | HTTP |
|---|---|
| `audio.speech` | `POST /v1/audio/speech` |

## 准备与鉴权 {#setup}

所有示例从环境变量读取 ZAI_API_KEY。Python 示例使用标准库，无需安装 SDK。把密钥放在服务端，不要放入浏览器代码。请求可能计费，示例只生成少量内容。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## 参数与边界 {#parameters}

下面给出本平台的最小请求配置。示例值不是所有可选值或最大限制；未在此页列出的高级参数没有经过本指南验证，不应直接套用其他厂商或型号的参数表。

input 是待朗读文本；voice 使用完整音色 ID FunAudioLLM/CosyVoice2-0.5B:alex；response_format=mp3。响应是音频二进制，不是 JSON。此页仅验证这个音色和格式；其他音色、语速、文本长度上限尚未在此列为支持承诺。

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

## 返回与错误处理 {#results}

成功后保存 MP3。短文本也可能需要较长等待，示例设置 180 秒客户端超时；这不是延迟保证。非 2xx 响应应读取错误正文，不要把错误 JSON 保存成音频。

此目录说明接入方式，不代表实时可用性。用 GET /v1/models 确认 Key 可见的模型，价格见控制台「模型定价」。已列出的模型仍可能因上游故障或冷却暂时返回 502/503；等待并退避重试。

## 相关文档 {#related}

- [全部模型](../models.md)
- [快速开始](../quickstart.md)
- [错误与用量](../errors.md)
