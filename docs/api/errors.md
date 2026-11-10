---
id: errors
title: 错误、限制与用量
description: API 的错误格式与常见状态码、余额与额度、请求大小与超时限制，以及排查建议。
sidebar_position: 3
update_docs: none
---

# 错误、限制与用量 {#errors}

## 错误格式 {#error-format}

错误体的格式随接口协议和错误发生阶段而定：

- **OpenAI 兼容接口**：`{"error": {"type": "...", "message": "..."}}`，部分错误带 `code`；
- **Anthropic 兼容接口**：`{"type": "error", "error": {"type": "...", "message": "..."}}`；
- **密钥与计费检查**（在请求进入模型之前）：`{"code": "...", "message": "..."}`。

排查时优先看 HTTP 状态码，再看 `code` 或 `type`。

## 常见状态码 {#status-codes}

### 400 请求有误 {#status-400}

- 请求体为空或不是合法 JSON、缺少 `model`、字段类型不对；
- 视频请求带了模型不支持的字段：`video_input_unsupported`，`field` 指出是哪个字段；
- 模型服务拒绝了请求内容：`upstream_rejected`，可能带模型服务返回的 `upstream_code`。

### 401 鉴权失败 {#status-401}

| code | 含义 | 怎么办 |
| --- | --- | --- |
| `API_KEY_REQUIRED` | 没有带密钥 | 检查请求头 `Authorization: Bearer <密钥>` |
| `INVALID_API_KEY` | 密钥无效 | 到控制台核对或新建密钥 |
| `API_KEY_DISABLED` | 密钥已停用 | 在控制台重新启用 |

只在 URL 查询参数中传密钥不算有效鉴权，会返回 `API_KEY_REQUIRED`。

### 402 余额不足 {#status-402}

`insufficient_credits`：账户可用余额不足，请到控制台「充值」页充值后重试。

### 403 无权使用 {#status-403}

| code | 含义 | 怎么办 |
| --- | --- | --- |
| `API_KEY_EXPIRED` | 密钥已过期 | 在控制台修改有效期或新建密钥 |
| `ACCESS_DENIED` | 来源 IP 不在白名单或在黑名单中 | 检查密钥的 IP 设置 |

### 404 找不到 {#status-404}

- `model_not_found`：模型名写错，或你的账号不能使用这个模型；
- 模型不支持所调用的接口（例如用对话模型调生图）；
- 请求路径不存在，常见原因是 base_url 漏了 `/v1`。

### 409 视频未就绪 {#status-409}

`video_not_ready`：视频还在生成，稍后再请求下载。

### 413 请求体过大 {#status-413}

请求体超过上限，见[请求限制](#limits)。

### 429 超出额度或频率 {#status-429}

| 场景 | 返回 | 怎么办 |
| --- | --- | --- |
| 密钥总额度用完 | `API_KEY_QUOTA_EXHAUSTED` | 在控制台提高额度或重置已用额度 |
| 并发请求超限 | `gateway_concurrency_limit` | 降低并发，等待后重试 |
| 模型服务限流 | `upstream_rate_limited` | 等待后重试；响应有 `Retry-After` 时按其指示等待 |

### 5xx 服务暂时不可用 {#status-5xx}

- 502 `upstream_unavailable`：模型服务暂时不可用；
- 503 `no_available_account` 或 Service temporarily unavailable：暂时没有可用的服务容量。

这类错误可以稍后重试，建议使用指数退避。

## 请求限制 {#limits}

| 限制 | 值 |
| --- | --- |
| 单个请求体大小 | 100MB |
| 无响应等待 | 接入层读取超时为 600 秒；模型接口或客户端可能更早超时，这不是整个任务的最长执行时间 |
| 用量查询范围 | 最长 90 天 |

密钥级的总额度、有效期和 IP 限制由你在控制台自行设置；账号级的请求频率和并发上限由平台设定，超出时返回 429。

## 费用与用量 {#billing}

- API 调用每次按实际用量从美元余额扣费，与 ZaiDrama 创作共用同一份余额，余额和充值见[账号、余额与支持](../platform/account.md#credits)。
- 各模型的美元单价（每百万 Token 或每个计费单位）在控制台「模型定价」查看。
- 视频任务只在成功出片时计费一次。
- 调用明细在控制台「使用记录」查看，每条记录包括模型、接口、是否流式、Token 数、费用（美元）和耗时，可以导出 CSV。
- 余额不足时返回的提示形如 `余额不足：这次调用至少需要 $x，当前可用 $y，请充值后再试`。

## 排查清单 {#troubleshooting}

1. **全部请求 404**：base_url 是否写成了 `https://api.ourzai.com/v1`（带 `/v1`）。
2. **401**：请求头是否是 `Authorization: Bearer <密钥>`，密钥是否完整、是否已停用。
3. **某个模型 404**：模型名是否与「模型定价」一致，该模型是否支持你调用的接口。
4. **402、403 或 429**：检查可用余额、密钥总额度、有效期、IP 设置和并发数。
5. **视频一直是 `pending`**：视频生成需要一段时间，按间隔轮询；`expired` 表示任务已过期，需要重新提交。
6. **仍无法解决**：写信到 support@ourzai.com，附上发生时间、调用的接口、模型名和错误响应，不要附上完整密钥。
