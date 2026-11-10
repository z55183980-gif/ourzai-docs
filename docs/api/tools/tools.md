---
id: tools
slug: /api/tools
title: 在编程工具中使用
sidebar_label: 编程工具接入
description: 在 Claude Code、Claude 桌面版、Codex、Cursor、Cline 等编程工具里接入 ZAI API 的通用设置与各工具教程入口。
sidebar_position: 0
update_docs: none
---

# 在编程工具中使用 {#tools}

支持自定义接口地址的编程工具和客户端，都可以接入 ZAI API。各工具需要的是同样三项设置：

| 设置 | 填写 |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1`（Anthropic 协议的工具填 `https://api.ourzai.com`，见各工具页面） |
| API Key | 在[开发者控制台](https://ourzai.com/console)「API 密钥」里新建的密钥 |
| 模型 | [模型目录](../models.md)中的模型 ID，原样填写 |

工具界面会随版本变化，各工具页面写的是配置项名称；找不到时按上表三项对应填写。编程工具完成一次任务可能连续发出很多请求，每次都按用量从余额扣费，建议给这把密钥设置总额度，见[拿密钥](../quickstart.md#get-key)。

:::tip 先确认模型开放的接口
对话模型都支持 `chat.completions`；只有部分模型开放 `responses` 或 Anthropic `messages` 接口。选型前先在[模型目录与接入](../models.md)里查看每个模型开放的接口。
:::

## 选择你的工具 {#choose}

| 工具 | 形态 | 需要的接口 | 教程 |
| --- | --- | --- | --- |
| Claude Code | 命令行 | `messages` | [Claude Code](./claude-code.md) |
| Claude 桌面版 | 桌面应用（Chat、Cowork、Code） | `messages` | [Claude 桌面版](./claude-desktop.md) |
| Codex CLI | 命令行 | `responses` | [Codex CLI](./codex-cli.md) |
| Codex 桌面版 | 桌面应用 | `responses` | [Codex 桌面版](./codex-app.md) |
| Cursor | 编辑器 | `chat.completions` | [Cursor](./cursor.md) |
| Cline | 编辑器插件 | `chat.completions` | [Cline](./cline.md) |

## 其他 OpenAI 兼容客户端 {#other-clients}

Chatbox、Cherry Studio、LobeChat、Open WebUI、Dify、n8n 等应用，在「OpenAI 兼容」或「自定义 OpenAI」类型的服务商里按开头的三项设置填写即可。读取 OpenAI 标准环境变量的工具，见[用环境变量](../quickstart.md#env)。

## 接入失败时 {#troubleshooting}

按[错误、限制与用量](../errors.md)里的状态码排查：401 多半是密钥填错，404 多半是模型 ID 写错或模型不支持该接口。
