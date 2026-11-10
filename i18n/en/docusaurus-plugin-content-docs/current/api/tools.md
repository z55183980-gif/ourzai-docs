---
id: tools
title: Use with Coding Tools
sidebar_label: Coding tools
description: Configure the ZAI API base_url, key, and model in coding tools such as Cline, Cursor, Codex CLI, and Claude Code.
sidebar_position: 5
update_docs: none
---

# Use with Coding Tools {#tools}

Any coding tool or client that accepts a custom OpenAI-compatible endpoint can use the ZAI API. Every tool needs the same three settings:

| Setting | Value |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` |
| API Key | A key created on the **API keys** page of the [developer console](https://ourzai.com/console) |
| Model | A model ID from the [model catalog](./models.md), entered exactly |

Tool interfaces change between versions. The steps below name each tool's settings; if you cannot find one, fill in the three settings above wherever the tool asks for them. A coding tool can send many requests to finish one task, and each request is charged to your balance by usage, so consider setting a spending limit on the key. See [Get a key](./quickstart.md#get-key).

:::tip Check which endpoints a model offers
Every chat model supports `chat.completions`; only some models also offer `responses` or the Anthropic `messages` endpoint. Codex needs `responses` and Claude Code needs `messages`. Before choosing a model, check its endpoints in [Model catalog and integration](./models.md).
:::

## Cline {#cline}

1. Open Cline's settings and set "API Provider" to **OpenAI Compatible**.
2. Set "Base URL" to `https://api.ourzai.com/v1`.
3. Enter your key in "API Key".
4. In "Model ID", enter the ID of a chat model that supports `chat.completions`.

## Cursor {#cursor}

1. Open Cursor Settings → Models.
2. Under API Keys, enter your key as the OpenAI API Key, turn on **Override OpenAI Base URL**, and enter `https://api.ourzai.com/v1`.
3. Add the model IDs you want to use to the model list and enable them.

Your own key is used only for the models you pick in chat and Agent. Cursor's built-in features, such as Tab completion, still run on Cursor's own service.

## Codex CLI {#codex}

Codex calls models through the Responses endpoint, so choose a model that offers `responses`. Add the following to `~/.codex/config.toml`:

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

Then set the key in the terminal where you start Codex:

```bash
export ZAI_API_KEY="<your API key>"
```

In Windows PowerShell, use `$env:ZAI_API_KEY = "<your API key>"`.

## Claude Code {#claude-code}

Claude Code calls models through the Anthropic Messages endpoint, so only models that offer `messages` work. Set these environment variables before starting it:

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

- Leave `/v1` out of `ANTHROPIC_BASE_URL`: Claude Code appends `/v1/messages` itself.
- Claude Code uses other model tiers by default for background tasks and subagents. Point all three `ANTHROPIC_DEFAULT_*_MODEL` variables at a model the platform offers with `messages`, so that it never requests a model the platform does not have and gets a 404.
- In Windows PowerShell, set the same variables with `$env:NAME = "value"`.

## Other OpenAI-compatible clients {#other-clients}

In apps such as Chatbox, Cherry Studio, LobeChat, Open WebUI, Dify, and n8n, add a provider of the "OpenAI compatible" or "custom OpenAI" type and fill in the three settings at the top of this page. For tools that read OpenAI's standard environment variables, see [Use environment variables](./quickstart.md#env).

If requests fail after setup, look up the status code in [Errors, Limits, and Usage](./errors.md): a 401 usually means a wrong key, and a 404 usually means a misspelled model ID or a model that does not support that endpoint.
