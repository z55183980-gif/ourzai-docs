---
id: tools
title: コーディングツールで使う
sidebar_label: コーディングツール
description: Cline、Cursor、Codex CLI、Claude Code などのコーディングツールで、ZAI API の base_url、キー、モデルを設定します。
sidebar_position: 5
update_docs: none
---

# コーディングツールで使う {#tools}

OpenAI 互換のカスタムエンドポイントを設定できるコーディングツールやクライアントであれば、ZAI API を利用できます。どのツールでも必要な設定は次の 3 つです。

| 設定 | 値 |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` |
| API Key | [開発者コンソール](https://ourzai.com/console)の **API keys** ページで作成したキー |
| モデル | [モデル一覧](./models.md)のモデル ID（そのまま入力） |

ツールの画面はバージョンによって変わります。以下では各ツールの設定項目名を示します。見つからない場合は、ツールが求める場所に上の 3 つを入力してください。コーディングツールは 1 つのタスクで多数のリクエストを送ることがあり、リクエストごとに使用量に応じて残高から差し引かれます。キーに利用上限を設定することをおすすめします。[キーの取得](./quickstart.md#get-key)を参照してください。

:::tip モデルが提供するエンドポイントを確認する
すべてのチャットモデルは `chat.completions` に対応していますが、`responses` や Anthropic の `messages` エンドポイントを提供するのは一部のモデルだけです。Codex には `responses`、Claude Code には `messages` が必要です。モデルを選ぶ前に、[モデル一覧と接続方法](./models.md)で各モデルのエンドポイントを確認してください。
:::

## Cline {#cline}

1. Cline の設定を開き、「API Provider」で **OpenAI Compatible** を選びます。
2. 「Base URL」に `https://api.ourzai.com/v1` を入力します。
3. 「API Key」にキーを入力します。
4. 「Model ID」に、`chat.completions` に対応したチャットモデルの ID を入力します。

## Cursor {#cursor}

1. Cursor Settings → Models を開きます。
2. API Keys で OpenAI API Key としてキーを入力し、**Override OpenAI Base URL** をオンにして `https://api.ourzai.com/v1` を入力します。
3. 使いたいモデル ID をモデル一覧に追加し、有効にします。

独自のキーが使われるのは、チャットと Agent で選んだモデルだけです。Tab 補完など Cursor の組み込み機能は、引き続き Cursor 自身のサービスで動作します。

## Codex CLI {#codex}

Codex は Responses エンドポイントでモデルを呼び出すため、`responses` を提供するモデルを選んでください。`~/.codex/config.toml` に次を追加します。

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

続いて、Codex を起動するターミナルでキーを設定します。

```bash
export ZAI_API_KEY="<your API key>"
```

Windows PowerShell では `$env:ZAI_API_KEY = "<your API key>"` と書きます。

## Claude Code {#claude-code}

Claude Code は Anthropic Messages エンドポイントでモデルを呼び出すため、`messages` を提供するモデルだけが使えます。起動前に次の環境変数を設定します。

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

- `ANTHROPIC_BASE_URL` には `/v1` を付けません。Claude Code が `/v1/messages` を自動で付け足します。
- Claude Code は、バックグラウンドタスクやサブエージェントに既定で別のモデル系統を使います。3 つの `ANTHROPIC_DEFAULT_*_MODEL` をすべて、プラットフォームが `messages` で提供するモデルに向けてください。プラットフォームにないモデルを要求して 404 が返るのを防げます。
- Windows PowerShell では、`$env:NAME = "value"` の形式で同じ変数を設定します。

## その他の OpenAI 互換クライアント {#other-clients}

Chatbox、Cherry Studio、LobeChat、Open WebUI、Dify、n8n などのアプリでは、「OpenAI 互換」や「カスタム OpenAI」タイプのプロバイダーを追加し、このページ冒頭の 3 つの設定を入力します。OpenAI の標準環境変数を読み取るツールについては、[環境変数の使用](./quickstart.md#env)を参照してください。

設定後にリクエストが失敗する場合は、[エラー、制限、利用状況](./errors.md)でステータスコードを確認してください。401 はたいていキーの誤り、404 はたいていモデル ID の誤記か、そのエンドポイントに対応していないモデルです。
