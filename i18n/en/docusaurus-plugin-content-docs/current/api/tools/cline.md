---
id: cline
title: Use with Cline
sidebar_label: Cline
description: Choose the OpenAI Compatible provider in Cline and enter the ZAI API base URL, key, and model ID.
sidebar_position: 6
update_docs: none
---

# Use with Cline {#cline}

Cline calls models through the `chat.completions` endpoint, so any chat model works. Find model IDs in [Model catalog and integration](../models.md).

## Setup {#setup}

1. Open Cline's settings and set "API Provider" to **OpenAI Compatible**.
2. Set "Base URL" to `https://api.ourzai.com/v1`.
3. Enter your key in "API Key".
4. In "Model ID", enter the ID of a chat model that supports `chat.completions`.

Cline sends many requests in a row to finish one task, so consider setting a spending limit on the key. See [Get a key](../quickstart.md#get-key). If requests fail after setup, look up the status code in [Errors, Limits, and Usage](../errors.md).
