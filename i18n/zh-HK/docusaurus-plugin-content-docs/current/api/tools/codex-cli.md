---
id: codex-cli
title: 在 Codex CLI 中使用
sidebar_label: Codex CLI
description: 在 ~/.codex/config.toml 中加入 ZAI 服務商，讓 Codex CLI 透過 Responses 接口調用 ZAI API。
sidebar_position: 3
update_docs: none
---

# 在 Codex CLI 中使用 {#codex}

Codex 透過 Responses 接口調用模型，要選開放 `responses` 的模型，在[模型目錄與接入](../models.md)裡查看。本頁適用於命令列版 Codex；Codex 桌面應用程式見 [Codex 桌面版](./codex-app.md)。

## 加入服務商 {#config}

在 `~/.codex/config.toml`（Windows 為 `%USERPROFILE%\.codex\config.toml`）中加入：

```toml
model = "<开放 responses 的模型 ID>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

`env_key` 寫的是環境變數的名稱，不是密鑰本身，密鑰不會儲存在這個檔案裡。

## 設定密鑰 {#key}

在啟動 Codex 的終端機裡設定密鑰，再執行 `codex`：

```bash
export ZAI_API_KEY="<你的 API 密钥>"
codex
```

Windows PowerShell 寫作 `$env:ZAI_API_KEY = "<你的 API 密鑰>"`。想長期生效，把 `export` 這一行寫進 `~/.zshrc` 或 `~/.bashrc`；Windows 可以在「系統內容 → 環境變數」裡加入使用者變數 `ZAI_API_KEY`，然後重新打開終端機。

接入後如果請求失敗，按[錯誤、限制與用量](../errors.md)裡的狀態碼排查：404 多半是模型 ID 寫錯或該模型沒有開放 `responses`。
