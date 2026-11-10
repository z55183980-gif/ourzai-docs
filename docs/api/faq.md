---
id: faq
title: API 常见问题
sidebar_label: 常见问题
description: ZAI 开发者 API 的可用地区、付款、计费、价格、与官方 API 的区别和编程工具接入等常见问题。
sidebar_position: 6
update_docs: none
---

# API 常见问题 {#faq}

## ZAI 的 API 是什么？ {#what-is-it}

ZAI 开发者 API 是一个兼容 OpenAI 接口格式的模型网关：一把 API 密钥、一个 base_url（`https://api.ourzai.com/v1`），就能调用 GPT、Claude、Grok 等多家厂商的对话、图像、语音和视频模型。已有的 OpenAI SDK 或 HTTP 代码只要换 base_url 和密钥，见 [API 快速开始](./quickstart.md)。

## 在香港、台湾或海外可以用吗？ {#regions}

可以。API 面向各地开发者提供，在香港、台湾、东南亚等地都可以直接注册账号、充值并调用，请求统一发到 `https://api.ourzai.com`。使用时请遵守[服务条款](https://ourzai.com/legal/terms.html)和所在地法律。

## 怎么付款？ {#payment}

在[开发者控制台](https://ourzai.com/console)的「充值」页购买充值包，付款由 Stripe 处理，可用的付款方式以结账页显示为准。到账的是美元余额，不会过期，详见[余额](../platform/account.md#credits)。

## 怎么收费？有月费吗？ {#billing}

没有月费，也不需要订阅。每次调用按实际用量从美元余额扣费，计费单位因模型类型而不同（每百万 Token 或每个计费单位）；视频任务只在成功出片时计费一次。详见[费用与用量](./errors.md#billing)。

## 价格和官方 API 比怎么样？ {#price}

控制台「模型定价」列出每个模型的美元单价，并标出相对厂商公开原价的折扣。价格会调整，以该页实时显示为准。

## 和直接用 OpenAI、Anthropic 的官方 API 有什么不同？ {#vs-official}

- 一把密钥调用多家厂商的模型，用量和账单在同一个控制台查看。
- 接口统一按 OpenAI 格式，Claude 对话模型也可以用 `/v1/chat/completions` 调用；开放原生 `messages` 接口的 Claude 模型还可以直接用 Anthropic SDK，见[接口与能力](./endpoints.md)。
- 模型 ID 以本平台为准，同一厂商的不同型号开放的接口不一定相同，见[模型目录与接入](./models.md)。
- 上游厂商偶尔故障或限流时，请求可能返回 502/503，需要等待并退避重试，见[服务暂时不可用](./errors.md#status-5xx)。

## 能在 Cursor、Cline、Claude Code、Codex 里用吗？ {#tools}

可以。各工具填写 base_url、密钥和模型的位置，见[在编程工具中使用](./tools.md)。

## 遇到问题找谁？ {#support}

写信到 support@ourzai.com，附上注册邮箱、出错时间和响应里的错误信息，不要附 API 密钥。其他联系渠道见[联系与支持](../platform/account.md#support)。
