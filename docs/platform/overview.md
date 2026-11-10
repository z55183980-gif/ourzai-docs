---
id: overview
title: 平台概览
description: ZAI 平台提供什么、各入口在哪里、一个账号怎样通用于各产品。
sidebar_position: 1
update_docs: none
---

# 平台概览 {#overview}

ZAI 是一个 AI 平台，目前提供三类产品：

- **AI 陪伴（遇见 Zai）**：面向想找 AI 伙伴聊天的人。在 zai.gg 聊日常、语音通话，选择形象与相处关系，并管理长期记忆。

- **API 调用**：面向开发者。一个 base_url、一把 API 密钥，对话、图像、视频、语音都走同一个入口，每次调用按用量从余额扣费。密钥、用量和充值在开发者控制台管理。
- **创作工作台（ZaiDrama）**：面向创作者。把想法、小说、剧本或产品介绍做成短剧、广告或讲解视频，剧本、角色、场景、分镜到成片都在同一个项目里完成。

三个产品共用同一个平台账号。API 与 ZaiDrama 共用美元余额；遇见 Zai 的免费版、会员和语音等权益在会员中查看。

## 入口一览 {#entry-points}

| 入口 | 地址 | 用途 |
| --- | --- | --- |
| 官网 | <https://ourzai.com> | 平台介绍，首页可以直接和平台助手 Zai 对话 |
| 遇见 Zai | <https://zai.gg> | AI 陪伴产品，见[快速开始](../zai/getting-started.md) |
| 开发者控制台 | <https://ourzai.com/console> | 创建和管理 API 密钥、查看使用记录、充值、查看可用模型 |
| 对外 API | `https://api.ourzai.com/v1` | 程序调用模型的地址，见 [API 快速开始](../api/quickstart.md) |
| ZaiDrama | <https://zaidrama.com> | AI 短剧创作应用，见 [ZaiDrama 入门教程](../zaidrama/getting-started.md) |
| 文档中心 | <https://docs.ourzai.com> | 本站 |

## 一个账号，通用于各产品 {#one-account}

平台账号用邮箱注册，注册一次即可登录遇见 Zai、开发者控制台和 ZaiDrama。各产品使用统一账号登录；已有有效登录状态时可直接进入，状态过期或需要验证时按提示重新登录。官网首页的「创作工作台」通往 ZaiDrama。

注册、登录、找回密码和账号安全见[账号、余额与支持](./account.md)。

## 平台余额与陪伴权益 {#credits}

API 与 ZaiDrama 的平台余额和扣费以美元计：

- 在 ZaiDrama 中生成图片、视频、配音会从余额扣费；
- 通过 API 调用模型会按每次调用的用量扣费；
- 与官网平台助手对话不扣平台余额。

余额可以在开发者控制台的「充值」页或 ZaiDrama 的「账单与余额」页充值，两处充值进入同一个余额，充值到账的余额不会过期。各模型的美元单价在控制台「模型定价」查看，或直接问首页的平台助手。

遇见 Zai 的会员有效期、语音回复时长、通话时长和加量包分别在[会员与用量](../zai/plans-and-usage.md)中说明。平台充值不等于购买 Zai Plus，余额也不能代表剩余语音额度。

## 首页的平台助手 {#platform-assistant}

官网首页的 Zai 是平台助手，是 AI，不是人工客服。它可以：

- 介绍平台和各产品，帮你找到该去的地方；
- 根据本站文档回答使用和接入问题，并附上来源链接；
- 查询当前可用的模型和公开的美元单价。

它看不到你的账号，不能查询余额、额度或订单，也不能替你操作。需要人工处理的事项见[联系与支持](./account.md#support)。

## 下一步 {#next-steps}

- 想找 AI 伙伴：从[遇见 Zai 快速开始](../zai/getting-started.md)开始第一次聊天；
- 开发者：从 [API 快速开始](../api/quickstart.md) 拿到密钥并发出第一个请求；
- 创作者：从 [ZaiDrama 入门教程](../zaidrama/getting-started.md) 开始第一部短剧；
- 账号或余额问题：见[账号、余额与支持](./account.md)。
