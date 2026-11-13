---
id: claude-desktop
title: Claude Desktop で使う
sidebar_label: Claude Desktop
description: Claude デスクトップアプリのサードパーティ推論設定で、Chat、Cowork、Code から ZAI API を使います。
sidebar_position: 2
update_docs: none
---

# Claude Desktop で使う {#claude-desktop}

Claude デスクトップアプリ（macOS、Windows）は、サードパーティ推論の設定で ZAI API に切り替えられます。設定後は、アプリ内の Chat、Cowork、Code のリクエストがすべて Anthropic Messages エンドポイント経由で ZAI API に送られ、使用量に応じて残高から差し引かれます。`messages` を提供するモデルだけが使えます。[モデル一覧と接続方法](../models.md)で確認してください。

:::tip 手動での設定を省きたい場合
ZAI はデスクトップ向けの[キー管理ツール](./key-tool.mdx)を提供しています。API キーをまとめて管理し、接続の設定も行えます。[ダウンロードはこちら](./key-tool.mdx#download)
:::

:::note デスクトップアプリでは環境変数は効きません
デスクトップアプリの Code のローカルセッションは、アプリ自身が設定するエンドポイントを使います。そのため `ANTHROPIC_BASE_URL` は、ターミナル、システムの環境変数、`~/.claude/settings.json` のどこで設定しても反映されません。このページの手順でアプリ内から設定してください。コマンドラインだけを使う場合は、[Claude Code](./claude-code.md) を参照してください。
:::

## 設定ウィンドウを開く {#open}

1. Claude デスクトップアプリを最新バージョンに更新します。
2. 開発者モードをオンにします。macOS ではメニューバー、Windows ではサインイン画面左上のアプリケーションメニュー（☰）から **Help → Troubleshooting → Enable Developer Mode** を選びます。
3. **Developer → Configure Third-Party Inference…** を選び、設定ウィンドウを開きます。

**Developer** メニューが表示されない場合は、手順 2 をもう一度行ってください。それでも表示されない場合、そのバージョンのアプリはまだサードパーティ推論に対応していません。先にアプリを更新してください。

## 接続情報を入力する {#connection}

設定ウィンドウの **Connection** セクションで **Inference provider** を **Gateway** にし、次のように入力します。

| 設定項目 | 値 |
| --- | --- |
| Gateway base URL | `https://api.ourzai.com`（`/v1` は付けない） |
| Gateway API key | API キー |
| Credential kind | **Static API key** |
| Gateway auth scheme | **Bearer** |

アプリが Base URL の後ろに `/v1/messages` と `/v1/models` を自動で付け加えるため、ここでは `/v1` を付けないでください。

入力したら、**Test connection** をクリックして接続を確認してから次に進めます。

![Claude Desktop のサードパーティ推論設定ウィンドウ：Connection セクションで Gateway を選び、ZAI API の接続情報を入力した状態](/img/tools/claude-desktop-gateway-light.png#light-only)
![Claude Desktop のサードパーティ推論設定ウィンドウ：Connection セクションで Gateway を選び、ZAI API の接続情報を入力した状態](/img/tools/claude-desktop-gateway-dark.png#dark-only)

## モデルを選ぶ {#models}

アプリは既定で `GET /v1/models` を呼び出してモデルを検出し、Claude のモデルとして認識できる ID だけをモデル選択メニューに表示します。使いたいモデルが表示されない場合は、設定ウィンドウのモデル一覧に `messages` を提供するモデル ID をそのまま手動で追加してください。

## 設定を適用する {#apply}

**Apply Changes** をクリックすると、アプリが設定をこのデバイスに書き込んで再起動します。再起動後、Chat、Cowork、Code のいずれかでメッセージを送り、返信が届くことを確認してください。後から設定を変更した場合も、適用してアプリが再起動するまでは反映されません。

再度変更するときに **Developer** メニューが消えている場合は、[設定ウィンドウを開く](#open)の手順 2 で開発者モードをもう一度オンにしてください。

## トラブルシューティング {#faq}

- **モデル選択メニューが空**：キーが正しいか確認するか、[モデルを選ぶ](#models)の方法でモデル ID を手動で追加してください。
- **401**：Gateway API key が誤っているか、Gateway auth scheme が **Bearer** になっていません。
- **404 または「モデルを利用できません」**：モデル ID の誤記か、そのモデルが `messages` エンドポイントを提供していません。

その他のステータスコードは、[エラー、制限、利用状況](../errors.md)を参照してください。
