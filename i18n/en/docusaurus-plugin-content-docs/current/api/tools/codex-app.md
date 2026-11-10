---
id: codex-app
title: Use with the Codex App
sidebar_label: Codex app
description: The Codex desktop app shares config.toml with Codex CLI. Add ZAI as a provider and make sure the app can read your key.
sidebar_position: 4
update_docs: none
---

# Use with the Codex App {#codex-app}

The Codex desktop app reads the same configuration file as Codex CLI and the IDE extension: `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` on Windows). Codex calls models through the Responses endpoint, so choose a model that offers `responses`. Check them in [Model catalog and integration](../models.md).

## Add the provider {#config}

Open `config.toml` (the app's settings also offer a way to open the configuration file) and add the following at the top level of the file:

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

- Put `model` and `model_provider` at the top level of the file. The desktop app does not read settings under `[profiles]`.
- If you already configured [Codex CLI](./codex-cli.md), you do not need to add this again.

## Make the key available to the app {#key}

`env_key` points to the environment variable `ZAI_API_KEY`. A desktop app opened from the Dock, Start menu, or Launchpad does not read `export` lines in `~/.zshrc`, `~/.bashrc`, or your PowerShell profile, so the variable must be set system-wide.

On macOS, run this in Terminal:

```bash
launchctl setenv ZAI_API_KEY "<your API key>"
```

This setting is cleared when you restart your computer, so run it again after a restart.

On Windows, run this in PowerShell (it persists):

```powershell
setx ZAI_API_KEY "<your API key>"
```

Then quit the Codex desktop app completely (Command + Q on macOS; on Windows, make sure the app is no longer running in the background) and open it again.

## Verify {#verify}

Start a new task and send a message. If you get a reply, the setup works. If the app reports that `ZAI_API_KEY` is missing, it did not see the variable when it started: check the previous step, then quit the app completely and reopen it. For other errors, look up the status code in [Errors, Limits, and Usage](../errors.md): a 401 usually means a wrong key, and a 404 usually means a misspelled model ID or a model that does not offer `responses`.
