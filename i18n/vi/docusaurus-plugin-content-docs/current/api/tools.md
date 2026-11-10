---
id: tools
title: Dùng với công cụ lập trình
sidebar_label: Công cụ lập trình
description: Cấu hình base_url, key và model của ZAI API trong các công cụ lập trình như Cline, Cursor, Codex CLI và Claude Code.
sidebar_position: 5
update_docs: none
---

# Dùng với công cụ lập trình {#tools}

Mọi công cụ lập trình hoặc ứng dụng khách cho phép đặt endpoint tùy chỉnh tương thích OpenAI đều dùng được ZAI API. Công cụ nào cũng cần ba thiết lập giống nhau:

| Thiết lập | Giá trị |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` |
| API Key | Key bạn tạo trên trang **API keys** của [Developer Console](https://ourzai.com/console) |
| Model | ID model trong [danh mục model](./models.md), nhập đúng nguyên văn |

Giao diện của các công cụ thay đổi theo phiên bản. Các bước dưới đây nêu tên thiết lập trong từng công cụ; nếu không tìm thấy, hãy điền ba thiết lập ở trên vào nơi công cụ yêu cầu. Một công cụ lập trình có thể gửi rất nhiều yêu cầu để hoàn thành một tác vụ, và mỗi yêu cầu đều bị trừ vào số dư theo mức sử dụng, vì vậy nên đặt hạn mức chi tiêu cho key. Xem [Lấy key](./quickstart.md#get-key).

:::tip Kiểm tra các endpoint mà model hỗ trợ
Mọi model chat đều hỗ trợ `chat.completions`; chỉ một số model hỗ trợ thêm `responses` hoặc endpoint `messages` của Anthropic. Codex cần `responses`, còn Claude Code cần `messages`. Trước khi chọn model, hãy xem các endpoint của nó trong [Danh mục và tích hợp mô hình](./models.md).
:::

## Cline {#cline}

1. Mở phần cài đặt của Cline và đặt "API Provider" thành **OpenAI Compatible**.
2. Đặt "Base URL" là `https://api.ourzai.com/v1`.
3. Nhập key của bạn vào "API Key".
4. Trong "Model ID", nhập ID của một model chat hỗ trợ `chat.completions`.

## Cursor {#cursor}

1. Mở Cursor Settings → Models.
2. Trong API Keys, nhập key của bạn làm OpenAI API Key, bật **Override OpenAI Base URL** và nhập `https://api.ourzai.com/v1`.
3. Thêm các ID model bạn muốn dùng vào danh sách model và bật chúng.

Key của bạn chỉ được dùng cho các model bạn chọn trong chat và Agent. Các tính năng có sẵn của Cursor, như gợi ý Tab, vẫn chạy trên dịch vụ của chính Cursor.

## Codex CLI {#codex}

Codex gọi model qua endpoint Responses, vì vậy hãy chọn model hỗ trợ `responses`. Thêm nội dung sau vào `~/.codex/config.toml`:

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

Sau đó đặt key trong terminal mà bạn dùng để khởi động Codex:

```bash
export ZAI_API_KEY="<your API key>"
```

Trong Windows PowerShell, dùng `$env:ZAI_API_KEY = "<your API key>"`.

## Claude Code {#claude-code}

Claude Code gọi model qua endpoint Messages của Anthropic, nên chỉ những model hỗ trợ `messages` mới dùng được. Đặt các biến môi trường sau trước khi khởi động:

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

- Không thêm `/v1` vào `ANTHROPIC_BASE_URL`: Claude Code tự nối thêm `/v1/messages`.
- Theo mặc định, Claude Code dùng các dòng model khác cho tác vụ nền và subagent. Hãy trỏ cả ba biến `ANTHROPIC_DEFAULT_*_MODEL` tới một model mà nền tảng cung cấp với `messages`, để nó không bao giờ yêu cầu một model mà nền tảng không có rồi nhận lỗi 404.
- Trong Windows PowerShell, đặt các biến tương tự bằng cú pháp `$env:NAME = "value"`.

## Các ứng dụng khách tương thích OpenAI khác {#other-clients}

Trong các ứng dụng như Chatbox, Cherry Studio, LobeChat, Open WebUI, Dify và n8n, hãy thêm một nhà cung cấp thuộc loại "tương thích OpenAI" hoặc "OpenAI tùy chỉnh" rồi điền ba thiết lập ở đầu trang này. Với các công cụ đọc biến môi trường chuẩn của OpenAI, xem [Sử dụng biến môi trường](./quickstart.md#env).

Nếu yêu cầu thất bại sau khi thiết lập, hãy tra mã trạng thái trong [Lỗi, Giới hạn và Mức sử dụng](./errors.md): lỗi 401 thường do sai key, còn lỗi 404 thường do viết sai ID model hoặc model không hỗ trợ endpoint đó.
