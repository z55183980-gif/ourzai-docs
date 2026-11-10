---
id: faq
title: API 常見問題
sidebar_label: 常見問題
description: ZAI 開發者 API 的可用地區、付款、計費、價格、與官方 API 的分別和編程工具接入等常見問題。
sidebar_position: 6
update_docs: none
---

# API 常見問題 {#faq}

## ZAI 的 API 是甚麼？ {#what-is-it}

ZAI 開發者 API 是一個兼容 OpenAI 接口格式的模型網關：一把 API 密鑰、一個 base_url（`https://api.ourzai.com/v1`），就能調用 GPT、Claude、Grok 等多家廠商的對話、圖像、語音和影片模型。已有的 OpenAI SDK 或 HTTP 程式碼只要換 base_url 和密鑰，見 [API 快速開始](./quickstart.md)。

## 在香港、台灣或海外可以用嗎？ {#regions}

可以。API 面向各地開發者提供，在香港、台灣、東南亞等地都可以直接註冊賬戶、增值並調用，請求統一發到 `https://api.ourzai.com`。使用時請遵守[服務條款](https://ourzai.com/legal/terms.html)和所在地法律。

## 怎樣付款？ {#payment}

在[開發者控制台](https://ourzai.com/console)的「增值」頁購買增值包，付款由 Stripe 處理，可用的付款方式以結賬頁顯示為準。到賬的是美元餘額，不會過期，詳見[餘額](../platform/account.md#credits)。

## 怎樣收費？有月費嗎？ {#billing}

沒有月費，也不需要訂閱。每次調用按實際用量從美元餘額扣費，計費單位因模型類型而不同（每百萬 Token 或每個計費單位）；影片任務只在成功出片時計費一次。詳見[費用與用量](./errors.md#billing)。

## 價格和官方 API 比較怎樣？ {#price}

控制台「模型定價」列出每個模型的美元單價，並標出相對廠商公開原價的折扣。價格會調整，以該頁實時顯示為準。

## 和直接用 OpenAI、Anthropic 的官方 API 有甚麼分別？ {#vs-official}

- 一把密鑰調用多家廠商的模型，用量和賬單在同一個控制台查看。
- 接口統一按 OpenAI 格式，Claude 對話模型也可以用 `/v1/chat/completions` 調用；開放原生 `messages` 接口的 Claude 模型還可以直接用 Anthropic SDK，見[接口與能力](./endpoints.md)。
- 模型 ID 以本平台為準，同一廠商的不同型號開放的接口不一定相同，見[模型目錄與接入](./models.md)。
- 上游廠商偶爾故障或限流時，請求可能返回 502/503，需要等待並退避重試，見[服務暫時不可用](./errors.md#status-5xx)。

## 能在 Cursor、Cline、Claude Code、Codex 裡用嗎？ {#tools}

可以。各工具填寫 base_url、密鑰和模型的位置，見[在編程工具中使用](./tools.md)。

## 遇到問題找誰？ {#support}

寫電郵到 support@ourzai.com，附上註冊電郵、出錯時間和回應裡的錯誤資訊，不要附上 API 密鑰。其他聯絡渠道見[聯絡與支援](../platform/account.md#support)。
