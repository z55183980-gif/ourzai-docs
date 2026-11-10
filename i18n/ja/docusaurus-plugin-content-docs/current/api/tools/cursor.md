---
id: cursor
title: Cursor で使う
sidebar_label: Cursor
description: Cursor に ZAI API キーを入力して OpenAI の Base URL を上書きし、チャットと Agent で ZAI のモデルを使います。
sidebar_position: 5
update_docs: none
---

# Cursor で使う {#cursor}

Cursor はカスタムモデルを `chat.completions` エンドポイントで呼び出すため、チャットモデルであればどれでも使えます。モデル ID は[モデル一覧と接続方法](../models.md)で確認してください。

## 設定手順 {#setup}

1. Cursor Settings → Models を開きます。
2. API Keys で OpenAI API Key としてキーを入力し、**Override OpenAI Base URL** をオンにして `https://api.ourzai.com/v1` を入力します。
3. 使いたいモデル ID をモデル一覧に追加し、有効にします。

## キーが使われる範囲 {#scope}

独自のキーが使われるのは、チャットと Agent で選んだモデルだけです。Tab 補完など Cursor の組み込み機能は、引き続き Cursor 自身のサービスで動作します。

設定後にリクエストが失敗する場合は、[エラー、制限、利用状況](../errors.md)でステータスコードを確認してください。401 はたいていキーの誤り、404 はたいていモデル ID の誤記です。
