---
id: codex-cli
title: 在 Codex CLI 中使用
sidebar_label: Codex CLI
description: 在 ~/.codex/config.toml 中添加 ZAI 服务商，让 Codex CLI 通过 Responses 接口调用 ZAI API。
sidebar_position: 3
update_docs: none
---

# 在 Codex CLI 中使用 {#codex}

Codex 通过 Responses 接口调用模型，要选开放 `responses` 的模型，在[模型目录与接入](../models.md)里查看。本页适用于命令行版 Codex；Codex 桌面应用见 [Codex 桌面版](./codex-app.md)。

## 添加服务商 {#config}

在 `~/.codex/config.toml`（Windows 为 `%USERPROFILE%\.codex\config.toml`）中添加：

```toml
model = "<开放 responses 的模型 ID>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

`env_key` 写的是环境变量的名称，不是密钥本身，密钥不会保存在这个文件里。

## 设置密钥 {#key}

在启动 Codex 的终端里设置密钥，再运行 `codex`：

```bash
export ZAI_API_KEY="<你的 API 密钥>"
codex
```

Windows PowerShell 写作 `$env:ZAI_API_KEY = "<你的 API 密钥>"`。想长期生效，把 `export` 这一行写进 `~/.zshrc` 或 `~/.bashrc`；Windows 可以在「系统属性 → 环境变量」里添加用户变量 `ZAI_API_KEY`，然后重新打开终端。

接入后如果请求失败，按[错误、限制与用量](../errors.md)里的状态码排查：404 多半是模型 ID 写错或该模型没有开放 `responses`。
