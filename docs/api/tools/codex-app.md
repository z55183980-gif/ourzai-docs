---
id: codex-app
title: 在 Codex 桌面版中使用
sidebar_label: Codex 桌面版
description: Codex 桌面应用与 Codex CLI 共用 config.toml，配置 ZAI 服务商并让应用读到密钥。
sidebar_position: 4
update_docs: none
---

# 在 Codex 桌面版中使用 {#codex-app}

Codex 桌面应用和 Codex CLI、IDE 插件读取同一个配置文件 `~/.codex/config.toml`（Windows 为 `%USERPROFILE%\.codex\config.toml`）。Codex 通过 Responses 接口调用模型，要选开放 `responses` 的模型，在[模型目录与接入](../models.md)里查看。

## 添加服务商 {#config}

打开 `config.toml`（也可以在应用的设置里找到打开配置文件的入口），在文件顶层添加：

```toml
model = "<开放 responses 的模型 ID>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

- `model` 和 `model_provider` 要写在文件顶层。桌面应用不读取 `[profiles]` 里的设置。
- 已经按 [Codex CLI](./codex-cli.md) 配置过的，不用重复添加。

## 让桌面应用读到密钥 {#key}

`env_key` 指向环境变量 `ZAI_API_KEY`。从程序坞、开始菜单或启动台打开的桌面应用，不会读取 `~/.zshrc`、`~/.bashrc` 或 PowerShell 配置文件里的 `export`，需要把变量设成系统级。

macOS 在终端中执行：

```bash
launchctl setenv ZAI_API_KEY "<你的 API 密钥>"
```

这条设置在重启电脑后失效，重启后需要再执行一次。

Windows 在 PowerShell 中执行（长期生效）：

```powershell
setx ZAI_API_KEY "<你的 API 密钥>"
```

设置后完全退出 Codex 桌面应用（macOS 用 Command + Q；Windows 确认应用已不在后台运行），再重新打开。

## 验证 {#verify}

新建一个任务并发送消息，能正常回复即接入成功。如果提示缺少 `ZAI_API_KEY`，说明应用启动时没有读到变量：确认已执行上一步并完全退出后重开。其他错误按[错误、限制与用量](../errors.md)里的状态码排查：401 多半是密钥填错，404 多半是模型 ID 写错或该模型没有开放 `responses`。
