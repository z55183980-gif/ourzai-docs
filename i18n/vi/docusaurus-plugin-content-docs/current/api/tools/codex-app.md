---
id: codex-app
title: Dùng với ứng dụng Codex
sidebar_label: Ứng dụng Codex
description: Ứng dụng Codex trên máy tính dùng chung config.toml với Codex CLI. Thêm ZAI làm nhà cung cấp và bảo đảm ứng dụng đọc được key của bạn.
sidebar_position: 4
update_docs: none
---

# Dùng với ứng dụng Codex {#codex-app}

Ứng dụng Codex trên máy tính đọc cùng tệp cấu hình với Codex CLI và tiện ích IDE: `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` trên Windows). Codex gọi model qua endpoint Responses, nên hãy chọn model hỗ trợ `responses`. Xem danh sách trong [Danh mục và tích hợp mô hình](../models.md).

:::tip Không muốn thiết lập thủ công?
ZAI cung cấp [công cụ quản lý khóa](./key-tool.mdx) trên máy tính, giúp quản lý tập trung các API key và thiết lập kết nối cho bạn. [Đến phần tải xuống](./key-tool.mdx#download)
:::

## Thêm nhà cung cấp {#config}

Mở `config.toml` (phần cài đặt của ứng dụng cũng có lối mở tệp cấu hình) và thêm nội dung sau ở cấp cao nhất của tệp:

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

- Đặt `model` và `model_provider` ở cấp cao nhất của tệp. Ứng dụng máy tính không đọc thiết lập trong `[profiles]`.
- Nếu đã cấu hình [Codex CLI](./codex-cli.md), bạn không cần thêm lại.

## Để ứng dụng đọc được key {#key}

`env_key` trỏ tới biến môi trường `ZAI_API_KEY`. Ứng dụng máy tính mở từ Dock, menu Start hoặc Launchpad không đọc các dòng `export` trong `~/.zshrc`, `~/.bashrc` hay hồ sơ PowerShell, nên biến phải được đặt ở cấp hệ thống.

Trên macOS, chạy lệnh sau trong Terminal:

```bash
launchctl setenv ZAI_API_KEY "<your API key>"
```

Thiết lập này bị xóa khi bạn khởi động lại máy, nên hãy chạy lại sau mỗi lần khởi động lại.

Trên Windows, chạy lệnh sau trong PowerShell (thiết lập được giữ lâu dài):

```powershell
setx ZAI_API_KEY "<your API key>"
```

Sau đó thoát hẳn ứng dụng Codex trên máy tính (Command + Q trên macOS; trên Windows, bảo đảm ứng dụng không còn chạy nền) rồi mở lại.

## Kiểm tra {#verify}

Tạo một tác vụ mới và gửi tin nhắn. Nếu nhận được phản hồi, thiết lập đã hoạt động. Nếu ứng dụng báo thiếu `ZAI_API_KEY`, nghĩa là nó không thấy biến khi khởi động: hãy kiểm tra bước trước, rồi thoát hẳn ứng dụng và mở lại. Với các lỗi khác, hãy tra mã trạng thái trong [Lỗi, Giới hạn và Mức sử dụng](../errors.md): lỗi 401 thường do sai key, còn lỗi 404 thường do viết sai ID model hoặc model không hỗ trợ `responses`.
