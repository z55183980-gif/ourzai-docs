---
id: minimax-h3
title: minimax-h3 — Integration guide
description: minimax-h3 — Integration guide
sidebar_position: 15
update_docs: none
---

# minimax-h3 — Integration guide {#integration}

Use the exact model ID shown on this page. Only the endpoints below are covered; unlisted endpoints are outside this model’s documented integration scope.

`model`: `minimax-h3`

## Models and endpoints {#endpoints}

| Supported endpoints | HTTP |
|---|---|
| `videos.generations` | `POST /v1/videos/generations` |

## Setup and authentication {#setup}

All examples read ZAI_API_KEY from the environment. Python examples use the standard library and require no SDK. Keep keys on your server, never in browser code. Requests may incur charges; the examples generate small outputs.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Parameters and boundaries {#parameters}

The configurations below are minimal requests for this platform, not an exhaustive list of values or maximum limits. Advanced parameters omitted here have not been verified for this guide. Do not copy parameter limits from another provider or model.

Verified configuration: duration=5 seconds, resolution=768P, aspect_ratio=16:9 with a text prompt; a first-frame image (data URL or public https link) and two reference_images were also verified. resolution has a single tier, 768P; duration is an integer from 1 to 15; aspect_ratio is one of 21:9, 16:9, 4:3, 1:1, 3:4, 9:16. Output always carries an audio track; generate_audio is not accepted. First/last frames and reference_images cannot be combined in one request. Up to 9 reference_images; refer to them in the prompt as <Picture 1>, <Picture 2>… in array order (angle brackets, capital P, one space before the number; any other spelling is read as plain text). Frames take no number. prompt is at most 7,000 characters. last_frame and reference_audios are not verified on this page; seed, watermark and negative prompts are not supported.

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


import time
from pathlib import Path
from urllib.parse import quote

created = json.loads(
    call(
        "/videos/generations",
        {
            "model": "minimax-h3",
            "prompt": "A red mug on a table, slow camera movement",
            "duration": 5,
            "resolution": "768P",
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

## Results and error handling {#results}

Successful submission does not mean generation is complete. The example accepts request_id/id, polls pending → done, then downloads /content with the same key; video.url may be relative. failed/expired are terminal states; 409 means not ready. Keep download requests authenticated without sending the key to other domains. If a client times out, check an existing task before resubmitting to avoid duplicate charges.

This catalog describes integration, not live availability. GET /v1/models lists models visible to your key; current prices are in the console. Listed models can still return 502/503 during upstream failures or cooldowns. Wait and retry with backoff.

## Related documentation {#related}

- [All models](../models.md)
- [Quickstart](../quickstart.md)
- [Errors and usage](../errors.md)
