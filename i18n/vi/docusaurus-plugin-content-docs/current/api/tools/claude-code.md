---
id: claude-code
title: Dùng với Claude Code
sidebar_label: Claude Code
description: Kết nối Claude Code dòng lệnh với ZAI API qua endpoint Anthropic Messages, bằng biến môi trường hoặc settings.json.
sidebar_position: 1
update_docs: none
---

# Dùng với Claude Code {#claude-code}

Claude Code gọi model qua endpoint Anthropic Messages, nên chỉ dùng được các model hỗ trợ `messages`. Xem danh sách trong [Danh mục và tích hợp mô hình](../models.md). Trang này dành cho Claude Code dòng lệnh; để dùng Code trong ứng dụng Claude trên máy tính, xem [Claude Desktop](./claude-desktop.md).

:::tip Không muốn thiết lập thủ công?
ZAI cung cấp [công cụ quản lý khóa](./key-tool.md) trên máy tính, giúp quản lý tập trung các API key và thiết lập kết nối cho bạn. [Đến phần tải xuống](./key-tool.md#download)
:::

## Dùng biến môi trường cho một phiên {#env}

Đặt các biến môi trường sau trong terminal nơi bạn khởi động Claude Code:

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

Trong Windows PowerShell, đặt các biến tương tự bằng cú pháp `$env:NAME = "value"`. Các biến này chỉ có hiệu lực trong terminal hiện tại.

## Lưu thiết lập lâu dài {#settings}

Để không phải đặt biến mỗi lần, hãy ghi chúng vào trường `env` của `~/.claude/settings.json` (`%USERPROFILE%\.claude\settings.json` trên Windows). Sau đó chỉ cần chạy `claude`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.ourzai.com",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "ANTHROPIC_MODEL": "<model ID that offers messages>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<the same model ID>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<the same model ID>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<the same model ID>"
  }
}
```

Tệp này lưu key ở dạng văn bản thuần. Đừng commit nó vào kho mã hay chia sẻ cho người khác.

## Lưu ý {#notes}

- Không thêm `/v1` vào `ANTHROPIC_BASE_URL`: Claude Code tự nối thêm `/v1/messages`.
- Theo mặc định, Claude Code dùng các dòng model khác cho tác vụ nền và subagent. Hãy trỏ cả ba biến `ANTHROPIC_DEFAULT_*_MODEL` tới một model mà nền tảng cung cấp với `messages`, để nó không bao giờ yêu cầu một model mà nền tảng không có rồi nhận lỗi 404.
- Gõ `/status` trong Claude Code để xem endpoint và model đang dùng.

Nếu yêu cầu thất bại sau khi thiết lập, hãy tra mã trạng thái trong [Lỗi, Giới hạn và Mức sử dụng](../errors.md).
