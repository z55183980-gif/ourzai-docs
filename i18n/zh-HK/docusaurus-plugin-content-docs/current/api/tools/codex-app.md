---
id: codex-app
title: 在 Codex 桌面版中使用
sidebar_label: Codex 桌面版
description: Codex 桌面應用程式與 Codex CLI 共用 config.toml，設定 ZAI 服務商並讓應用程式讀到密鑰。
sidebar_position: 4
update_docs: none
---

# 在 Codex 桌面版中使用 {#codex-app}

Codex 桌面應用程式和 Codex CLI、IDE 擴充功能讀取同一個設定檔 `~/.codex/config.toml`（Windows 為 `%USERPROFILE%\.codex\config.toml`）。Codex 透過 Responses 接口調用模型，要選開放 `responses` 的模型，在[模型目錄與接入](../models.md)裡查看。

## 加入服務商 {#config}

打開 `config.toml`（也可以在應用程式的設定裡找到打開設定檔的入口），在檔案頂層加入：

```toml
model = "<开放 responses 的模型 ID>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

- `model` 和 `model_provider` 要寫在檔案頂層。桌面應用程式不讀取 `[profiles]` 裡的設定。
- 已經按 [Codex CLI](./codex-cli.md) 設定過的，不用重複加入。

## 讓桌面應用程式讀到密鑰 {#key}

`env_key` 指向環境變數 `ZAI_API_KEY`。從 Dock、開始選單或 Launchpad 打開的桌面應用程式，不會讀取 `~/.zshrc`、`~/.bashrc` 或 PowerShell 設定檔裡的 `export`，需要把變數設為系統層級。

macOS 在終端機中執行：

```bash
launchctl setenv ZAI_API_KEY "<你的 API 密钥>"
```

這項設定在重新啟動電腦後失效，重新啟動後需要再執行一次。

Windows 在 PowerShell 中執行（長期生效）：

```powershell
setx ZAI_API_KEY "<你的 API 密钥>"
```

設定後完全退出 Codex 桌面應用程式（macOS 用 Command + Q；Windows 確認應用程式已不在背景執行），再重新打開。

## 驗證 {#verify}

新建一個任務並發送訊息，能正常回覆即接入成功。如果提示缺少 `ZAI_API_KEY`，說明應用程式啟動時沒有讀到變數：確認已執行上一步並完全退出後重開。其他錯誤按[錯誤、限制與用量](../errors.md)裡的狀態碼排查：401 多半是密鑰填錯，404 多半是模型 ID 寫錯或該模型沒有開放 `responses`。
