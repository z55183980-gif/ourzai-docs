---
id: overview
title: 平台概覽
description: ZAI 平台提供甚麼、各入口在哪裏、一個賬戶怎樣通用於各產品。
sidebar_position: 1
update_docs: none
---

# 平台概覽 {#overview}

ZAI 是一個 AI 平台，目前提供三類產品：

- **AI 陪伴（遇見 Zai）**：面向想找 AI 夥伴聊天的人。在 zai.gg 聊日常、語音通話，選擇形象與相處關係，並管理長期記憶。

- **API 調用**：面向開發者。一個 base_url、一把 API 密鑰，對話、圖像、影片、語音都走同一個入口，每次調用按用量從餘額扣費。密鑰、用量和增值在開發者控制台管理。
- **創作工作台（ZaiDrama）**：面向創作者。把想法、小說、劇本或產品介紹做成短劇、廣告或講解影片，劇本、角色、場景、分鏡到成片都在同一個項目裏完成。

三個產品共用同一個平台賬戶。API 與 ZaiDrama 共用美元餘額；遇見 Zai 的免費版、會員和語音等權益在會員中查看。

## 入口一覽 {#entry-points}

| 入口 | 地址 | 用途 |
| --- | --- | --- |
| 官網 | <https://ourzai.com> | 平台介紹，首頁可以直接和平台助手 Zai 對話 |
| 遇見 Zai | <https://zai.gg> | AI 陪伴產品，見[快速開始](../zai/getting-started.md) |
| 開發者控制台 | <https://ourzai.com/console> | 創建和管理 API 密鑰、查看使用記錄、增值、查看可用模型 |
| 對外 API | `https://api.ourzai.com/v1` | 程式調用模型的地址，見 [API 快速開始](../api/quickstart.md) |
| ZaiDrama | <https://zaidrama.com> | AI 短劇創作應用，見 [ZaiDrama 入門教程](../zaidrama/getting-started.md) |
| 文件中心 | <https://docs.ourzai.com/zh-HK/> | 本站 |

## 一個賬戶，通用於各產品 {#one-account}

平台賬戶用電郵註冊，註冊一次即可登入遇見 Zai、開發者控制台和 ZaiDrama。各產品使用統一賬戶登入；已有有效登入狀態時可直接進入，狀態過期或需要驗證時按提示重新登入。官網首頁的「創作工作台」通往 ZaiDrama。

註冊、登入、找回密碼和賬戶安全見[賬戶、餘額與支持](./account.md)。

## 平台餘額與陪伴權益 {#credits}

API 與 ZaiDrama 的平台餘額和扣費以美元計：

- 在 ZaiDrama 中生成圖片、影片、配音會從餘額扣費；
- 通過 API 調用模型會按每次調用的用量扣費；
- 與官網平台助手對話不扣平台餘額。

餘額可以在開發者控制台的「增值」頁或 ZaiDrama 的「賬單與餘額」頁增值，兩處增值進入同一個餘額，增值到賬的餘額不會過期。各模型的美元單價在控制台「模型定價」查看，或直接問首頁的平台助手。

遇見 Zai 的會員有效期、語音回覆時長、通話時長和加量包分別在[會員與用量](../zai/plans-and-usage.md)中說明。平台增值不等於購買 Zai Plus，餘額也不能代表剩餘語音額度。

## 首頁的平台助手 {#platform-assistant}

官網首頁的 Zai 是平台助手，是 AI，不是人工客服。它可以：

- 介紹平台和各產品，幫你找到該去的地方；
- 根據本站說明文件回答使用和接入問題，並附上來來源連結；
- 查詢當前可用的模型和公開的美元單價。

它看不到你的賬戶，不能查詢餘額、額度或訂單，也不能替你操作。需要人工處理的事項見[聯繫與支持](./account.md#support)。

## 下一步 {#next-steps}

- 想找 AI 夥伴：從[遇見 Zai 快速開始](../zai/getting-started.md)開始第一次聊天；
- 開發者：從 [API 快速開始](../api/quickstart.md) 取得密鑰並發出第一個請求；
- 創作者：從 [ZaiDrama 入門教程](../zaidrama/getting-started.md) 開始第一部短劇；
- 賬戶或餘額問題：見[賬戶、餘額與支持](./account.md)。
