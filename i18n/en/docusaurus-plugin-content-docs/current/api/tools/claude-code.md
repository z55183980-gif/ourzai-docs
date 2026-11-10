---
id: claude-code
title: Use with Claude Code
sidebar_label: Claude Code
description: Point the Claude Code command line at the ZAI API through the Anthropic Messages endpoint, with environment variables or settings.json.
sidebar_position: 1
update_docs: none
---

# Use with Claude Code {#claude-code}

Claude Code calls models through the Anthropic Messages endpoint, so only models that offer `messages` work. Check them in [Model catalog and integration](../models.md). This page covers the Claude Code command line; to use Code in the Claude desktop app, see [Claude Desktop](./claude-desktop.md).

## Use environment variables for one session {#env}

Set these environment variables in the terminal where you start Claude Code:

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

In Windows PowerShell, set the same variables with `$env:NAME = "value"`. These variables apply only to the current terminal.

## Save the settings permanently {#settings}

To avoid setting the variables every time, put them in the `env` field of `~/.claude/settings.json` (`%USERPROFILE%\.claude\settings.json` on Windows). After that, just run `claude`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.ourzai.com",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "ANTHROPIC_MODEL": "<model ID that offers messages>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<the same model ID>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<the same model ID>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<the same model ID>"
  }
}
```

This file stores your key in plain text. Do not commit it to a code repository or share it.

## Notes {#notes}

- Leave `/v1` out of `ANTHROPIC_BASE_URL`: Claude Code appends `/v1/messages` itself.
- Claude Code uses other model tiers by default for background tasks and subagents. Point all three `ANTHROPIC_DEFAULT_*_MODEL` variables at a model the platform offers with `messages`, so that it never requests a model the platform does not have and gets a 404.
- Type `/status` in Claude Code to see the endpoint and model it is currently using.

If requests fail after setup, look up the status code in [Errors, Limits, and Usage](../errors.md).
