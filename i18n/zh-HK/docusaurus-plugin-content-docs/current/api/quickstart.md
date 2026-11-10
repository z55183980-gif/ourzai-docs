---
id: quickstart
title: API 快速開始
description: 在控制台取得 API 密鑰，把 base_url 改成 https://api.ourzai.com/v1，發出第一個請求。
sidebar_position: 1
update_docs: none
---

# API 快速開始 {#quickstart}

接入 ZAI 的 API 只要三步：取密鑰、改 base_url、發請求。ZAI 的對外 API 兼容 OpenAI 的接口格式：已有的 OpenAI SDK 或 HTTP 代碼只要換一個 base_url 和 API 密鑰就能調用平台上的模型。對話、圖像、影片、語音走同一個入口，按實際用量從美元餘額扣費。

| 項目 | 值 |
| --- | --- |
| base_url（OpenAI 兼容 SDK） | `https://api.ourzai.com/v1` |
| 鑑權 | 請求頭 `Authorization: Bearer <你的 API 密钥>` |
| 密鑰與用量 | [開發者控制台](https://ourzai.com/console) |

## 1. 取密鑰 {#get-key}

1. 打開[開發者控制台](https://ourzai.com/console)，用平台賬戶登入；還沒有賬戶可以在登入頁直接註冊，見[賬戶、餘額與支援](../platform/account.md#register)。
2. 進入「API 密鑰」，點新建，填寫名稱。
3. 按需設定：
   - **有效期**：可選擇 7 天、30 天、90 天或自訂日期，最長 3650 天；不開啟有效期限制時長期有效；
   - **總額度**：開啟後填寫這把密鑰最多可消費的美元金額；不開啟時不設定密鑰總額度上限，調用仍受賬戶可用餘額限制；
   - **IP 白名單 / 黑名單**：單個 IP 或 CIDR，每個列表最多 100 條。
4. 建立後會彈出調用示例，可以直接複製。

完整密鑰在控制台預設打碼顯示，隨時可以點開查看和複製。密鑰形如 `sk-` 加一串十六進制字符。之後可以在同一頁停用、啟用、修改有效期和額度，或刪除密鑰。

:::caution 保管好密鑰
密鑰等同於你的賬戶消費權限。不要把它寫進前端代碼、提交到代碼倉庫或發給他人；懷疑洩露時立即在控制台停用或刪除，再新建一把。
:::

## 2. 改 base_url {#set-base-url}

把 OpenAI 兼容 SDK 或 HTTP 請求的地址改為 `https://api.ourzai.com/v1`，再選擇支援相應接口的模型。不同模型支援的參數可能不同。

- **必須帶 `/v1`**：OpenAI 兼容 SDK 會在 base_url 後面拼接 `/chat/completions` 等路徑，漏掉 `/v1` 會得到 404。
- 使用 Anthropic SDK 調用 `/v1/messages` 時，base_url 填 `https://api.ourzai.com`（SDK 會自己加 `/v1`）。

## 3. 發出第一個請求 {#first-request}

先在控制台的「模型定價」挑一個支援對話的模型，把它的名稱填進 `model` 欄位。

### cURL {#curl}

```bash
curl https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<模型名>",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

### Python {#python}

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.ourzai.com/v1",
    api_key="<你的 API 密钥>",
)

response = client.chat.completions.create(
    model="<模型名>",
    messages=[{"role": "user", "content": "你好"}],
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
  model: "<模型名>",
  messages: [{ role: "user", content: "你好" }],
});
console.log(response.choices[0].message.content);
```

### 用環境變量 {#env}

很多工具讀取 OpenAI 的標準環境變量，設定後無需改代碼：

```bash
export OPENAI_BASE_URL="https://api.ourzai.com/v1"
export OPENAI_API_KEY="<你的 API 密钥>"
```

## 4. 流式輸出 {#streaming}

對話接口支援 SSE 流式輸出，請求體裡加 `"stream": true` 即可，用法與 OpenAI 相同。流已經開始後如果出錯，錯誤會作為一條 SSE 事件返回，客戶端需要處理。

## 5. 支援哪些模型，單價多少 {#models}

- **控制台「模型定價」**：列出平台提供的模型、每個模型支援的接口（對話、向量、生圖、生影片等）和美元單價（每百萬 Token 或每個計費單位），並顯示 base_url。以這裡為準。
- **`GET /v1/models`**：用 API 密鑰取得模型列表，便於程序化讀取。

模型名直接填進請求的 `model` 欄位。一個模型不支援你調用的接口時會返回 404，見[錯誤、限制與用量](./errors.md)。

## 6. 看用量 {#usage}

控制台「使用記錄」頁可以按時間、密鑰、模型篩選，查看調用次數、Token、費用（美元）、用量趨勢和按模型分佈，並可匯出調用明細 CSV，查詢範圍最長 90 天。「API 密鑰」頁會顯示每把密鑰今天和累計的花費。

API 調用與 ZaiDrama 創作共用同一份美元餘額，增值見[賬戶、餘額與支援](../platform/account.md#credits)。

## 下一步 {#next-steps}

- [接口與能力](./endpoints.md)：對話、圖像、語音、影片等全部接口；
- [錯誤、限制與用量](./errors.md)：錯誤碼、請求限制和常見問題。

## 按型號接入 {#model-guides}

[模型目錄與接入](./models.md) — 選擇模型，查看實際開放的介面與完整請求範例。模型 ID 必須原樣填寫；同一廠商的不同型號不一定支援相同介面。
