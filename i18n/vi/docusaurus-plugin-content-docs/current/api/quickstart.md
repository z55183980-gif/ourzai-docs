---
id: quickstart
title: Bắt đầu nhanh với API
description: Lấy API key từ bảng điều khiển, đổi base_url thành https://api.ourzai.com/v1, và gửi yêu cầu đầu tiên của bạn.
sidebar_position: 1
update_docs: none
---

# Bắt đầu nhanh với API {#quickstart}

Bắt đầu với ZAI API chỉ cần ba bước: lấy key, đổi base_url, và gửi yêu cầu. API công khai của ZAI tương thích với định dạng giao diện OpenAI: code SDK OpenAI hoặc HTTP hiện có có thể gọi các model trên nền tảng chỉ bằng cách đổi base_url và API key. Chat, hình ảnh, video, và âm thanh đều đi qua cùng một điểm vào, với chi phí được trừ vào số dư USD của bạn dựa trên mức sử dụng thực tế.

| Mục | Giá trị |
| --- | --- |
| base_url (SDK tương thích OpenAI) | `https://api.ourzai.com/v1` |
| Xác thực | Header yêu cầu `Authorization: Bearer <YOUR_API_KEY>` |
| Keys & mức sử dụng | [Bảng điều khiển nhà phát triển](https://ourzai.com/console) |

## 1. Lấy key {#get-key}

1. Mở [Bảng điều khiển nhà phát triển](https://ourzai.com/console) và đăng nhập bằng tài khoản nền tảng của bạn. Nếu bạn chưa có tài khoản, bạn có thể đăng ký trực tiếp trên trang đăng nhập; xem [Tài khoản, Thanh toán & Hỗ trợ](../platform/account.md#register).
2. Đi tới **API keys**, nhấp **New**, và nhập tên.
3. Cấu hình theo nhu cầu:
   - **Thời hạn hiệu lực**: chọn 7 ngày, 30 ngày, 90 ngày, hoặc ngày tùy chỉnh, tối đa 3650 ngày. Nếu không bật giới hạn hiệu lực, key sẽ có hiệu lực vô thời hạn.
   - **Giới hạn tổng chi tiêu**: khi bật, đặt số USD tối đa mà key này có thể tiêu thụ. Khi tắt, key không có giới hạn chi tiêu riêng, nhưng các yêu cầu vẫn bị giới hạn bởi số dư khả dụng của tài khoản.
   - **Danh sách IP cho phép / chặn (blocklist)**: IP đơn hoặc CIDR, tối đa 100 mục mỗi danh sách.
4. Sau khi tạo, một ví dụ sử dụng sẽ hiện lên để bạn có thể sao chép trực tiếp.

Các key đầy đủ được che mặc định trong bảng điều khiển; bạn có thể nhấp để xem và sao chép chúng bất cứ lúc nào. Một key trông giống như `sk-` theo sau là một chuỗi ký tự thập lục phân. Trên cùng một trang, sau này bạn có thể vô hiệu hóa, kích hoạt, chỉnh sửa thời hạn hiệu lực và giới hạn, hoặc xóa key.

:::caution Giữ key của bạn an toàn
Một key tương đương với quyền chi tiêu trên tài khoản của bạn. Không bao giờ đặt nó trong code frontend, commit nó vào kho lưu trữ code, hoặc chia sẻ nó với người khác. Nếu bạn nghi ngờ bị lộ, hãy vô hiệu hóa hoặc xóa nó trong bảng điều khiển ngay lập tức và tạo một key mới.
:::

## 2. Đổi base_url {#set-base-url}

Đổi địa chỉ mà SDK tương thích OpenAI hoặc yêu cầu HTTP sử dụng thành `https://api.ourzai.com/v1`, sau đó chọn một model hỗ trợ endpoint tương ứng. Các model khác nhau có thể hỗ trợ các tham số khác nhau.

- **`/v1` là bắt buộc**: các SDK tương thích OpenAI thêm các đường dẫn như `/chat/completions` vào base_url. Thiếu `/v1` sẽ dẫn đến lỗi 404.
- Khi dùng Anthropic SDK để gọi `/v1/messages`, đặt base_url thành `https://api.ourzai.com` (SDK sẽ tự thêm `/v1`).

## 3. Gửi yêu cầu đầu tiên của bạn {#first-request}

Trước tiên hãy chọn một model có khả năng chat từ **Pricing** trong bảng điều khiển và đặt tên của nó vào trường `model`.

### cURL {#curl}

```bash
curl https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Python {#python}

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.ourzai.com/v1",
    api_key="<YOUR_API_KEY>",
)

response = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "Hello"}],
)
print(response.choices[0].message.content)
```

### Node.js {#nodejs}

```js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.ourzai.com/v1",
  apiKey: process.env.ZAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "<MODEL_ID>",
  messages: [{ role: "user", content: "Hello" }],
});
console.log(response.choices[0].message.content);
```

### Sử dụng biến môi trường {#env}

Nhiều công cụ đọc các biến môi trường chuẩn của OpenAI, vì vậy bạn không cần thay đổi code nào sau khi thiết lập chúng:

```bash
export OPENAI_BASE_URL="https://api.ourzai.com/v1"
export OPENAI_API_KEY="<YOUR_API_KEY>"
```

## 4. Đầu ra dạng streaming {#streaming}

Endpoint chat hỗ trợ đầu ra streaming SSE. Thêm `"stream": true` vào body yêu cầu; cách sử dụng giống như OpenAI. Nếu có lỗi xảy ra sau khi stream đã bắt đầu, nó sẽ được trả về dưới dạng sự kiện SSE, và client cần xử lý nó.

## 5. Những model nào được hỗ trợ và giá bao nhiêu {#models}

- **Pricing trong bảng điều khiển**: liệt kê các model mà nền tảng cung cấp, các endpoint mà mỗi model hỗ trợ (chat, embeddings, tạo hình ảnh, tạo video, v.v.), và đơn giá USD (trên một triệu token hoặc trên mỗi đơn vị tính phí), cùng với base_url. Đây là nguồn thông tin chính thống.
- **`GET /v1/models`**: dùng API key của bạn để lấy danh sách model theo cách lập trình.

Đặt tên model trực tiếp vào trường `model` của yêu cầu. Nếu một model không hỗ trợ endpoint bạn đang gọi, nó sẽ trả về lỗi 404; xem [Lỗi, Giới hạn & Mức sử dụng](./errors.md).

## 6. Xem mức sử dụng {#usage}

Trang **Usage** trong bảng điều khiển cho phép bạn lọc theo thời gian, key, và model để xem số lượng yêu cầu, token, chi phí (USD), xu hướng sử dụng, và phân bố theo model. Bạn cũng có thể xuất chi tiết cuộc gọi dưới dạng CSV, với phạm vi truy vấn tối đa 90 ngày. Trang **API keys** hiển thị chi tiêu của từng key cho hôm nay và tổng cộng.

Các lệnh gọi API và việc tạo ZaiDrama chia sẻ cùng số dư USD. Để nạp tiền, xem [Tài khoản, Thanh toán & Hỗ trợ](../platform/account.md#credits).

## Các bước tiếp theo {#next-steps}

- [Endpoints & Khả năng](./endpoints.md): tất cả các endpoint chat, hình ảnh, âm thanh, video, và các endpoint khác.
- [Lỗi, Giới hạn & Mức sử dụng](./errors.md): mã lỗi, giới hạn yêu cầu, và Câu hỏi thường gặp.

## Tích hợp theo mô hình {#model-guides}

[Danh mục và tích hợp mô hình](./models.md) — Chọn mô hình để xem giao diện được mở và ví dụ yêu cầu đầy đủ. Dùng chính xác ID; các mô hình cùng nhà cung cấp không nhất thiết hỗ trợ cùng giao diện.
