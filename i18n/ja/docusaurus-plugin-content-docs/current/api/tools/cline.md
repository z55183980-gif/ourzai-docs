---
id: cline
title: Cline で使う
sidebar_label: Cline
description: Cline で OpenAI Compatible プロバイダーを選び、ZAI API の Base URL、キー、モデル ID を入力します。
sidebar_position: 6
update_docs: none
---

# Cline で使う {#cline}

Cline は `chat.completions` エンドポイントでモデルを呼び出すため、チャットモデルであればどれでも使えます。モデル ID は[モデル一覧と接続方法](../models.md)で確認してください。

## 設定手順 {#setup}

1. Cline の設定を開き、「API Provider」で **OpenAI Compatible** を選びます。
2. 「Base URL」に `https://api.ourzai.com/v1` を入力します。
3. 「API Key」にキーを入力します。
4. 「Model ID」に、`chat.completions` に対応するチャットモデルの ID を入力します。

Cline は 1 つのタスクで多数のリクエストを続けて送るため、キーに利用上限を設定することをおすすめします。[キーの取得](../quickstart.md#get-key)を参照してください。設定後にリクエストが失敗する場合は、[エラー、制限、利用状況](../errors.md)でステータスコードを確認してください。
