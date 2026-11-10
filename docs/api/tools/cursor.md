---
id: cursor
title: 在 Cursor 中使用
sidebar_label: Cursor
description: 在 Cursor 中填入 ZAI API 密钥并覆盖 OpenAI Base URL，在对话和 Agent 中使用 ZAI 模型。
sidebar_position: 5
update_docs: none
---

# 在 Cursor 中使用 {#cursor}

Cursor 通过 `chat.completions` 接口调用自定义模型，对话模型都可以使用，在[模型目录与接入](../models.md)里查看模型 ID。

## 配置步骤 {#setup}

1. 打开 Cursor Settings → Models。
2. 在 API Keys 中填入 OpenAI API Key，开启 **Override OpenAI Base URL**，填 `https://api.ourzai.com/v1`。
3. 在模型列表中添加要用的模型 ID 并启用。

## 使用范围 {#scope}

自定义密钥只用于你在对话和 Agent 中选择的这些模型；Tab 补全等 Cursor 自带功能仍由 Cursor 自己的服务提供。

接入后如果请求失败，按[错误、限制与用量](../errors.md)里的状态码排查：401 多半是密钥填错，404 多半是模型 ID 写错。
