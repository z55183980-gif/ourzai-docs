---
id: cosyvoice2-0.5b
title: cosyvoice2-0.5b — Hướng dẫn tích hợp
description: cosyvoice2-0.5b — Hướng dẫn tích hợp
sidebar_position: 14
update_docs: none
---

# cosyvoice2-0.5b — Hướng dẫn tích hợp {#integration}

Dùng đúng ID trên trang này trong model. Chỉ các giao diện bên dưới thuộc phạm vi tích hợp được mô tả cho mô hình này.

`model`: `cosyvoice2-0.5b`

## Mô hình và giao diện {#endpoints}

| Giao diện được hỗ trợ | HTTP |
|---|---|
| `audio.speech` | `POST /v1/audio/speech` |

## Chuẩn bị và xác thực {#setup}

Mọi ví dụ đọc ZAI_API_KEY từ biến môi trường. Ví dụ Python chỉ dùng thư viện chuẩn, không cần SDK. Giữ khóa ở máy chủ, không đặt trong mã trình duyệt. Yêu cầu có thể tính phí; ví dụ chỉ tạo đầu ra nhỏ.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Tham số và giới hạn {#parameters}

Các cấu hình sau là yêu cầu tối thiểu trên nền tảng này, không phải toàn bộ giá trị hay giới hạn tối đa. Tham số nâng cao không được liệt kê chưa được xác minh trong hướng dẫn. Không sao chép giới hạn từ nhà cung cấp hoặc mô hình khác.

input chứa văn bản. Dùng ID giọng đầy đủ FunAudioLLM/CosyVoice2-0.5B:alex và response_format=mp3. Phản hồi là âm thanh nhị phân, không phải JSON. Chỉ giọng và định dạng này đã được xác minh; chưa cam kết giọng khác, tốc độ hoặc độ dài văn bản tối đa.

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

## Kết quả và xử lý lỗi {#results}

Lưu phản hồi thành công dưới dạng MP3. Văn bản ngắn cũng có thể mất thời gian; giới hạn chờ 180 giây phía máy khách không bảo đảm độ trễ. Đọc nội dung lỗi của phản hồi không phải 2xx, không lưu JSON lỗi thành âm thanh.

Danh mục mô tả cách tích hợp, không phản ánh trạng thái tức thời. GET /v1/models liệt kê mô hình mà khóa được phép dùng; xem giá tại bảng điều khiển. Mô hình đã liệt kê vẫn có thể trả 502/503 khi dịch vụ nguồn lỗi hoặc đang chờ phục hồi. Hãy thử lại với thời gian chờ tăng dần.

## Tài liệu liên quan {#related}

- [Tất cả mô hình](../models.md)
- [Bắt đầu nhanh](../quickstart.md)
- [Lỗi và mức sử dụng](../errors.md)
