---
id: grok-imagine-image-2.0
title: grok-imagine-image-2.0 — Hướng dẫn tích hợp
description: grok-imagine-image-2.0 — Hướng dẫn tích hợp
sidebar_position: 10
update_docs: none
---

# grok-imagine-image-2.0 — Hướng dẫn tích hợp {#integration}

Dùng đúng ID trên trang này trong model. Chỉ các giao diện bên dưới thuộc phạm vi tích hợp được mô tả cho mô hình này.

`model`: `grok-imagine-image-2.0`

## Mô hình và giao diện {#endpoints}

| Giao diện được hỗ trợ | HTTP |
|---|---|
| `images.generations` | `POST /v1/images/generations` |
| `images.edits` | `POST /v1/images/edits` |

## Chuẩn bị và xác thực {#setup}

Mọi ví dụ đọc ZAI_API_KEY từ biến môi trường. Ví dụ Python chỉ dùng thư viện chuẩn, không cần SDK. Giữ khóa ở máy chủ, không đặt trong mã trình duyệt. Yêu cầu có thể tính phí; ví dụ chỉ tạo đầu ra nhỏ.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Tham số và giới hạn {#parameters}

Các cấu hình sau là yêu cầu tối thiểu trên nền tảng này, không phải toàn bộ giá trị hay giới hạn tối đa. Tham số nâng cao không được liệt kê chưa được xác minh trong hướng dẫn. Không sao chép giới hạn từ nhà cung cấp hoặc mô hình khác.

Bắt buộc model và prompt. Cấu hình tối thiểu: n=1, size=1024x1024, response_format=b64_json. Chỉnh sửa dùng multipart/form-data với PNG cục bộ trong image và mô tả thay đổi trong prompt. Ví dụ dùng một ảnh; không cam kết giới hạn nhiều ảnh, kích thước khác hay giá trị quality.

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

## Kết quả và xử lý lỗi {#results}

Mảng data có thể chứa b64_json hoặc url. Ví dụ giải mã hoặc tải ảnh rồi chọn PNG/JPEG theo chữ ký tệp thực tế. Không gửi ZAI_API_KEY đến URL ảnh của bên thứ ba.

Danh mục mô tả cách tích hợp, không phản ánh trạng thái tức thời. GET /v1/models liệt kê mô hình mà khóa được phép dùng; xem giá tại bảng điều khiển. Mô hình đã liệt kê vẫn có thể trả 502/503 khi dịch vụ nguồn lỗi hoặc đang chờ phục hồi. Hãy thử lại với thời gian chờ tăng dần.

## Tài liệu liên quan {#related}

- [Tất cả mô hình](../models.md)
- [Bắt đầu nhanh](../quickstart.md)
- [Lỗi và mức sử dụng](../errors.md)
