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
ZAI cung cấp [công cụ quản lý khóa](./key-tool.mdx) trên máy tính, giúp quản lý tập trung các API key và thiết lập kết nối cho bạn. [Đến phần tải xuống](./key-tool.mdx#download)
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

## Hiển thị mọi model trong bộ chọn model {#model-discovery}

Theo mặc định, bộ chọn `/model` của Claude Code chỉ liệt kê các model có sẵn trong ứng dụng, không đọc danh mục model của ZAI API, nên các model Claude khác trên nền tảng không xuất hiện ở đó. Để bộ chọn liệt kê các model Claude mà nền tảng cung cấp với `messages`, hãy đặt thêm một biến môi trường, hoặc thêm nó vào trường `env` của `settings.json`:

```bash
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY="1"
```

Khi bật, mỗi lần khởi động Claude Code sẽ gọi `https://api.ourzai.com/v1/models` và thêm vào bộ chọn những model có ID chứa `claude`. Model trùng với mục có sẵn sẽ không xuất hiện hai lần. Khởi động lại Claude Code sau khi thay đổi. Nếu không bật, bạn vẫn có thể chuyển model bằng cách gõ `/model <model ID>` trong phiên làm việc.

## Lưu ý {#notes}

- Không thêm `/v1` vào `ANTHROPIC_BASE_URL`: Claude Code tự nối thêm `/v1/messages`.
- Theo mặc định, Claude Code dùng các dòng model khác cho tác vụ nền và subagent. Hãy trỏ cả ba biến `ANTHROPIC_DEFAULT_*_MODEL` tới một model mà nền tảng cung cấp với `messages`, để nó không bao giờ yêu cầu một model mà nền tảng không có rồi nhận lỗi 404.
- Gõ `/status` trong Claude Code để xem endpoint và model đang dùng.

Nếu yêu cầu thất bại sau khi thiết lập, hãy tra mã trạng thái trong [Lỗi, Giới hạn và Mức sử dụng](../errors.md).
