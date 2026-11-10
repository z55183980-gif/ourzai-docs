---
id: faq
title: Câu hỏi thường gặp về API
sidebar_label: Câu hỏi thường gặp
description: Các câu hỏi thường gặp về API dành cho nhà phát triển của ZAI, gồm khu vực sử dụng, thanh toán, tính phí, giá, điểm khác biệt với API chính thức và cách cấu hình trong công cụ lập trình.
sidebar_position: 6
update_docs: none
---

# Câu hỏi thường gặp về API {#faq}

## ZAI API là gì? {#what-is-it}

API dành cho nhà phát triển của ZAI là một cổng model theo định dạng API của OpenAI. Chỉ với một API key và một base_url (`https://api.ourzai.com/v1`), bạn có thể gọi các model chat, hình ảnh, giọng nói và video của GPT, Claude, Grok và nhiều nhà cung cấp khác. Mã hiện có dùng OpenAI SDK hoặc HTTP chỉ cần đổi base_url và key. Xem [Bắt đầu nhanh với API](./quickstart.md).

## Tôi có thể dùng ở Hồng Kông, Đài Loan hoặc các khu vực khác không? {#regions}

Có. API được cung cấp cho nhà phát triển ở khắp nơi. Ở Hồng Kông, Đài Loan, Đông Nam Á và các khu vực khác, bạn có thể đăng ký, nạp tiền và gọi API trực tiếp; mọi yêu cầu đều gửi tới `https://api.ourzai.com`. Hãy tuân thủ [Điều khoản dịch vụ](https://ourzai.com/legal/terms.html) và pháp luật nơi bạn sinh sống.

## Thanh toán như thế nào? {#payment}

Mua gói nạp trên trang "Top up" của [Developer Console](https://ourzai.com/console). Thanh toán do Stripe xử lý, và trang thanh toán sẽ hiển thị các phương thức bạn có thể dùng. Tiền nạp được cộng vào số dư bằng đô la Mỹ và không hết hạn. Xem [Credit](../platform/account.md#credits).

## Tính phí như thế nào? Có phí hằng tháng không? {#billing}

Không có phí hằng tháng và không cần đăng ký gói. Mỗi lần gọi được trừ vào số dư đô la Mỹ theo mức sử dụng thực tế. Đơn vị tính phí tùy theo loại model (mỗi triệu token hoặc mỗi đơn vị tính phí), và tác vụ video chỉ bị tính phí một lần, khi video được tạo thành công. Xem [Thanh toán và Mức sử dụng](./errors.md#billing).

## Giá so với API chính thức thế nào? {#price}

Trang **Pricing** trong console liệt kê giá bằng đô la Mỹ của từng model cùng mức chiết khấu so với giá niêm yết công khai của nhà cung cấp. Giá có thể thay đổi; trang này luôn hiển thị giá hiện hành.

## Khác gì so với dùng trực tiếp API chính thức của OpenAI hoặc Anthropic? {#vs-official}

- Một key gọi được model của nhiều nhà cung cấp, và mức sử dụng cùng hóa đơn của tất cả đều xem trong một console.
- Các endpoint thống nhất theo định dạng OpenAI, nên model chat Claude cũng gọi được qua `/v1/chat/completions`. Các model Claude hỗ trợ endpoint gốc `messages` cũng có thể dùng trực tiếp với Anthropic SDK. Xem [Giao diện và Khả năng](./endpoints.md).
- ID model là của riêng nền tảng này, và các model khác nhau của cùng một nhà cung cấp không nhất thiết hỗ trợ cùng các endpoint. Xem [Danh mục và tích hợp mô hình](./models.md).
- Khi nhà cung cấp phía trên gặp sự cố hoặc giới hạn tốc độ, yêu cầu có thể trả về 502/503; hãy chờ và thử lại với thời gian chờ tăng dần. Xem [5xx Service Temporarily Unavailable](./errors.md#status-5xx).

## Có dùng được trong Cursor, Cline, Claude Code hoặc Codex không? {#tools}

Có. Để biết mỗi công cụ nhập base_url, key và model ở đâu, xem [Dùng với công cụ lập trình](./tools/tools.md).

## Gặp sự cố thì liên hệ ai? {#support}

Gửi email tới support@ourzai.com, kèm email tài khoản, thời điểm xảy ra lỗi và thông báo lỗi trong phản hồi. Không gửi kèm API key. Các kênh liên hệ khác, xem [Liên hệ & Hỗ trợ](../platform/account.md#support).
