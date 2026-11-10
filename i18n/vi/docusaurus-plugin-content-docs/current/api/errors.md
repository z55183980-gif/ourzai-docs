---
id: errors
title: Lỗi, Giới hạn và Mức sử dụng
description: Định dạng lỗi API và các mã trạng thái phổ biến, số dư và hạn mức, giới hạn kích thước yêu cầu và thời gian chờ, cùng lời khuyên khắc phục sự cố.
sidebar_position: 3
update_docs: none
---

# Lỗi, Giới hạn và Mức sử dụng {#errors}

## Định dạng lỗi {#error-format}

Định dạng nội dung lỗi phụ thuộc vào giao thức API và giai đoạn xảy ra lỗi:

- **API tương thích OpenAI**: `{"error": {"type": "...", "message": "..."}}`, với một số lỗi kèm theo `code`;
- **API tương thích Anthropic**: `{"type": "error", "error": {"type": "...", "message": "..."}}`;
- **Kiểm tra khóa API và thanh toán** (trước khi yêu cầu đến được mô hình): `{"code": "...", "message": "..."}`.

Khi khắc phục sự cố, hãy kiểm tra mã trạng thái HTTP trước, sau đó xem `code` hoặc `type`.

## Các mã trạng thái phổ biến {#status-codes}

### 400 Bad Request {#status-400}

- Nội dung yêu cầu trống hoặc không phải JSON hợp lệ, thiếu `model`, hoặc có trường sai kiểu dữ liệu;
- Yêu cầu video có trường mà mô hình không hỗ trợ: `video_input_unsupported`, và `field` cho biết đó là trường nào;
- Dịch vụ mô hình từ chối nội dung yêu cầu: `upstream_rejected`, có thể kèm theo `upstream_code` do dịch vụ mô hình trả về.

### 401 Authentication Failed (Xác thực thất bại) {#status-401}

| Mã | Ý nghĩa | Cách xử lý |
| --- | --- | --- |
| `API_KEY_REQUIRED` | Không có khóa API | Kiểm tra header yêu cầu `Authorization: Bearer <YOUR_API_KEY>` |
| `INVALID_API_KEY` | Khóa API không hợp lệ | Kiểm tra khóa trong bảng điều khiển hoặc tạo khóa mới |
| `API_KEY_DISABLED` | Khóa API bị vô hiệu hóa | Kích hoạt lại trong bảng điều khiển |

Việc chỉ truyền khóa API dưới dạng tham số truy vấn URL không được tính là xác thực hợp lệ và sẽ trả về `API_KEY_REQUIRED`.

### 402 Insufficient Balance (Số dư không đủ) {#status-402}

`insufficient_credits`: Số dư khả dụng của tài khoản không đủ. Hãy nạp tiền trên trang "Top up" (Nạp tiền) trong bảng điều khiển và thử lại.

### 403 Forbidden (Bị từ chối) {#status-403}

| Mã | Ý nghĩa | Cách xử lý |
| --- | --- | --- |
| `API_KEY_EXPIRED` | Khóa API đã hết hạn | Cập nhật thời hạn hiệu lực trong bảng điều khiển hoặc tạo khóa mới |
| `ACCESS_DENIED` | IP nguồn không nằm trong danh sách cho phép hoặc nằm trong danh sách chặn | Kiểm tra cài đặt IP của khóa |

### 404 Not Found (Không tìm thấy) {#status-404}

- `model_not_found`: Tên mô hình bị viết sai chính tả, hoặc tài khoản của bạn không thể sử dụng mô hình này;
- Mô hình không hỗ trợ API được gọi (ví dụ: gọi endpoint tạo ảnh bằng mô hình trò chuyện);
- Đường dẫn yêu cầu không tồn tại, thường do base_url thiếu `/v1`.

### 409 Video Not Ready (Video chưa sẵn sàng) {#status-409}

`video_not_ready`: Video vẫn đang được tạo. Hãy yêu cầu tải xuống lại sau.

### 413 Request Body Too Large (Nội dung yêu cầu quá lớn) {#status-413}

Nội dung yêu cầu vượt quá giới hạn. Xem [Giới hạn yêu cầu](#limits).

### 429 Quota or Rate Limit Exceeded (Vượt quá hạn mức hoặc giới hạn tốc độ) {#status-429}

| Tình huống | Phản hồi | Cách xử lý |
| --- | --- | --- |
| Đã dùng hết tổng hạn mức của khóa API | `API_KEY_QUOTA_EXHAUSTED` | Tăng hạn mức trong bảng điều khiển hoặc đặt lại hạn mức đã dùng |
| Vượt quá giới hạn yêu cầu đồng thời | `gateway_concurrency_limit` | Giảm mức độ đồng thời và thử lại sau khi chờ |
| Dịch vụ mô hình giới hạn tốc độ | `upstream_rate_limited` | Thử lại sau khi chờ; nếu phản hồi có `Retry-After`, hãy chờ theo hướng dẫn |

### 5xx Service Temporarily Unavailable (Dịch vụ tạm thời không khả dụng) {#status-5xx}

- 502 `upstream_unavailable`: Dịch vụ mô hình tạm thời không khả dụng;
- 503 `no_available_account` hoặc Service temporarily unavailable: Hiện không có dung lượng dịch vụ khả dụng.

Các lỗi này có thể thử lại sau; nên sử dụng chiến lược lùi theo cấp số nhân.

## Giới hạn yêu cầu {#limits}

| Giới hạn | Giá trị |
| --- | --- |
| Kích thước nội dung yêu cầu tối đa | 100MB |
| Thời gian chờ không phản hồi | Thời gian chờ đọc của tầng truy cập là 600 giây; API mô hình hoặc máy khách có thể hết thời gian chờ sớm hơn. Đây không phải là thời gian thực thi tối đa cho toàn bộ tác vụ |
| Phạm vi truy vấn mức sử dụng | Tối đa 90 ngày |

Tổng hạn mức cấp khóa, thời hạn hiệu lực và hạn chế IP do bạn cấu hình trong bảng điều khiển; giới hạn tốc độ yêu cầu và mức độ đồng thời cấp tài khoản do nền tảng thiết lập và trả về 429 khi vượt quá.

## Thanh toán và Mức sử dụng {#billing}

- Các lệnh gọi API được tính phí dựa trên mức sử dụng thực tế từ số dư USD của bạn mỗi lần. Số dư được chia sẻ với quá trình tạo trên ZaiDrama; để biết thông tin về số dư và nạp tiền, xem [Tài khoản, Credits và Hỗ trợ](../platform/account.md#credits).
- Đơn giá USD cho từng mô hình (trên một triệu token hoặc trên một đơn vị tính phí) có sẵn trong mục "Pricing" (Bảng giá) trong bảng điều khiển.
- Tác vụ video chỉ được tính phí một lần, khi video được tạo thành công.
- Chi tiết lệnh gọi có sẵn trong mục "Usage" (Mức sử dụng) trong bảng điều khiển. Mỗi bản ghi bao gồm mô hình, API, có phải streaming hay không, số token, chi phí (USD) và thời lượng, và có thể xuất dưới dạng CSV.
- Khi số dư không đủ, thông báo trả về có dạng `余额不足：这次调用至少需要 $x，当前可用 $y，请充值后再试`.

## Danh sách kiểm tra khắc phục sự cố {#troubleshooting}

1. **Mọi yêu cầu đều trả về 404**: Kiểm tra xem base_url có bị viết thành `https://api.ourzai.com/v1` hay không (kèm `/v1`).
2. **401**: Kiểm tra xem header yêu cầu có phải là `Authorization: Bearer <YOUR_API_KEY>` hay không và khóa API có đầy đủ và chưa bị vô hiệu hóa không.
3. **Một mô hình cụ thể trả về 404**: Kiểm tra xem tên mô hình có khớp với "Pricing" (Bảng giá) không và mô hình có hỗ trợ API bạn đang gọi không.
4. **402, 403, hoặc 429**: Kiểm tra số dư khả dụng, tổng hạn mức của khóa API, thời hạn hiệu lực, cài đặt IP và mức độ đồng thời.
5. **Video mãi ở trạng thái `pending`**: Quá trình tạo video cần thời gian; hãy định kỳ kiểm tra. `expired` nghĩa là tác vụ đã hết hạn và phải gửi lại.
6. **Vẫn chưa giải quyết được**: Gửi email đến support@ourzai.com kèm thời điểm xảy ra, API đã gọi, tên mô hình và phản hồi lỗi. Không bao gồm toàn bộ khóa API.
