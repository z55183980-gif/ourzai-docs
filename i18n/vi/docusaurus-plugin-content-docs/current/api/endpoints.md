---
id: endpoints
title: Giao diện và Khả năng
description: Các giao diện chat, vector, hình ảnh, âm thanh và video do api.ourzai.com cung cấp, bao gồm quy trình gửi, truy vấn và tải xuống tác vụ video.
sidebar_position: 2
update_docs: none
---

# Giao diện và Khả năng {#endpoints}

Các giao diện được liệt kê trong tài liệu này nằm tại `https://api.ourzai.com/v1/` và hỗ trợ cả định dạng tương thích OpenAI lẫn Anthropic. Xem [Bắt đầu nhanh với API](./quickstart.md#get-key) để biết chi tiết xác thực.

## Mô hình nào có thể dùng giao diện nào? {#model-endpoints}

Các mô hình khác nhau hỗ trợ các giao diện khác nhau: mô hình chat không thể tạo hình ảnh, còn mô hình tạo video không thể trò chuyện. Trang **Pricing** trên console cho biết từng mô hình hỗ trợ giao diện nào, vì vậy bạn hãy xác nhận điều này trước khi gọi. Việc dùng giao diện mà mô hình không hỗ trợ, hoặc gọi mô hình mà tài khoản của bạn không được phép dùng, sẽ trả về lỗi 404.

## Xác thực {#authentication}

Truyền API key của bạn bằng một trong các cách sau:

- `Authorization: Bearer <YOUR_API_KEY>` (khuyến nghị; dùng cách này cho mọi giao diện tương thích OpenAI);
- `x-api-key: <YOUR_API_KEY>` (cách dùng của Anthropic SDK);
- `x-goog-api-key: <YOUR_API_KEY>` (cũng có thể dùng để truyền key; điều này không hàm ý hỗ trợ giao diện Gemini gốc).

Không đặt key vào tham số truy vấn URL (ví dụ: `?api_key=`); những yêu cầu như vậy sẽ bị từ chối.

## Văn bản {#text}

| Phương thức và Đường dẫn | Mục đích |
| --- | --- |
| `POST /v1/chat/completions` | Hoàn thành chat, tương thích OpenAI, hỗ trợ truyền phát qua `stream` |
| `POST /v1/responses` | Giao diện Responses của OpenAI |
| `POST /v1/messages` | Tương thích Anthropic Messages |
| `POST /v1/messages/count_tokens` | Tính số token cho yêu cầu theo định dạng Anthropic |
| `POST /v1/embeddings` | Vector văn bản; chỉ một số mô hình hỗ trợ |
| `GET /v1/models` | Danh sách mô hình |

## Hình ảnh {#images}

| Phương thức và Đường dẫn | Mục đích |
| --- | --- |
| `POST /v1/images/generations` | Văn bản thành hình ảnh, tương thích OpenAI |
| `POST /v1/images/edits` | Hình ảnh thành hình ảnh và chỉnh sửa hình ảnh, tương thích OpenAI |

Giao diện hình ảnh trả kết quả đồng bộ.

## Âm thanh {#audio}

| Phương thức và Đường dẫn | Mục đích |
| --- | --- |
| `POST /v1/audio/speech` | Văn bản thành giọng nói, tương thích OpenAI |
| `POST /v1/audio/transcriptions` | Giọng nói thành văn bản, tương thích OpenAI |

Phản hồi có thể bao gồm `X-Zai-Audio-Duration-Ms` (thời lượng âm thanh tính bằng mili-giây) hoặc `X-Zai-Audio-Confidence` (độ tin cậy phiên âm), tùy thuộc vào mô hình được dùng.

## Tạo video {#video}

Việc tạo video diễn ra không đồng bộ: trước tiên gửi một tác vụ để nhận `request_id`, sau đó kiểm tra trạng thái định kỳ, và tải kết quả xuống khi video đã sẵn sàng.

| Phương thức và Đường dẫn | Mục đích |
| --- | --- |
| `POST /v1/videos/generations` | Gửi tác vụ video; trả về `request_id` |
| `GET /v1/videos/generations/{request_id}` | Truy vấn trạng thái tác vụ |
| `GET /v1/videos/generations/{request_id}/content` | Tải video đã tạo xuống |

`/v1/videos` và `/v1/videos/{request_id}` là các đường dẫn viết tắt tương đương.

### Gửi tác vụ {#video-submit}

Các trường trong phần thân yêu cầu:

| Trường | Mô tả |
| --- | --- |
| `model` | Bắt buộc; tên mô hình video |
| `prompt` | Mô tả hình ảnh và chuyển động |
| `duration` | Thời lượng (giây) |
| `aspect_ratio` | Tỷ lệ khung hình |
| `resolution` | Độ phân giải |
| `generate_audio` | Có tạo bản âm thanh hay không |
| `seed` | Hạt giống ngẫu nhiên |
| `watermark` | Có thêm hình mờ hay không |
| `image` | Hình ảnh khung hình đầu tiên |
| `last_frame` | Hình ảnh khung hình cuối cùng |
| `reference_images` | Danh sách hình ảnh tham chiếu |
| `reference_audios` | Danh sách đoạn âm thanh tham chiếu |

Các trường và giá trị được hỗ trợ tùy theo từng mô hình. Hãy dùng trang **Pricing** để xác nhận giao diện video và mức giá; điền các tham số cụ thể theo khả năng của mô hình bạn đã chọn. Nếu việc xác thực tham số thất bại, phản hồi có thể trả về lỗi 400 kèm `video_input_unsupported` và cho biết trong `field` những trường nào cần điều chỉnh.

```bash
curl https://api.ourzai.com/v1/videos/generations \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<VIDEO_MODEL_ID>", "prompt": "Sunset by the sea, with a slow camera push-in", "duration": 5}'
```

### Truy vấn trạng thái và nhận kết quả {#video-status}

Kết quả truy vấn trả về `request_id` và `status`. Khi video đã sẵn sàng, kết quả bao gồm `video.url` (cùng với thời lượng, độ phân giải, v.v.); khi thất bại, kết quả bao gồm `error.code` và `error.message`. Các giá trị có thể có của `status`:

| Trạng thái | Ý nghĩa |
| --- | --- |
| `pending` | Đang tạo; hãy kiểm tra lại sau |
| `done` | Đã hoàn thành; sẵn sàng để tải xuống |
| `failed` | Tạo thất bại; xem `error` |
| `expired` | Tác vụ đã hết hạn |

### Tải video xuống {#video-download}

Sau `done`, hãy gửi yêu cầu `/content` để nhận tệp video. Nếu video chưa sẵn sàng, yêu cầu sẽ trả về 409 `video_not_ready`; bạn chỉ cần thử lại sau.

Việc tạo video chỉ được tính phí một lần khi hoàn tất thành công; việc kiểm tra trạng thái bao nhiêu lần cũng không phát sinh thêm chi phí.

## Gọi các mô hình Gemini {#gemini}

Giao diện Gemini gốc tại `/v1beta/` hiện chưa khả dụng. Để gọi các mô hình Gemini, trước tiên hãy kiểm tra trang **Pricing** để xác nhận giao diện tương thích mà mô hình hỗ trợ, sau đó dùng đường dẫn `/v1/` tương ứng.

## Tích hợp theo mô hình {#model-guides}

[Danh mục và tích hợp mô hình](./models.md) — Chọn mô hình để xem giao diện được mở và ví dụ yêu cầu đầy đủ. Dùng chính xác ID; các mô hình cùng nhà cung cấp không nhất thiết hỗ trợ cùng giao diện.
