---
id: cline
title: Dùng với Cline
sidebar_label: Cline
description: Chọn nhà cung cấp OpenAI Compatible trong Cline và nhập base URL, key và ID model của ZAI API.
sidebar_position: 6
update_docs: none
---

# Dùng với Cline {#cline}

Cline gọi model qua endpoint `chat.completions`, nên model chat nào cũng dùng được. Tìm ID model trong [Danh mục và tích hợp mô hình](../models.md).

## Thiết lập {#setup}

1. Mở phần cài đặt của Cline và đặt "API Provider" thành **OpenAI Compatible**.
2. Đặt "Base URL" thành `https://api.ourzai.com/v1`.
3. Nhập key của bạn vào "API Key".
4. Trong "Model ID", nhập ID của một model chat hỗ trợ `chat.completions`.

Cline gửi liên tiếp nhiều yêu cầu để hoàn thành một tác vụ, vì vậy nên đặt hạn mức chi tiêu cho key. Xem [Lấy key](../quickstart.md#get-key). Nếu yêu cầu thất bại sau khi thiết lập, hãy tra mã trạng thái trong [Lỗi, Giới hạn và Mức sử dụng](../errors.md).
