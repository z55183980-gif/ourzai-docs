---
id: codex-cli
title: Use with Codex CLI
sidebar_label: Codex CLI
description: Add ZAI as a provider in ~/.codex/config.toml so that Codex CLI calls the ZAI API through the Responses endpoint.
sidebar_position: 3
update_docs: none
---

# Use with Codex CLI {#codex}

Codex calls models through the Responses endpoint, so choose a model that offers `responses`. Check them in [Model catalog and integration](../models.md). This page covers the Codex command line; for the Codex desktop app, see [Codex app](./codex-app.md).

:::tip Prefer not to configure by hand?
ZAI offers a desktop [key management tool](./key-tool.mdx) that keeps your API keys in one place and sets up access for you. [Go to download](./key-tool.mdx#download)
:::

## Add the provider {#config}

Add the following to `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` on Windows):

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

`env_key` holds the name of an environment variable, not the key itself, so your key is not stored in this file.

## Set the key {#key}

Set the key in the terminal where you start Codex, then run `codex`:

```bash
export ZAI_API_KEY="<your API key>"
codex
```

In Windows PowerShell, use `$env:ZAI_API_KEY = "<your API key>"`. To make it permanent, add the `export` line to `~/.zshrc` or `~/.bashrc`; on Windows, add a user variable named `ZAI_API_KEY` under System Properties → Environment Variables, then reopen the terminal.

If requests fail after setup, look up the status code in [Errors, Limits, and Usage](../errors.md): a 404 usually means a misspelled model ID or a model that does not offer `responses`.
