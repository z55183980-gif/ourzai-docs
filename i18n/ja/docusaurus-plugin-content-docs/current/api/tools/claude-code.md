---
id: claude-code
title: Claude Code で使う
sidebar_label: Claude Code
description: 環境変数または settings.json で、Claude Code のコマンドラインから Anthropic Messages エンドポイント経由で ZAI API を使います。
sidebar_position: 1
update_docs: none
---

# Claude Code で使う {#claude-code}

Claude Code は Anthropic Messages エンドポイントでモデルを呼び出すため、`messages` を提供するモデルだけが使えます。[モデル一覧と接続方法](../models.md)で確認してください。このページはコマンドライン版の Claude Code を対象としています。Claude デスクトップアプリで Code を使う場合は、[Claude Desktop](./claude-desktop.md) を参照してください。

:::tip 手動での設定を省きたい場合
ZAI はデスクトップ向けの[キー管理ツール](./key-tool.mdx)を提供しています。API キーをまとめて管理し、接続の設定も行えます。[ダウンロードはこちら](./key-tool.mdx#download)
:::

## 環境変数で一時的に設定する {#env}

Claude Code を起動するターミナルで、次の環境変数を設定します。

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

Windows PowerShell では、`$env:NAME = "value"` の形式で同じ変数を設定します。これらの変数は現在のターミナルでのみ有効です。

## 設定ファイルに保存する {#settings}

毎回変数を設定しなくて済むように、`~/.claude/settings.json`（Windows では `%USERPROFILE%\.claude\settings.json`）の `env` フィールドに同じ変数を書き込みます。以降は `claude` を実行するだけです。

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

このファイルにはキーが平文で保存されます。コードリポジトリにコミットしたり、他人と共有したりしないでください。

## モデル選択メニューにすべてのモデルを表示する {#model-discovery}

Claude Code の `/model` モデル選択メニューは、既定ではクライアントに組み込まれたモデルだけを表示し、ZAI API のモデル一覧は読み込みません。そのため、プラットフォーム上のほかの Claude モデルは表示されません。プラットフォームが `messages` で提供する Claude モデルを選択メニューに表示するには、環境変数をもう 1 つ設定するか、`settings.json` の `env` フィールドに追加します。

```bash
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY="1"
```

有効にすると、Claude Code は起動するたびに `https://api.ourzai.com/v1/models` を呼び出し、ID に `claude` を含むモデルを選択メニューに追加します。組み込みの項目と同じモデルが重複して表示されることはありません。変更後は Claude Code を再起動してください。有効にしない場合でも、セッション内で `/model <model ID>` と入力すれば切り替えられます。

## 注意点 {#notes}

- `ANTHROPIC_BASE_URL` には `/v1` を付けません。Claude Code が `/v1/messages` を自動で付け加えます。
- Claude Code は、バックグラウンドタスクやサブエージェントに既定で別のモデル系統を使います。3 つの `ANTHROPIC_DEFAULT_*_MODEL` をすべて、プラットフォームが `messages` で提供するモデルに向けてください。プラットフォームにないモデルを要求して 404 が返るのを防げます。
- Claude Code で `/status` と入力すると、現在使用しているエンドポイントとモデルを確認できます。

設定後にリクエストが失敗する場合は、[エラー、制限、利用状況](../errors.md)でステータスコードを確認してください。
