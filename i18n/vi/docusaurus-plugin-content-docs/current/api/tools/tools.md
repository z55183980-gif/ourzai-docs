---
id: tools
slug: /api/tools
title: Dùng với công cụ lập trình
sidebar_label: Công cụ lập trình
description: Thiết lập chung để dùng ZAI API trong các công cụ lập trình như Claude Code, Claude Desktop, Codex, Cursor và Cline, kèm liên kết tới hướng dẫn của từng công cụ.
sidebar_position: 0
update_docs: none
---

# Dùng với công cụ lập trình {#tools}

Mọi công cụ lập trình hoặc ứng dụng khách cho phép đặt endpoint tùy chỉnh đều dùng được ZAI API. Công cụ nào cũng cần ba thiết lập giống nhau:

| Thiết lập | Giá trị |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` (công cụ dùng giao thức Anthropic thì nhập `https://api.ourzai.com`; xem trang của từng công cụ) |
| API Key | Key bạn tạo trên trang **API keys** của [Developer Console](https://ourzai.com/console) |
| Model | ID model trong [danh mục model](../models.md), nhập đúng nguyên văn |

Giao diện của các công cụ thay đổi theo phiên bản. Trang của từng công cụ nêu tên các thiết lập; nếu không tìm thấy, hãy điền ba thiết lập ở trên vào nơi công cụ yêu cầu. Một công cụ lập trình có thể gửi rất nhiều yêu cầu để hoàn thành một tác vụ, và mỗi yêu cầu đều bị trừ vào số dư theo mức sử dụng, vì vậy nên đặt hạn mức chi tiêu cho key. Xem [Lấy key](../quickstart.md#get-key).

:::tip Kiểm tra các endpoint mà model hỗ trợ
Mọi model chat đều hỗ trợ `chat.completions`; chỉ một số model hỗ trợ thêm `responses` hoặc endpoint `messages` của Anthropic. Trước khi chọn model, hãy xem các endpoint của nó trong [Danh mục và tích hợp mô hình](../models.md).
:::

## Chọn công cụ của bạn {#choose}

| Công cụ | Loại | Endpoint cần có | Hướng dẫn |
| --- | --- | --- | --- |
| Claude Code | Dòng lệnh | `messages` | [Claude Code](./claude-code.md) |
| Claude Desktop | Ứng dụng máy tính (Chat, Cowork, Code) | `messages` | [Claude Desktop](./claude-desktop.md) |
| Codex CLI | Dòng lệnh | `responses` | [Codex CLI](./codex-cli.md) |
| Ứng dụng Codex | Ứng dụng máy tính | `responses` | [Ứng dụng Codex](./codex-app.md) |
| Cursor | Trình soạn thảo | `chat.completions` | [Cursor](./cursor.md) |
| Cline | Tiện ích mở rộng trình soạn thảo | `chat.completions` | [Cline](./cline.md) |

## Các ứng dụng khách tương thích OpenAI khác {#other-clients}

Trong các ứng dụng như Chatbox, Cherry Studio, LobeChat, Open WebUI, Dify và n8n, hãy thêm nhà cung cấp loại "OpenAI compatible" hoặc "custom OpenAI" rồi điền ba thiết lập ở đầu trang này. Với các công cụ đọc biến môi trường chuẩn của OpenAI, xem [Dùng biến môi trường](../quickstart.md#env).

## Khi thiết lập thất bại {#troubleshooting}

Hãy tra mã trạng thái trong [Lỗi, Giới hạn và Mức sử dụng](../errors.md): lỗi 401 thường do sai key, còn lỗi 404 thường do viết sai ID model hoặc model không hỗ trợ endpoint đó.
