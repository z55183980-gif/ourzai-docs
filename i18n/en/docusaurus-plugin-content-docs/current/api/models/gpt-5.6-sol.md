---
id: gpt-5.6-sol
title: gpt-5.6-sol — Integration guide
description: gpt-5.6-sol — Integration guide
sidebar_position: 3
update_docs: none
---

# gpt-5.6-sol — Integration guide {#integration}

Use the exact model ID shown on this page. Only the endpoints below are covered; unlisted endpoints are outside this model’s documented integration scope.

`model`: `gpt-5.6-sol`

## Models and endpoints {#endpoints}

| Supported endpoints | HTTP |
|---|---|
| `chat.completions` | `POST /v1/chat/completions` |

## Setup and authentication {#setup}

All examples read ZAI_API_KEY from the environment. Python examples use the standard library and require no SDK. Keep keys on your server, never in browser code. Requests may incur charges; the examples generate small outputs.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Parameters and boundaries {#parameters}

The configurations below are minimal requests for this platform, not an exhaustive list of values or maximum limits. Advanced parameters omitted here have not been verified for this guide. Do not copy parameter limits from another provider or model.

messages is an array of roles and text. max_tokens sets the output budget; the example uses 256. stream defaults to false; with true, consume SSE deltas until [DONE].

## Complete request example {#example}


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


body = {"model": "gpt-5.6-sol", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 256}
response = json.loads(call("/chat/completions", body))
print(response["choices"][0]["message"]["content"])
```

## Streaming chat {#streaming}


```bash
curl --fail-with-body --no-buffer https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-5.6-sol","messages":[{"role":"user","content":"Hello"}],"max_tokens":256,"stream":true}'
```

## Results and error handling {#results}

For ordinary responses, read choices[0].message.content; for streaming, read choices[].delta.content. Handle SSE error events and premature disconnects even after HTTP 200. Responses text appears in output[].content[] items of type output_text; Messages text appears in content[] items of type text. These response formats are not interchangeable.

This catalog describes integration, not live availability. GET /v1/models lists models visible to your key; current prices are in the console. Listed models can still return 502/503 during upstream failures or cooldowns. Wait and retry with backoff.

## Related documentation {#related}

- [All models](../models.md)
- [Quickstart](../quickstart.md)
- [Errors and usage](../errors.md)
