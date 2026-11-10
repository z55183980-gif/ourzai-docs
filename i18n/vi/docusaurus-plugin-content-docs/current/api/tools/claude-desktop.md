---
id: claude-desktop
title: Dùng với Claude Desktop
sidebar_label: Claude Desktop
description: Dùng cấu hình suy luận bên thứ ba của ứng dụng Claude trên máy tính để Chat, Cowork và Code dùng ZAI API.
sidebar_position: 2
update_docs: none
---

# Dùng với Claude Desktop {#claude-desktop}

Ứng dụng Claude trên máy tính (macOS và Windows) có thể chuyển sang dùng ZAI API qua cấu hình suy luận bên thứ ba. Sau khi cấu hình, Chat, Cowork và Code trong ứng dụng đều gửi yêu cầu tới ZAI API qua endpoint Anthropic Messages và bị trừ vào số dư theo mức sử dụng. Chỉ dùng được các model hỗ trợ `messages`; xem danh sách trong [Danh mục và tích hợp mô hình](../models.md).

:::note Biến môi trường không có tác dụng trong ứng dụng máy tính
Các phiên Code cục bộ trong ứng dụng máy tính dùng endpoint do chính ứng dụng đặt, nên `ANTHROPIC_BASE_URL` không có tác dụng dù bạn đặt nó trong terminal, trong biến môi trường hệ thống hay trong `~/.claude/settings.json`. Hãy cấu hình ứng dụng theo các bước trong trang này. Nếu chỉ dùng dòng lệnh, xem [Claude Code](./claude-code.md).
:::

## Mở cửa sổ cấu hình {#open}

1. Cập nhật ứng dụng Claude trên máy tính lên phiên bản mới nhất.
2. Bật Developer mode: trên macOS từ thanh menu, hoặc trên Windows từ menu ứng dụng (☰) ở góc trên bên trái màn hình đăng nhập, chọn **Help → Troubleshooting → Enable Developer Mode**.
3. Chọn **Developer → Configure Third-Party Inference…** để mở cửa sổ cấu hình.

Nếu không thấy menu **Developer**, hãy làm lại bước 2. Nếu vẫn không thấy, phiên bản ứng dụng của bạn chưa hỗ trợ suy luận bên thứ ba; hãy cập nhật ứng dụng trước.

## Nhập thông tin kết nối {#connection}

Trong phần **Connection** của cửa sổ cấu hình, đặt **Inference provider** thành **Gateway**, rồi điền:

| Thiết lập | Giá trị |
| --- | --- |
| Gateway base URL | `https://api.ourzai.com` (không có `/v1`) |
| Gateway API key | API key của bạn |
| Credential kind | **Static API key** |
| Gateway auth scheme | **Bearer** |

Ứng dụng tự nối `/v1/messages` và `/v1/models` vào sau base URL, nên không thêm `/v1` ở đây.

Sau khi điền xong, bạn có thể nhấn **Test connection** để kiểm tra kết nối trước khi tiếp tục.

![Cửa sổ suy luận bên thứ ba của Claude Desktop: phần Connection đã chọn Gateway và điền thông tin ZAI API](/img/tools/claude-desktop-gateway-light.png#light-only)
![Cửa sổ suy luận bên thứ ba của Claude Desktop: phần Connection đã chọn Gateway và điền thông tin ZAI API](/img/tools/claude-desktop-gateway-dark.png#dark-only)

## Chọn model {#models}

Theo mặc định, ứng dụng gọi `GET /v1/models` để tìm model và chỉ đưa vào bộ chọn model những ID mà nó nhận ra là model Claude. Nếu model bạn muốn không có trong bộ chọn, hãy thêm thủ công một ID model hỗ trợ `messages` vào danh sách model trong cửa sổ cấu hình, nhập đúng nguyên văn.

## Áp dụng cấu hình {#apply}

Nhấn **Apply Changes**. Ứng dụng ghi cấu hình vào thiết bị này rồi khởi động lại. Sau khi khởi động lại, hãy gửi một tin nhắn trong Chat, Cowork hoặc Code để xác nhận bạn nhận được phản hồi. Các thay đổi sau này cũng chỉ có hiệu lực khi bạn áp dụng và ứng dụng khởi động lại.

Nếu menu **Developer** biến mất khi bạn muốn thay đổi lần nữa, hãy bật lại Developer mode như bước 2 trong [Mở cửa sổ cấu hình](#open).

## Xử lý sự cố {#faq}

- **Bộ chọn model trống**: kiểm tra key có đúng không, hoặc thêm ID model thủ công như trong [Chọn model](#models).
- **401**: Gateway API key sai, hoặc Gateway auth scheme không phải **Bearer**.
- **404 hoặc "model không khả dụng"**: ID model bị viết sai, hoặc model không hỗ trợ endpoint `messages`.

Với các mã trạng thái khác, xem [Lỗi, Giới hạn và Mức sử dụng](../errors.md).
