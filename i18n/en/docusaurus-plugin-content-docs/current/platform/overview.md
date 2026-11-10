---
id: overview
title: Platform Overview
description: What the ZAI platform offers, where to find each entry point, and how one account works across all products.
sidebar_position: 1
update_docs: none
---

# Platform Overview {#overview}

ZAI is an AI platform that currently offers three product categories:

- **AI Companionship (Meet Zai)**: For people looking for an AI partner to chat with. Chat casually and make voice calls on zai.gg, choose an avatar and relationship dynamic, and manage long-term memory.

- **API Access**: For developers. One base URL, one API key—chat, image, video, and voice all go through a single entry point, with each call billed from your balance based on usage. Manage keys, usage, and top-ups in the developer console.
- **Creation workspace (ZaiDrama)**: For creators. Turn ideas, novels, scripts, or product introductions into short dramas, ads, or explainer videos. Script, characters, scenes, storyboards, and final output all happen within a single project.

All three products share the same platform account. API and ZaiDrama share a USD balance; Meet Zai's free tier, membership, and voice allowances are detailed in the companion plan.

## Entry Points at a Glance {#entry-points}

| Entry Point | URL | Purpose |
| --- | --- | --- |
| Official Website | <https://ourzai.com> | Platform introduction. The homepage lets you chat directly with the platform assistant, Zai. |
| Meet Zai | <https://zai.gg> | AI companionship product. See [Quick Start](../zai/getting-started.md). |
| Developer Console | <https://ourzai.com/console> | Create and manage API keys, view usage, top up, and browse available models. |
| Public API | `https://api.ourzai.com/v1` | The endpoint for programmatic model calls. See [API Quick Start](../api/quickstart.md). |
| ZaiDrama | <https://zaidrama.com> | AI short drama creation app. See [ZaiDrama Getting Started](../zaidrama/getting-started.md). |
| Documentation Center | <https://docs.ourzai.com/en/> | This site. |

## One Account for All Products {#one-account}

Platform accounts are registered with an email address. Register once and you can log in to Meet Zai, the developer console, and ZaiDrama. All products use the same account login; if you already have a valid session, you can enter directly. If the session expires or verification is required, log in again as prompted. The "Creation workspace" link on the official homepage leads to ZaiDrama.

For registration, login, password recovery, and account security, see [Account, Balance & Support](./account.md).

## Platform Balance and Companion Benefits {#credits}

The platform balance for API and ZaiDrama is denominated and billed in USD:

- Generating images, videos, and voiceovers in ZaiDrama deducts from your balance;
- Calling models via the API deducts from your balance based on usage per call;
- Chatting with the platform assistant on the official website does not deduct from your platform balance.

You can top up the balance on the "Top up" page in the developer console or the "Billing & Balance" page in ZaiDrama. Both top-up locations add to the same balance, and topped-up balance never expires. Per-model USD pricing is available under "Pricing" in the console, or you can ask the homepage's platform assistant directly.

Meet Zai's membership validity, voice reply duration, call duration, and add-on packs are explained in [Companion Plans & Usage](../zai/plans-and-usage.md). Topping up your platform balance is not the same as purchasing Zai Plus, and your balance does not represent remaining voice allowance.

## Platform Assistant on the Homepage {#platform-assistant}

The Zai on the official homepage is a platform assistant—an AI, not human customer support. It can:

- Introduce the platform and its products, helping you find where to go;
- Answer usage and integration questions based on this site's documentation, with source links;
- Look up currently available models and their public USD pricing.

It cannot see your account, check your balance, allowance, or orders, nor act on your behalf. For matters requiring human assistance, see [Contact & Support](./account.md#support).

## Next Steps {#next-steps}

- Looking for an AI companion: start your first chat with the [Meet Zai Quick Start](../zai/getting-started.md);
- Developers: get your API key and make your first request with the [API Quick Start](../api/quickstart.md);
- Creators: start your first short drama with the [ZaiDrama Getting Started](../zaidrama/getting-started.md);
- Account or balance issues: see [Account, Balance & Support](./account.md).
