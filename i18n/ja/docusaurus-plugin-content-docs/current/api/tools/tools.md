---
id: tools
slug: /api/tools
title: コーディングツールで使う
sidebar_label: コーディングツール
description: Claude Code、Claude Desktop、Codex、Cursor、Cline などのコーディングツールで ZAI API を使うための共通設定と、各ツールのガイドへのリンクです。
sidebar_position: 0
update_docs: none
---

# コーディングツールで使う {#tools}

カスタムエンドポイントを設定できるコーディングツールやクライアントであれば、ZAI API を利用できます。どのツールでも必要な設定は次の 3 つです。

| 設定 | 値 |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1`（Anthropic プロトコルを使うツールでは `https://api.ourzai.com`。各ツールのページを参照） |
| API Key | [開発者コンソール](https://ourzai.com/console)の **API keys** ページで作成したキー |
| モデル | [モデル一覧](../models.md)のモデル ID（そのまま入力） |

ツールの画面はバージョンによって変わります。各ツールのページでは設定項目名を示しています。見つからない場合は、ツールが求める場所に上の 3 つを入力してください。コーディングツールは 1 つのタスクで多数のリクエストを送ることがあり、リクエストごとに使用量に応じて残高から差し引かれます。キーに利用上限を設定することをおすすめします。[キーの取得](../quickstart.md#get-key)を参照してください。

:::tip モデルが提供するエンドポイントを確認する
すべてのチャットモデルは `chat.completions` に対応していますが、`responses` や Anthropic の `messages` エンドポイントを提供するのは一部のモデルだけです。モデルを選ぶ前に、[モデル一覧と接続方法](../models.md)で各モデルのエンドポイントを確認してください。
:::

## ツールを選ぶ {#choose}

| ツール | 形態 | 必要なエンドポイント | ガイド |
| --- | --- | --- | --- |
| Claude Code | コマンドライン | `messages` | [Claude Code](./claude-code.md) |
| Claude Desktop | デスクトップアプリ（Chat、Cowork、Code） | `messages` | [Claude Desktop](./claude-desktop.md) |
| Codex CLI | コマンドライン | `responses` | [Codex CLI](./codex-cli.md) |
| Codex アプリ | デスクトップアプリ | `responses` | [Codex アプリ](./codex-app.md) |
| Cursor | エディター | `chat.completions` | [Cursor](./cursor.md) |
| Cline | エディター拡張機能 | `chat.completions` | [Cline](./cline.md) |

## その他の OpenAI 互換クライアント {#other-clients}

Chatbox、Cherry Studio、LobeChat、Open WebUI、Dify、n8n などのアプリでは、「OpenAI 互換」または「カスタム OpenAI」タイプのプロバイダーを追加し、このページ冒頭の 3 つの設定を入力してください。OpenAI の標準環境変数を読み取るツールについては、[環境変数を使う](../quickstart.md#env)を参照してください。

## うまくいかない場合 {#troubleshooting}

[エラー、制限、利用状況](../errors.md)でステータスコードを確認してください。401 はたいていキーの誤り、404 はたいていモデル ID の誤記か、そのエンドポイントに対応していないモデルです。
