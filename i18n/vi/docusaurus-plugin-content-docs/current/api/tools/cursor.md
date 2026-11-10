---
id: cursor
title: Dùng với Cursor
sidebar_label: Cursor
description: Nhập key ZAI API trong Cursor và ghi đè base URL của OpenAI để dùng model ZAI trong chat và Agent.
sidebar_position: 5
update_docs: none
---

# Dùng với Cursor {#cursor}

Cursor gọi model tùy chỉnh qua endpoint `chat.completions`, nên model chat nào cũng dùng được. Tìm ID model trong [Danh mục và tích hợp mô hình](../models.md).

## Thiết lập {#setup}

1. Mở Cursor Settings → Models.
2. Trong API Keys, nhập key của bạn làm OpenAI API Key, bật **Override OpenAI Base URL** và nhập `https://api.ourzai.com/v1`.
3. Thêm các ID model bạn muốn dùng vào danh sách model và bật chúng.

## Phạm vi dùng key {#scope}

Key của bạn chỉ được dùng cho các model bạn chọn trong chat và Agent. Các tính năng có sẵn của Cursor, như gợi ý Tab, vẫn chạy trên dịch vụ của chính Cursor.

Nếu yêu cầu thất bại sau khi thiết lập, hãy tra mã trạng thái trong [Lỗi, Giới hạn và Mức sử dụng](../errors.md): lỗi 401 thường do sai key, còn lỗi 404 thường do viết sai ID model.
