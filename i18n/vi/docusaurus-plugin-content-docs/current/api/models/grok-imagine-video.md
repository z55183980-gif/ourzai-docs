---
id: grok-imagine-video
title: grok-imagine-video — Hướng dẫn tích hợp
description: grok-imagine-video — Hướng dẫn tích hợp
sidebar_position: 12
update_docs: none
---

# grok-imagine-video — Hướng dẫn tích hợp {#integration}

Dùng đúng ID trên trang này trong model. Chỉ các giao diện bên dưới thuộc phạm vi tích hợp được mô tả cho mô hình này.

`model`: `grok-imagine-video`

## Mô hình và giao diện {#endpoints}

| Giao diện được hỗ trợ | HTTP |
|---|---|
| `videos.generations` | `POST /v1/videos/generations` |

## Chuẩn bị và xác thực {#setup}

Mọi ví dụ đọc ZAI_API_KEY từ biến môi trường. Ví dụ Python chỉ dùng thư viện chuẩn, không cần SDK. Giữ khóa ở máy chủ, không đặt trong mã trình duyệt. Yêu cầu có thể tính phí; ví dụ chỉ tạo đầu ra nhỏ.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Tham số và giới hạn {#parameters}

Các cấu hình sau là yêu cầu tối thiểu trên nền tảng này, không phải toàn bộ giá trị hay giới hạn tối đa. Tham số nâng cao không được liệt kê chưa được xác minh trong hướng dẫn. Không sao chép giới hạn từ nhà cung cấp hoặc mô hình khác.

Cấu hình đã xác minh: duration=6 giây, resolution=480p, aspect_ratio=16:9 và prompt chỉ có văn bản. duration là số nguyên. Khung đầu/cuối, reference_images, reference_audios, generate_audio, seed và watermark chưa được xác minh ở đây. Không suy ra hỗ trợ từ mô hình khác. Hai mô hình video Grok dùng cùng quy trình nhưng ID và giá riêng.

## Ví dụ gọi đầy đủ {#example}


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

## Kết quả và xử lý lỗi {#results}

Gửi thành công chưa có nghĩa video đã xong. Ví dụ nhận request_id/id, kiểm tra pending → done rồi tải /content bằng cùng khóa; video.url có thể là đường dẫn tương đối. failed/expired là trạng thái kết thúc; 409 là chưa sẵn sàng. Không gửi khóa đến miền khác. Nếu hết thời gian chờ, kiểm tra tác vụ hiện có trước khi gửi lại để tránh tính phí trùng.

Danh mục mô tả cách tích hợp, không phản ánh trạng thái tức thời. GET /v1/models liệt kê mô hình mà khóa được phép dùng; xem giá tại bảng điều khiển. Mô hình đã liệt kê vẫn có thể trả 502/503 khi dịch vụ nguồn lỗi hoặc đang chờ phục hồi. Hãy thử lại với thời gian chờ tăng dần.

## Tài liệu liên quan {#related}

- [Tất cả mô hình](../models.md)
- [Bắt đầu nhanh](../quickstart.md)
- [Lỗi và mức sử dụng](../errors.md)
