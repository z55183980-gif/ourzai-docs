---
id: codex-app
title: Codex アプリで使う
sidebar_label: Codex アプリ
description: Codex デスクトップアプリは Codex CLI と config.toml を共有します。ZAI をプロバイダーとして追加し、アプリがキーを読み取れるようにします。
sidebar_position: 4
update_docs: none
---

# Codex アプリで使う {#codex-app}

Codex デスクトップアプリは、Codex CLI や IDE 拡張機能と同じ設定ファイル `~/.codex/config.toml`（Windows では `%USERPROFILE%\.codex\config.toml`）を読み取ります。Codex は Responses エンドポイントでモデルを呼び出すため、`responses` を提供するモデルを選んでください。[モデル一覧と接続方法](../models.md)で確認できます。

:::tip 手動での設定を省きたい場合
ZAI はデスクトップ向けの[キー管理ツール](./key-tool.md)を提供しています。API キーをまとめて管理し、接続の設定も行えます。[ダウンロードはこちら](./key-tool.md#download)
:::

## プロバイダーを追加する {#config}

`config.toml` を開き（アプリの設定から設定ファイルを開くこともできます）、ファイルの最上位に次の内容を追加します。

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

- `model` と `model_provider` はファイルの最上位に書いてください。デスクトップアプリは `[profiles]` 内の設定を読み取りません。
- [Codex CLI](./codex-cli.md) をすでに設定済みであれば、追加し直す必要はありません。

## アプリがキーを読み取れるようにする {#key}

`env_key` は環境変数 `ZAI_API_KEY` を指します。Dock、スタートメニュー、Launchpad から開いたデスクトップアプリは、`~/.zshrc`、`~/.bashrc`、PowerShell プロファイルの `export` を読み取らないため、変数をシステム全体に設定する必要があります。

macOS では、ターミナルで次を実行します。

```bash
launchctl setenv ZAI_API_KEY "<your API key>"
```

この設定はコンピューターを再起動すると消えるため、再起動後にもう一度実行してください。

Windows では、PowerShell で次を実行します（設定は保持されます）。

```powershell
setx ZAI_API_KEY "<your API key>"
```

その後、Codex デスクトップアプリを完全に終了し（macOS では Command + Q。Windows ではアプリがバックグラウンドで動いていないことを確認）、もう一度開きます。

## 動作を確認する {#verify}

新しいタスクを作成してメッセージを送ります。返信が届けば設定は完了です。`ZAI_API_KEY` が見つからないと表示される場合、アプリは起動時に変数を読み取れていません。前の手順を確認し、アプリを完全に終了してから開き直してください。その他のエラーは、[エラー、制限、利用状況](../errors.md)でステータスコードを確認してください。401 はたいていキーの誤り、404 はたいていモデル ID の誤記か、`responses` を提供していないモデルです。
