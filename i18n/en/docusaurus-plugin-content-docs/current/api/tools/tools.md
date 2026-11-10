---
id: tools
slug: /api/tools
title: Use with Coding Tools
sidebar_label: Coding tools
description: Common settings for using the ZAI API in coding tools such as Claude Code, Claude Desktop, Codex, Cursor, and Cline, with links to each tool's guide.
sidebar_position: 0
update_docs: none
---

# Use with Coding Tools {#tools}

Any coding tool or client that accepts a custom endpoint can use the ZAI API. Every tool needs the same three settings:

| Setting | Value |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` (tools that use the Anthropic protocol take `https://api.ourzai.com`; see each tool's page) |
| API Key | A key created on the **API keys** page of the [developer console](https://ourzai.com/console) |
| Model | A model ID from the [model catalog](../models.md), entered exactly |

Tool interfaces change between versions. Each tool's page names its settings; if you cannot find one, fill in the three settings above wherever the tool asks for them. A coding tool can send many requests to finish one task, and each request is charged to your balance by usage, so consider setting a spending limit on the key. See [Get a key](../quickstart.md#get-key).

:::tip Check which endpoints a model offers
Every chat model supports `chat.completions`; only some models also offer `responses` or the Anthropic `messages` endpoint. Before choosing a model, check its endpoints in [Model catalog and integration](../models.md).
:::

## Choose your tool {#choose}

| Tool | Type | Endpoint needed | Guide |
| --- | --- | --- | --- |
| Claude Code | Command line | `messages` | [Claude Code](./claude-code.md) |
| Claude Desktop | Desktop app (Chat, Cowork, Code) | `messages` | [Claude Desktop](./claude-desktop.md) |
| Codex CLI | Command line | `responses` | [Codex CLI](./codex-cli.md) |
| Codex app | Desktop app | `responses` | [Codex app](./codex-app.md) |
| Cursor | Editor | `chat.completions` | [Cursor](./cursor.md) |
| Cline | Editor extension | `chat.completions` | [Cline](./cline.md) |

## Other OpenAI-compatible clients {#other-clients}

In apps such as Chatbox, Cherry Studio, LobeChat, Open WebUI, Dify, and n8n, add a provider of the "OpenAI compatible" or "custom OpenAI" type and fill in the three settings at the top of this page. For tools that read OpenAI's standard environment variables, see [Use environment variables](../quickstart.md#env).

## If setup fails {#troubleshooting}

Look up the status code in [Errors, Limits, and Usage](../errors.md): a 401 usually means a wrong key, and a 404 usually means a misspelled model ID or a model that does not support that endpoint.
