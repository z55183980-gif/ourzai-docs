---
id: errors
title: Errors, Limits, and Usage
description: API error format and common status codes, balance and quotas, request size and timeout limits, and troubleshooting advice.
sidebar_position: 3
update_docs: none
---

# Errors, Limits, and Usage {#errors}

## Error Format {#error-format}

The error body format depends on the API protocol and the stage at which the error occurs:

- **OpenAI-compatible APIs**: `{"error": {"type": "...", "message": "..."}}`, with some errors including `code`;
- **Anthropic-compatible APIs**: `{"type": "error", "error": {"type": "...", "message": "..."}}`;
- **API key and billing checks** (before the request reaches the model): `{"code": "...", "message": "..."}`.

When troubleshooting, check the HTTP status code first, then look at `code` or `type`.

## Common Status Codes {#status-codes}

### 400 Bad Request {#status-400}

- The request body is empty or not valid JSON, is missing `model`, or has a field with the wrong type;
- A video request includes a field the model does not support: `video_input_unsupported`, and `field` indicates which field it is;
- The model service rejected the request content: `upstream_rejected`, possibly with a `upstream_code` returned by the model service.

### 401 Authentication Failed {#status-401}

| code | Meaning | What to do |
| --- | --- | --- |
| `API_KEY_REQUIRED` | No API key provided | Check the `Authorization: Bearer <YOUR_API_KEY>` request header |
| `INVALID_API_KEY` | Invalid API key | Verify the key in the console or create a new one |
| `API_KEY_DISABLED` | API key disabled | Re-enable it in the console |

Passing the API key only as a URL query parameter does not count as valid authentication and returns `API_KEY_REQUIRED`.

### 402 Insufficient Balance {#status-402}

`insufficient_credits`: The account's available balance is insufficient. Top up on the "Top up" page in the console and try again.

### 403 Forbidden {#status-403}

| code | Meaning | What to do |
| --- | --- | --- |
| `API_KEY_EXPIRED` | API key expired | Update its validity period in the console or create a new key |
| `ACCESS_DENIED` | Source IP is not on the allowlist or is on the blocklist | Check the key's IP settings |

### 404 Not Found {#status-404}

- `model_not_found`: The model name is misspelled, or your account cannot use this model;
- The model does not support the called API (for example, calling an image-generation endpoint with a chat model);
- The request path does not exist, often because the base_url is missing `/v1`.

### 409 Video Not Ready {#status-409}

`video_not_ready`: The video is still being generated. Request the download again later.

### 413 Request Body Too Large {#status-413}

The request body exceeds the limit. See [Request Limits](#limits).

### 429 Quota or Rate Limit Exceeded {#status-429}

| Scenario | Response | What to do |
| --- | --- | --- |
| API key total quota used up | `API_KEY_QUOTA_EXHAUSTED` | Increase the quota in the console or reset used quota |
| Concurrent request limit exceeded | `gateway_concurrency_limit` | Reduce concurrency and retry after waiting |
| Model service rate limiting | `upstream_rate_limited` | Retry after waiting; if the response includes `Retry-After`, wait as directed |

### 5xx Service Temporarily Unavailable {#status-5xx}

- 502 `upstream_unavailable`: The model service is temporarily unavailable;
- 503 `no_available_account` or Service temporarily unavailable: No service capacity is currently available.

These errors can be retried later; exponential backoff is recommended.

## Request Limits {#limits}

| Limit | Value |
| --- | --- |
| Maximum request body size | 100MB |
| Read timeout | The connection read timeout is 600 seconds; the model API or client may time out earlier. This is not the maximum execution time for the entire task |
| Usage query range | Up to 90 days |

Key-level total quota, validity period, and IP restrictions are configured by you in the console; account-level request rate and concurrency limits are set by the platform and return 429 when exceeded.

## Billing and Usage {#billing}

- API calls are charged based on actual usage from your USD balance each time. The balance is shared with ZaiDrama creation; for balance and top-ups, see [Account, Credits, and Support](../platform/account.md#credits).
- USD unit prices for each model (per million tokens or per billing unit) are available under "Pricing" in the console.
- Video tasks are billed only once, when a video is successfully produced.
- Call details are available under "Usage" in the console. Each record includes the model, API, whether it was streaming, token count, cost (USD), and duration, and can be exported as CSV.
- When the balance is insufficient, the returned message looks like `余额不足：这次调用至少需要 $x，当前可用 $y，请充值后再试`.

## Troubleshooting Checklist {#troubleshooting}

1. **All requests return 404**: Check whether the base_url was written as `https://api.ourzai.com/v1` (with `/v1`).
2. **401**: Check whether the request header is `Authorization: Bearer <YOUR_API_KEY>` and whether the API key is complete and has not been disabled.
3. **A specific model returns 404**: Check whether the model name matches "Pricing" and whether the model supports the API you are calling.
4. **402, 403, or 429**: Check available balance, API key total quota, validity period, IP settings, and concurrency.
5. **Video stays in `pending`**: Video generation takes some time; poll at intervals. `expired` means the task has expired and must be resubmitted.
6. **Still unresolved**: Email support@ourzai.com with the time the issue occurred, the API called, the model name, and the error response. Do not include the full API key.
