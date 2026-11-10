---
id: gpt-6-astra
title: gpt-6-astra — Hướng dẫn tích hợp
description: gpt-6-astra — Hướng dẫn tích hợp
sidebar_position: 1
update_docs: none
---

# gpt-6-astra — Hướng dẫn tích hợp {#integration}

Dùng đúng ID trên trang này trong model. Chỉ các giao diện bên dưới thuộc phạm vi tích hợp được mô tả cho mô hình này.

`model`: `gpt-6-astra`

## Mô hình và giao diện {#endpoints}

| Giao diện được hỗ trợ | HTTP |
|---|---|
| `chat.completions` | `POST /v1/chat/completions` |
| `responses` | `POST /v1/responses` |

## Chuẩn bị và xác thực {#setup}

Mọi ví dụ đọc ZAI_API_KEY từ biến môi trường. Ví dụ Python chỉ dùng thư viện chuẩn, không cần SDK. Giữ khóa ở máy chủ, không đặt trong mã trình duyệt. Yêu cầu có thể tính phí; ví dụ chỉ tạo đầu ra nhỏ.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Tham số và giới hạn {#parameters}

Các cấu hình sau là yêu cầu tối thiểu trên nền tảng này, không phải toàn bộ giá trị hay giới hạn tối đa. Tham số nâng cao không được liệt kê chưa được xác minh trong hướng dẫn. Không sao chép giới hạn từ nhà cung cấp hoặc mô hình khác.

messages là mảng vai trò và văn bản. max_tokens đặt ngân sách đầu ra, ví dụ là 256. stream mặc định false; khi true, đọc SSE đến [DONE].

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


body = {"model": "gpt-6-astra", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 256}
response = json.loads(call("/chat/completions", body))
print(response["choices"][0]["message"]["content"])
```

## Hội thoại truyền luồng {#streaming}


```bash
curl --fail-with-body --no-buffer https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-6-astra","messages":[{"role":"user","content":"Hello"}],"max_tokens":256,"stream":true}'
```

## Giao thức khác được mở {#other-protocols}


```bash
curl --fail-with-body https://api.ourzai.com/v1/responses \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-6-astra","input":"Hello","max_output_tokens":256}'
```

## Kết quả và xử lý lỗi {#results}

Đọc choices[0].message.content, hoặc choices[].delta.content khi truyền luồng. Xử lý lỗi SSE và ngắt sớm ngay cả sau HTTP 200. Responses đặt văn bản trong mục output_text của output[].content[]; Messages dùng mục text trong content[]. Không dùng lẫn các định dạng này.

Danh mục mô tả cách tích hợp, không phản ánh trạng thái tức thời. GET /v1/models liệt kê mô hình mà khóa được phép dùng; xem giá tại bảng điều khiển. Mô hình đã liệt kê vẫn có thể trả 502/503 khi dịch vụ nguồn lỗi hoặc đang chờ phục hồi. Hãy thử lại với thời gian chờ tăng dần.

## Tài liệu liên quan {#related}

- [Tất cả mô hình](../models.md)
- [Bắt đầu nhanh](../quickstart.md)
- [Lỗi và mức sử dụng](../errors.md)
