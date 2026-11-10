---
id: cosyvoice2-0.5b
title: cosyvoice2-0.5b — Integration guide
description: cosyvoice2-0.5b — Integration guide
sidebar_position: 14
update_docs: none
---

# cosyvoice2-0.5b — Integration guide {#integration}

Use the exact model ID shown on this page. Only the endpoints below are covered; unlisted endpoints are outside this model’s documented integration scope.

`model`: `cosyvoice2-0.5b`

## Models and endpoints {#endpoints}

| Supported endpoints | HTTP |
|---|---|
| `audio.speech` | `POST /v1/audio/speech` |

## Setup and authentication {#setup}

All examples read ZAI_API_KEY from the environment. Python examples use the standard library and require no SDK. Keep keys on your server, never in browser code. Requests may incur charges; the examples generate small outputs.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Parameters and boundaries {#parameters}

The configurations below are minimal requests for this platform, not an exhaustive list of values or maximum limits. Advanced parameters omitted here have not been verified for this guide. Do not copy parameter limits from another provider or model.

input contains the text. Use the full voice ID FunAudioLLM/CosyVoice2-0.5B:alex and response_format=mp3. The response is binary audio, not JSON. Only this voice and format are verified here; other voices, speed settings, and text-length limits are not promised by this page.

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

## Results and error handling {#results}

Save the successful response as MP3. Even short text may take time; the example uses a 180-second client timeout, not a latency guarantee. Read error bodies for non-2xx responses instead of saving error JSON as audio.

This catalog describes integration, not live availability. GET /v1/models lists models visible to your key; current prices are in the console. Listed models can still return 502/503 during upstream failures or cooldowns. Wait and retry with backoff.

## Related documentation {#related}

- [All models](../models.md)
- [Quickstart](../quickstart.md)
- [Errors and usage](../errors.md)
