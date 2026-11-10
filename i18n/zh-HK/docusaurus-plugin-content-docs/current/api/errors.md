---
id: errors
title: 錯誤、限制與用量
description: API 的錯誤格式與常見狀態碼、餘額與額度、請求大小與逾時限制，以及排查建議。
sidebar_position: 3
update_docs: none
---

# 錯誤、限制與用量 {#errors}

## 錯誤格式 {#error-format}

錯誤體的格式隨接口協議和錯誤發生階段而定：

- **OpenAI 兼容接口**：`{"error": {"type": "...", "message": "..."}}`，部分錯誤帶 `code`；
- **Anthropic 兼容接口**：`{"type": "error", "error": {"type": "...", "message": "..."}}`；
- **API 密鑰與計費檢查**（在請求進入模型之前）：`{"code": "...", "message": "..."}`。

排查時優先看 HTTP 狀態碼，再看 `code` 或 `type`。

## 常見狀態碼 {#status-codes}

### 400 請求有誤 {#status-400}

- 請求體為空或不是合法 JSON、缺少 `model`、字段類型不對；
- 影片請求帶了模型不支持的字段：`video_input_unsupported`，`field` 指出是哪個字段；
- 模型服務拒絕了請求內容：`upstream_rejected`，可能帶模型服務返回的 `upstream_code`。

### 401 鑒權失敗 {#status-401}

| code | 含義 | 怎麼辦 |
| --- | --- | --- |
| `API_KEY_REQUIRED` | 沒有帶 API 密鑰 | 檢查請求頭 `Authorization: Bearer <密钥>` |
| `INVALID_API_KEY` | API 密鑰無效 | 到控制台核對或新建 API 密鑰 |
| `API_KEY_DISABLED` | API 密鑰已停用 | 在控制台重新啟用 |

只在 URL 查詢參數中傳 API 密鑰不算有效鑒權，會返回 `API_KEY_REQUIRED`。

### 402 餘額不足 {#status-402}

`insufficient_credits`：賬戶可用餘額不足，請到控制台「充值」頁增值後重試。

### 403 無權使用 {#status-403}

| code | 含義 | 怎麼辦 |
| --- | --- | --- |
| `API_KEY_EXPIRED` | API 密鑰已過期 | 在控制台修改有效期或新建 API 密鑰 |
| `ACCESS_DENIED` | 來源 IP 不在白名單或在黑名單中 | 檢查 API 密鑰的 IP 設置 |

### 404 找不到 {#status-404}

- `model_not_found`：模型名寫錯，或你的賬戶不能使用這個模型；
- 模型不支持所調用的接口（例如用對話模型調生圖）；
- 請求路徑不存在，常見原因是 base_url 漏了 `/v1`。

### 409 影片未就緒 {#status-409}

`video_not_ready`：影片還在生成，稍後再請求下載。

### 413 請求體過大 {#status-413}

請求體超過上限，見[請求限制](#limits)。

### 429 超出額度或頻率 {#status-429}

| 場景 | 返回 | 怎麼辦 |
| --- | --- | --- |
| API 密鑰總額度用完 | `API_KEY_QUOTA_EXHAUSTED` | 在控制台提高額度或重置已用額度 |
| 併發請求超限 | `gateway_concurrency_limit` | 降低併發，等待後重試 |
| 模型服務限流 | `upstream_rate_limited` | 等待後重試；響應有 `Retry-After` 時按其指示等待 |

### 5xx 服務暫時不可用 {#status-5xx}

- 502 `upstream_unavailable`：模型服務暫時不可用；
- 503 `no_available_account` 或 Service temporarily unavailable：暫時沒有可用的服務容量。

這類錯誤可以稍後重試，建議使用指數退避。

## 請求限制 {#limits}

| 限制 | 值 |
| --- | --- |
| 單個請求體大小 | 100MB |
| 無響應等待 | 接入層讀取逾時為 600 秒；模型接口或客戶端可能更早逾時，這不是整個任務的最長執行時間 |
| 用量查詢範圍 | 最長 90 天 |

API 密鑰級的總額度、有效期和 IP 限制由你在控制台自行設置；賬戶級的請求頻率和併發上限由平台設定，超出時返回 429。

## 費用與用量 {#billing}

- API 調用每次按實際用量從美元餘額扣費，與 ZaiDrama 創作共用同一份餘額，餘額和增值見[賬戶、餘額與支援](../platform/account.md#credits)。
- 各模型的美元單價（每百萬 Token 或每個計費單位）在控制台「模型定價」查看。
- 影片任務只在成功出片時計費一次。
- 調用明細在控制台「使用記錄」查看，每條記錄包括模型、接口、是否流式、Token 數、費用（美元）和耗時，可以匯出 CSV。
- 餘額不足時返回的提示形如 `余额不足：这次调用至少需要 $x，当前可用 $y，请充值后再试`。

## 排查清單 {#troubleshooting}

1. **全部請求 404**：base_url 是否寫成了 `https://api.ourzai.com/v1`（帶 `/v1`）。
2. **401**：請求頭是否是 `Authorization: Bearer <密钥>`，API 密鑰是否完整、是否已停用。
3. **某個模型 404**：模型名是否與「模型定價」一致，該模型是否支持你調用的接口。
4. **402、403 或 429**：檢查可用餘額、API 密鑰總額度、有效期、IP 設置和併發數。
5. **影片一直是 `pending`**：影片生成需要一段時間，按間隔輪詢；`expired` 表示任務已過期，需要重新提交。
6. **仍無法解決**：寫信到 support@ourzai.com，附上發生時間、調用的接口、模型名和錯誤響應，不要附上完整 API 密鑰。
