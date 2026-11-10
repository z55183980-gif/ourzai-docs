---
id: quickstart
title: API Quickstart
description: Get an API key from the console, change base_url to https://api.ourzai.com/v1, and send your first request.
sidebar_position: 1
update_docs: none
---

# API Quickstart {#quickstart}

Getting started with the ZAI API takes just three steps: get a key, change base_url, and send a request. ZAI's public API is compatible with the OpenAI interface format: existing OpenAI SDK or HTTP code can call models on the platform by simply changing the base_url and API key. Chat, image, video, and audio all go through the same entry point, with charges deducted from your USD balance based on actual usage.

| Item | Value |
| --- | --- |
| base_url (OpenAI-compatible SDK) | `https://api.ourzai.com/v1` |
| Authentication | Request header `Authorization: Bearer <YOUR_API_KEY>` |
| Keys & usage | [Developer Console](https://ourzai.com/console) |

## 1. Get a key {#get-key}

1. Open the [Developer Console](https://ourzai.com/console) and log in with your platform account. If you don't have an account yet, you can register directly on the login page; see [Account, Billing & Support](../platform/account.md#register).
2. Go to **API keys**, click **New**, and enter a name.
3. Configure as needed:
   - **Validity period**: choose 7 days, 30 days, 90 days, or a custom date, up to 3650 days. If no validity limit is enabled, the key remains valid indefinitely.
   - **Total spending limit**: when enabled, set the maximum USD amount this key can consume. When disabled, the key has no spending cap of its own, but requests are still limited by the account's available balance.
   - **IP allowlist / blocklist**: single IP or CIDR, up to 100 entries per list.
4. After creation, a usage example will pop up that you can copy directly.

Full keys are masked by default in the console; you can click to view and copy them at any time. A key looks like `sk-` followed by a string of hexadecimal characters. On the same page, you can later disable, enable, edit the validity period and limit, or delete the key.

:::caution Keep your key safe
A key is equivalent to spending authority on your account. Never put it in frontend code, commit it to a code repository, or share it with others. If you suspect a leak, disable or delete it in the console immediately and create a new one.
:::

## 2. Change base_url {#set-base-url}

Change the address used by the OpenAI-compatible SDK or HTTP request to `https://api.ourzai.com/v1`, then choose a model that supports the corresponding endpoint. Different models may support different parameters.

- **The `/v1` is required**: OpenAI-compatible SDKs append paths like `/chat/completions` to base_url. Missing `/v1` will result in a 404.
- When using the Anthropic SDK to call `/v1/messages`, set base_url to `https://api.ourzai.com` (the SDK will add `/v1` itself).

## 3. Send your first request {#first-request}

First pick a chat-capable model from **Pricing** in the console and put its name in the `model` field.

### cURL {#curl}

```bash
curl https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Python {#python}

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.ourzai.com/v1",
    api_key="<YOUR_API_KEY>",
)

response = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "Hello"}],
)
print(response.choices[0].message.content)
```

### Node.js {#nodejs}

```js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.ourzai.com/v1",
  apiKey: process.env.ZAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "<MODEL_ID>",
  messages: [{ role: "user", content: "Hello" }],
});
console.log(response.choices[0].message.content);
```

### Using environment variables {#env}

Many tools read OpenAI's standard environment variables, so you don't need to change any code after setting them:

```bash
export OPENAI_BASE_URL="https://api.ourzai.com/v1"
export OPENAI_API_KEY="<YOUR_API_KEY>"
```

## 4. Streaming output {#streaming}

The chat endpoint supports SSE streaming output. Add `"stream": true` to the request body; usage is the same as OpenAI. If an error occurs after the stream has started, it will be returned as an SSE event, and the client needs to handle it.

## 5. Which models are supported and how much do they cost {#models}

- **Pricing in the console**: lists the models offered by the platform, the endpoints each model supports (chat, embeddings, image generation, video generation, etc.), and the USD unit price (per million tokens or per billing unit), along with the base_url. This is the authoritative source.
- **`GET /v1/models`**: use your API key to fetch the model list programmatically.

Put the model name directly into the request's `model` field. If a model doesn't support the endpoint you're calling, it will return a 404; see [Errors, Limits & Usage](./errors.md).

## 6. View usage {#usage}

The **Usage** page in the console lets you filter by time, key, and model to view request counts, tokens, cost (USD), usage trends, and distribution by model. You can also export call details as CSV, with a query range of up to 90 days. The **API keys** page shows each key's spending for today and in total.

API calls and ZaiDrama creation share the same USD balance. To top up, see [Account, Billing & Support](../platform/account.md#credits).

## Next steps {#next-steps}

- [Endpoints & Capabilities](./endpoints.md): all chat, image, audio, video, and other endpoints.
- [Errors, Limits & Usage](./errors.md): error codes, request limits, and FAQ.

## Integrate by model {#model-guides}

[Model catalog and integration](./models.md) — Choose a model to see its exposed endpoints and complete request examples. Use the exact model ID; models from the same provider do not necessarily support the same interfaces.
