---
id: cline
title: 在 Cline 中使用
sidebar_label: Cline
description: 在 Cline 中选择 OpenAI Compatible 服务商，填写 ZAI API 的 Base URL、密钥和模型 ID。
sidebar_position: 6
update_docs: none
---

# 在 Cline 中使用 {#cline}

Cline 通过 `chat.completions` 接口调用模型，对话模型都可以使用，在[模型目录与接入](../models.md)里查看模型 ID。

## 配置步骤 {#setup}

1. 打开 Cline 的设置，「API Provider」选 **OpenAI Compatible**。
2. 「Base URL」填 `https://api.ourzai.com/v1`。
3. 「API Key」填你的密钥。
4. 「Model ID」填一个支持 `chat.completions` 的对话模型 ID。

Cline 完成一个任务会连续发出很多请求，建议给这把密钥设置总额度，见[拿密钥](../quickstart.md#get-key)。接入后如果请求失败，按[错误、限制与用量](../errors.md)里的状态码排查。
