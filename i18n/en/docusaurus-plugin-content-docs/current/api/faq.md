---
id: faq
title: API FAQ
sidebar_label: FAQ
description: Common questions about the ZAI developer API, including where it is available, payment, billing, pricing, how it differs from official APIs, and coding tool setup.
sidebar_position: 6
update_docs: none
---

# API FAQ {#faq}

## What is the ZAI API? {#what-is-it}

The ZAI developer API is a model gateway that follows the OpenAI API format. With one API key and one base_url (`https://api.ourzai.com/v1`), you can call chat, image, speech, and video models from GPT, Claude, Grok, and other vendors. Existing OpenAI SDK or HTTP code only needs a new base_url and key. See [API Quickstart](./quickstart.md).

## Can I use it in Hong Kong, Taiwan, or other regions? {#regions}

Yes. The API is offered to developers everywhere. In Hong Kong, Taiwan, Southeast Asia, and other regions you can sign up, top up, and make calls directly; all requests go to `https://api.ourzai.com`. Follow the [Terms of Service](https://ourzai.com/legal/terms.html) and the laws where you are.

## How do I pay? {#payment}

Buy a top-up package on the **Top up** page of the [developer console](https://ourzai.com/console). Payments are processed by Stripe, and the checkout page shows the payment methods available to you. Top-ups arrive as a US dollar balance that never expires. See [Credits](../platform/account.md#credits).

## How am I charged? Is there a monthly fee? {#billing}

There is no monthly fee and no subscription. Each call is charged to your US dollar balance by actual usage. The billing unit depends on the model type (per million tokens or per billing unit), and a video task is charged once, only when the video is generated successfully. See [Billing and Usage](./errors.md#billing).

## How do prices compare with the official APIs? {#price}

The **Pricing** page in the console lists each model's US dollar price along with its discount from the vendor's public list price. Prices change; the page always shows the current ones.

## How is it different from using the official OpenAI or Anthropic API directly? {#vs-official}

- One key calls models from several vendors, and usage and billing for all of them are in one console.
- Endpoints follow the OpenAI format, so Claude chat models can also be called through `/v1/chat/completions`. Claude models that offer the native `messages` endpoint can also be used directly with the Anthropic SDK. See [Interfaces and Capabilities](./endpoints.md).
- Model IDs are this platform's own, and different models from the same vendor do not necessarily offer the same endpoints. See [Model catalog and integration](./models.md).
- When an upstream vendor has an outage or rate limit, requests may return 502/503; wait and retry with backoff. See [5xx Service Temporarily Unavailable](./errors.md#status-5xx).

## Can I use it in Cursor, Cline, Claude Code, or Codex? {#tools}

Yes. For where each tool takes the base_url, key, and model, see [Use with Coding Tools](./tools/tools.md).

## Who do I contact when something goes wrong? {#support}

Email support@ourzai.com with your account email, the time of the error, and the error message from the response. Do not include your API key. For other contact channels, see [Contact & Support](../platform/account.md#support).
