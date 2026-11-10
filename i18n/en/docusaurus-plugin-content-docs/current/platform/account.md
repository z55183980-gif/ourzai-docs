---
id: account
title: Account, Credits & Support
description: Registration, login, password recovery, account security, credit top-ups and rewards, refunds, and contact channels.
sidebar_position: 2
update_docs: none
---

# Account, Credits & Support {#account}

## Registration {#register}

Every product has a registration entry point. Signing up from anywhere creates the same ZAI account — register once and use it to log in to all products:

| Where to register | Entry point | After registration |
| --- | --- | --- |
| Official website | "Sign Up" in the top-right corner, or "No account yet? Sign Up" in the login window | You stay on the current page after logging in |
| Developer Console | "Go to Sign Up" at the bottom of the login page | You are logged in automatically and taken to the Console |
| Meet Zai | The registration entry on the [zai.gg](https://zai.gg) login page | You enter the companion product as prompted on the page |
| ZaiDrama | From the login popup, switch to "Create your ZAI account"; you can enter an invitation code | You go directly into ZaiDrama |

When registering with an email address:

- You need to enter the 6-digit verification code sent to your email (valid for 10 minutes; you can resend after 60 seconds);
- The password must be at least 6 characters and include both letters and numbers;
- Each email address can only be registered once. If it is already registered, you will see "This email is already registered" — just log in instead.

If you chatted with Zai on the official website homepage before registering, that conversation will carry over into your new account.

## Logging In {#sign-in}

- Log in with the email and password you registered with.
- The official website, Meet Zai, and ZaiDrama share the same account login. If you already have a valid active session, you can enter directly; if the session has expired or verification is required, log in again as prompted on the page.
- When the login page offers Google sign-in, you can also choose "Continue with Google"; the first time, an account will be created following the on-page flow.
- If you are already logged in on the official website, clicking "Creation workspace" on the homepage takes you into ZaiDrama without a password.
- Login sessions renew automatically; if too many devices are logged in to the same account at once, the oldest session will be logged out.

## Forgot Password {#reset-password}

In the login window, click "Forgot password?", enter your registered email, and set a new password after receiving the verification code. To avoid revealing whether an email is registered, the page will also say a code has been sent when you enter an unregistered email.

## Account Security {#account-security}

In ZaiDrama's "Profile" you can:

- Change your bound email (after changing, use the new email to log in to all products);
- Change your password;
- View "Logged-in devices" and sign out unfamiliar devices one by one;
- Delete your account: enter your full email and password, review what will be cleared, and confirm again. After submitting, you will be logged out; data cleanup may take time, and the result shown on the page is final. Account deletion is irreversible.

Never share your password, verification code, or API keys with anyone, including anyone claiming to be support staff.

## Credits {#credits}

- **A single balance**: Credits are denominated in US dollars. The balance in the top-right corner of the Developer Console and the balance in ZaiDrama are the same account. Image, video, and voice generation in ZaiDrama, as well as API calls to models, are all deducted from this balance; chatting with the assistant on the official website does not consume platform credits.
- **Top up**: Buy top-up packs on the "Top up" page in the Developer Console or the "Billing & Balance" page in ZaiDrama. Each top-up pack states the credited amount (in USD, including any bonus portion); packs priced in CNY are paid in CNY, but the credited amount is still a USD balance. Payments are processed by Stripe, which supports bank cards, Alipay, and WeChat Pay. The platform does not store card details; Alipay and WeChat Pay credits may be slightly delayed, but are applied automatically once payment is confirmed.
- **No expiry**: Top-up credits never expire.
- **Unit prices**: USD prices for each model (per million tokens or per billing unit) are listed under "Pricing" in the Console. Every ZaiDrama generation is charged as "rate × usage", accurate to $0.0001, with a minimum of $0.0001; the confirmation card and approval bar show a quote before you start.
- **Display**: Balance-type figures (top-right balance, balance card, cumulative top-ups / spending) show 2 decimal places and are truncated downward, for example `$1,234.56`; hovering reveals the exact 4-decimal value. Individual charges, statements, quotes, and similar line items show 4 decimal places, for example `$0.0123`.
- **Records**: The "Billing" tab on the Console "Top up" page and the "Billing & Balance" page in ZaiDrama show top-up records; API consumption is under "Usage" in the Console, and ZaiDrama deduction details are under "Billing & Balance".

### Rewards {#rewards}

ZaiDrama's "Welfare Center" offers:

- **Daily login reward**: When the event is active and you meet the conditions, logging in to ZaiDrama automatically claims it; when the page provides a claim button, you can also follow the prompts. Amounts, frequency, and cumulative caps are governed by the current event rules;
- **Referral reward**: Invite new users through an invitation link or code and receive credit rewards according to the event rules.

Reward amounts go into the same balance. Specific amounts are shown on the Welfare Center page.

## Meet Zai Companion Plans {#companion-plans}

Meet Zai uses the same platform account, but the free tier, Zai Plus, voice replies and call minutes, and add-on packs are managed on the companion product's membership page. Topping up platform credits is not the same as buying a membership, and it does not convert the credit balance into voice minutes.

To view current benefits, renewal dates, and purchase and expiry rules, see [Companion Plans & Usage](../zai/plans-and-usage.md). For chat, avatar, and memory operations, start with the [Meet Zai Quick Start](../zai/getting-started.md).

## Refunds {#refunds}

Refund rules are in Section 6, "Subscriptions, Payments & Refunds," of the [Terms of Service](https://ourzai.com/legal/terms.html). Specific rules on pricing and refunds are as shown on the purchase page. To request a refund, write to support@ourzai.com with your registered email and order details.

## Contact & Support {#support}

| Channel | Best for | Who can use it |
| --- | --- | --- |
| Zai on the official website homepage | Learning about the platform, finding docs, checking available models and public unit prices | Everyone, no registration required |
| Developer Console "New chat" | Asking Zai directly how to call APIs or choose models after logging in | Logged-in users |
| ZaiDrama "Help & Feedback" | Issues during creation; live human support; you can send screenshots | Logged-in ZaiDrama users |
| [Official website contact page](https://ourzai.com/contact) | Reaching live support or viewing other contact channels | Everyone |
| support@ourzai.com | Account issues, refund requests, business inquiries | Everyone |

If Zai on the official website homepage is temporarily unavailable, a "Transfer to human support" button appears, and your previous conversation will be forwarded to support together with you.

## Terms & Privacy {#legal}

- [Terms of Service](https://ourzai.com/legal/terms.html) ([English](https://ourzai.com/legal/terms-en.html))
- [Privacy Policy](https://ourzai.com/legal/privacy.html) ([English](https://ourzai.com/legal/privacy-en.html))
