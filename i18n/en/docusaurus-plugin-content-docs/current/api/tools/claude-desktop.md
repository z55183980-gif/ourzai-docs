---
id: claude-desktop
title: Use with Claude Desktop
sidebar_label: Claude Desktop
description: Use the Claude desktop app's third-party inference configuration so that Chat, Cowork, and Code use the ZAI API.
sidebar_position: 2
update_docs: none
---

# Use with Claude Desktop {#claude-desktop}

The Claude desktop app (macOS and Windows) can switch to the ZAI API through its third-party inference configuration. Once configured, Chat, Cowork, and Code in the app all send requests to the ZAI API through the Anthropic Messages endpoint, charged to your balance by usage. Only models that offer `messages` work; check them in [Model catalog and integration](../models.md).

:::note Environment variables do not work in the desktop app
Local Code sessions in the desktop app use an endpoint the app sets itself, so `ANTHROPIC_BASE_URL` has no effect whether you set it in a terminal, in system environment variables, or in `~/.claude/settings.json`. Configure the app with the steps on this page instead. For the command line only, see [Claude Code](./claude-code.md).
:::

## Open the configuration window {#open}

1. Update the Claude desktop app to the latest version.
2. Turn on Developer mode: from the menu bar on macOS, or from the application menu (☰) in the top-left of the sign-in screen on Windows, choose **Help → Troubleshooting → Enable Developer Mode**.
3. Choose **Developer → Configure Third-Party Inference…** to open the configuration window.

If the **Developer** menu does not appear, repeat step 2. If it still does not appear, your app version does not support third-party inference yet; update the app first.

## Enter the connection details {#connection}

In the **Connection** section of the configuration window, set **Inference provider** to **Gateway**, then fill in:

| Setting | Value |
| --- | --- |
| Gateway base URL | `https://api.ourzai.com` (without `/v1`) |
| Gateway API key | Your API key |
| Credential kind | **Static API key** |
| Gateway auth scheme | **Bearer** |

The app appends `/v1/messages` and `/v1/models` to the base URL itself, so do not add `/v1` here.

## Choose models {#models}

By default the app calls `GET /v1/models` to discover models, and only puts model IDs it recognizes as Claude models in the model picker. If the model you want is not in the picker, add a model ID that offers `messages` to the model list in the configuration window, entered exactly.

## Apply the configuration {#apply}

Click **Apply Changes**. The app writes the configuration to this device and restarts. After it restarts, send a message in Chat, Cowork, or Code to confirm you get a reply. Later changes also take effect only after you apply them and the app restarts.

If the **Developer** menu is gone when you want to make changes again, turn Developer mode back on as in step 2 of [Open the configuration window](#open).

## Troubleshooting {#faq}

- **The model picker is empty**: check that the key is correct, or add model IDs manually as described in [Choose models](#models).
- **401**: the Gateway API key is wrong, or Gateway auth scheme is not **Bearer**.
- **404 or "model isn't available"**: the model ID is misspelled, or the model does not offer the `messages` endpoint.

For other status codes, see [Errors, Limits, and Usage](../errors.md).
