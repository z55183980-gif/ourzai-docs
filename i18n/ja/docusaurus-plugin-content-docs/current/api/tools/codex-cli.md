---
id: codex-cli
title: Codex CLI で使う
sidebar_label: Codex CLI
description: ~/.codex/config.toml に ZAI をプロバイダーとして追加し、Codex CLI から Responses エンドポイント経由で ZAI API を使います。
sidebar_position: 3
update_docs: none
---

# Codex CLI で使う {#codex}

Codex は Responses エンドポイントでモデルを呼び出すため、`responses` を提供するモデルを選んでください。[モデル一覧と接続方法](../models.md)で確認できます。このページはコマンドライン版の Codex を対象としています。Codex デスクトップアプリについては、[Codex アプリ](./codex-app.md)を参照してください。

:::tip 手動での設定を省きたい場合
ZAI はデスクトップ向けの[キー管理ツール](./key-tool.md)を提供しています。API キーをまとめて管理し、接続の設定も行えます。[ダウンロードはこちら](./key-tool.md#download)
:::

## プロバイダーを追加する {#config}

`~/.codex/config.toml`（Windows では `%USERPROFILE%\.codex\config.toml`）に次の内容を追加します。

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

`env_key` に書くのは環境変数の名前で、キーそのものではありません。キーはこのファイルに保存されません。

## キーを設定する {#key}

Codex を起動するターミナルでキーを設定し、`codex` を実行します。

```bash
export ZAI_API_KEY="<your API key>"
codex
```

Windows PowerShell では `$env:ZAI_API_KEY = "<your API key>"` と書きます。常に有効にするには、`export` の行を `~/.zshrc` または `~/.bashrc` に追記します。Windows では「システムのプロパティ → 環境変数」でユーザー変数 `ZAI_API_KEY` を追加し、ターミナルを開き直してください。

設定後にリクエストが失敗する場合は、[エラー、制限、利用状況](../errors.md)でステータスコードを確認してください。404 はたいていモデル ID の誤記か、`responses` を提供していないモデルです。
