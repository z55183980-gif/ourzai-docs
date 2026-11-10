---
id: gpt-image-2.5-flare
title: gpt-image-2.5-flare — Integration guide
description: gpt-image-2.5-flare — Integration guide
sidebar_position: 7
update_docs: none
---

# gpt-image-2.5-flare — Integration guide {#integration}

Use the exact model ID shown on this page. Only the endpoints below are covered; unlisted endpoints are outside this model’s documented integration scope.

`model`: `gpt-image-2.5-flare`

## Models and endpoints {#endpoints}

| Supported endpoints | HTTP |
|---|---|
| `images.generations` | `POST /v1/images/generations` |
| `images.edits` | `POST /v1/images/edits` |

## Setup and authentication {#setup}

All examples read ZAI_API_KEY from the environment. Python examples use the standard library and require no SDK. Keep keys on your server, never in browser code. Requests may incur charges; the examples generate small outputs.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Parameters and boundaries {#parameters}

The configurations below are minimal requests for this platform, not an exhaustive list of values or maximum limits. Advanced parameters omitted here have not been verified for this guide. Do not copy parameter limits from another provider or model.

model and prompt are required. Minimal configuration: n=1, size=1024x1024, response_format=b64_json. Editing uses multipart/form-data with a local PNG in image and a prompt describing the change. This example uses one reference image; it does not promise multi-image limits, other sizes, or quality values.

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
    "model": "gpt-image-2.5-flare",
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
  -F 'model=gpt-image-2.5-flare' \
  -F 'prompt=Change the mug to blue' \
  -F 'image=@input.png;type=image/png' \
  -F 'n=1' -F 'size=1024x1024' -F 'response_format=b64_json' \
  -o edited.json
```

```python
save_image(json.loads(Path("edited.json").read_text(encoding="utf-8")), "edited")
```

## Results and error handling {#results}

The data array may contain b64_json or url. The example decodes or downloads the image and chooses PNG/JPEG from its actual signature. Do not infer the extension from the requested response format. Never send ZAI_API_KEY to a third-party image URL.

This catalog describes integration, not live availability. GET /v1/models lists models visible to your key; current prices are in the console. Listed models can still return 502/503 during upstream failures or cooldowns. Wait and retry with backoff.

## Related documentation {#related}

- [All models](../models.md)
- [Quickstart](../quickstart.md)
- [Errors and usage](../errors.md)
