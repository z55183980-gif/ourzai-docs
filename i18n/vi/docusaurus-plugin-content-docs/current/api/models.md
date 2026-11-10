---
id: models
title: Danh mục và tích hợp mô hình
description: Danh mục và tích hợp mô hình
sidebar_position: 4
update_docs: none
---

# Danh mục và tích hợp mô hình {#models}

Chọn mô hình để xem giao diện được mở và ví dụ yêu cầu đầy đủ. Dùng chính xác ID; các mô hình cùng nhà cung cấp không nhất thiết hỗ trợ cùng giao diện.

Danh mục mô tả cách tích hợp, không phản ánh trạng thái tức thời. GET /v1/models liệt kê mô hình mà khóa được phép dùng; xem giá tại bảng điều khiển. Mô hình đã liệt kê vẫn có thể trả 502/503 khi dịch vụ nguồn lỗi hoặc đang chờ phục hồi. Hãy thử lại với thời gian chờ tăng dần.

## Mô hình và giao diện {#matrix}

| Mô hình | Loại | Giao diện được hỗ trợ |
|---|---|---|
| [gpt-6-astra](./models/gpt-6-astra.md) | Hội thoại | `chat.completions`, `responses` |
| [gpt-6-sol](./models/gpt-6-sol.md) | Hội thoại | `chat.completions`, `responses` |
| [gpt-5.6-sol](./models/gpt-5.6-sol.md) | Hội thoại | `chat.completions` |
| [claude-sonnet-5-5](./models/claude-sonnet-5-5.md) | Hội thoại | `chat.completions` |
| [claude-opus-5-5](./models/claude-opus-5-5.md) | Hội thoại | `chat.completions`, `messages`, `messages.count_tokens` |
| [gpt-image-2](./models/gpt-image-2.md) | Hình ảnh | `images.generations`, `images.edits` |
| [gpt-image-2.5-flare](./models/gpt-image-2.5-flare.md) | Hình ảnh | `images.generations`, `images.edits` |
| [gpt-image-2.5-sunburst](./models/gpt-image-2.5-sunburst.md) | Hình ảnh | `images.generations`, `images.edits` |
| [grok-imagine-image](./models/grok-imagine-image.md) | Hình ảnh | `images.generations`, `images.edits` |
| [grok-imagine-image-2.0](./models/grok-imagine-image-2.0.md) | Hình ảnh | `images.generations`, `images.edits` |
| [grok-imagine-image-quality](./models/grok-imagine-image-quality.md) | Hình ảnh | `images.generations`, `images.edits` |
| [grok-imagine-video](./models/grok-imagine-video.md) | Video | `videos.generations` |
| [grok-imagine-video-1.5](./models/grok-imagine-video-1.5.md) | Video | `videos.generations` |
| [minimax-h3](./models/minimax-h3.md) | Video | `videos.generations` |
| [cosyvoice2-0.5b](./models/cosyvoice2-0.5b.md) | Giọng nói | `audio.speech` |

## Lấy danh sách mô hình hiện tại {#live-models}


```bash
curl --fail-with-body https://api.ourzai.com/v1/models \
  -H "Authorization: Bearer $ZAI_API_KEY"
```

## Tài liệu liên quan {#related}

- [Bắt đầu nhanh](./quickstart.md)
- [Lỗi và mức sử dụng](./errors.md)
