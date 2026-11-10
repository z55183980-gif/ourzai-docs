---
id: codex-cli
title: Dùng với Codex CLI
sidebar_label: Codex CLI
description: Thêm ZAI làm nhà cung cấp trong ~/.codex/config.toml để Codex CLI gọi ZAI API qua endpoint Responses.
sidebar_position: 3
update_docs: none
---

# Dùng với Codex CLI {#codex}

Codex gọi model qua endpoint Responses, nên hãy chọn model hỗ trợ `responses`. Xem danh sách trong [Danh mục và tích hợp mô hình](../models.md). Trang này dành cho Codex dòng lệnh; với ứng dụng Codex trên máy tính, xem [Ứng dụng Codex](./codex-app.md).

## Thêm nhà cung cấp {#config}

Thêm nội dung sau vào `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` trên Windows):

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

`env_key` chứa tên của một biến môi trường, không phải bản thân key, nên key của bạn không được lưu trong tệp này.

## Đặt key {#key}

Đặt key trong terminal nơi bạn khởi động Codex, rồi chạy `codex`:

```bash
export ZAI_API_KEY="<your API key>"
codex
```

Trong Windows PowerShell, dùng `$env:ZAI_API_KEY = "<your API key>"`. Để thiết lập có hiệu lực lâu dài, thêm dòng `export` vào `~/.zshrc` hoặc `~/.bashrc`; trên Windows, thêm biến người dùng tên `ZAI_API_KEY` trong System Properties → Environment Variables, rồi mở lại terminal.

Nếu yêu cầu thất bại sau khi thiết lập, hãy tra mã trạng thái trong [Lỗi, Giới hạn và Mức sử dụng](../errors.md): lỗi 404 thường do viết sai ID model hoặc model không hỗ trợ `responses`.
