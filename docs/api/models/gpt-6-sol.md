---
id: gpt-6-sol
title: gpt-6-sol — 接入指南
description: gpt-6-sol — 接入指南
sidebar_position: 2
update_docs: none
---

# gpt-6-sol — 接入指南 {#integration}

请求中的 model 使用本页的精确 ID。只能调用下表列出的接口；未列出的接口不在此型号的接入范围内。

`model`: `gpt-6-sol`

## 模型与接口 {#endpoints}

| 支持的接口 | HTTP |
|---|---|
| `chat.completions` | `POST /v1/chat/completions` |
| `responses` | `POST /v1/responses` |

## 准备与鉴权 {#setup}

所有示例从环境变量读取 ZAI_API_KEY。Python 示例使用标准库，无需安装 SDK。把密钥放在服务端，不要放入浏览器代码。请求可能计费，示例只生成少量内容。

```bash
export ZAI_API_KEY="<your-api-key>"
```

## 参数与边界 {#parameters}

下面给出本平台的最小请求配置。示例值不是所有可选值或最大限制；未在此页列出的高级参数没有经过本指南验证，不应直接套用其他厂商或型号的参数表。

messages 为角色与文本的数组；max_tokens 限制输出预算，示例为 256；stream 默认为 false，设为 true 时按 SSE 读取增量，直到 [DONE]。

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


body = {"model": "gpt-6-sol", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 256}
response = json.loads(call("/chat/completions", body))
print(response["choices"][0]["message"]["content"])
```

## 流式对话 {#streaming}


```bash
curl --fail-with-body --no-buffer https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-6-sol","messages":[{"role":"user","content":"Hello"}],"max_tokens":256,"stream":true}'
```

## 其他开放协议 {#other-protocols}


```bash
curl --fail-with-body https://api.ourzai.com/v1/responses \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-6-sol","input":"Hello","max_output_tokens":256}'
```

## 返回与错误处理 {#results}

普通响应读取 choices[0].message.content；流式读取 choices[].delta.content。即使 HTTP 为 200，也应处理 SSE 中的错误事件及提前断流。Responses 的文本在 output[].content[] 的 output_text 项中；Messages 的文本在 content[] 的 text 项中。不同协议的响应结构不能混用。

此目录说明接入方式，不代表实时可用性。用 GET /v1/models 确认 Key 可见的模型，价格见控制台「模型定价」。已列出的模型仍可能因上游故障或冷却暂时返回 502/503；等待并退避重试。

## 相关文档 {#related}

- [全部模型](../models.md)
- [快速开始](../quickstart.md)
- [错误与用量](../errors.md)
