---
id: cursor
title: Use with Cursor
sidebar_label: Cursor
description: Enter your ZAI API key in Cursor and override the OpenAI base URL to use ZAI models in chat and Agent.
sidebar_position: 5
update_docs: none
---

# Use with Cursor {#cursor}

Cursor calls custom models through the `chat.completions` endpoint, so any chat model works. Find model IDs in [Model catalog and integration](../models.md).

## Setup {#setup}

1. Open Cursor Settings → Models.
2. Under API Keys, enter your key as the OpenAI API Key, turn on **Override OpenAI Base URL**, and enter `https://api.ourzai.com/v1`.
3. Add the model IDs you want to use to the model list and enable them.

## What uses your key {#scope}

Your own key is used only for the models you pick in chat and Agent. Cursor's built-in features, such as Tab completion, still run on Cursor's own service.

If requests fail after setup, look up the status code in [Errors, Limits, and Usage](../errors.md): a 401 usually means a wrong key, and a 404 usually means a misspelled model ID.
