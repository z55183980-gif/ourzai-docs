---
id: quickstart
title: API 快速开始
description: 在控制台拿到 API 密钥，把 base_url 改成 https://api.ourzai.com/v1，发出第一个请求。
sidebar_position: 1
update_docs: none
---

# API 快速开始 {#quickstart}

接入 ZAI 的 API 只要三步：拿密钥、改 base_url、发请求。ZAI 的对外 API 兼容 OpenAI 的接口格式：已有的 OpenAI SDK 或 HTTP 代码只要换一个 base_url 和 API 密钥就能调用平台上的模型。对话、图像、视频、语音走同一个入口，按实际用量从美元余额扣费。

| 项目 | 值 |
| --- | --- |
| base_url（OpenAI 兼容 SDK） | `https://api.ourzai.com/v1` |
| 鉴权 | 请求头 `Authorization: Bearer <你的 API 密钥>` |
| 密钥与用量 | [开发者控制台](https://ourzai.com/console) |

## 1. 拿密钥 {#get-key}

1. 打开[开发者控制台](https://ourzai.com/console)，用平台账号登录；还没有账号可以在登录页直接注册，见[账号、余额与支持](../platform/account.md#register)。
2. 进入「API 密钥」，点新建，填写名称。
3. 按需设置：
   - **有效期**：可选择 7 天、30 天、90 天或自定义日期，最长 3650 天；不开启有效期限制时长期有效；
   - **总额度**：开启后填写这把密钥最多可消费的美元金额；不开启时不设置密钥总额度上限，调用仍受账户可用余额限制；
   - **IP 白名单 / 黑名单**：单个 IP 或 CIDR，每个列表最多 100 条。
4. 创建后会弹出调用示例，可以直接复制。

完整密钥在控制台默认打码显示，随时可以点开查看和复制。密钥形如 `sk-` 加一串十六进制字符。之后可以在同一页停用、启用、修改有效期和额度，或删除密钥。

:::caution 保管好密钥
密钥等同于你的账户消费权限。不要把它写进前端代码、提交到代码仓库或发给他人；怀疑泄露时立即在控制台停用或删除，再新建一把。
:::

## 2. 改 base_url {#set-base-url}

把 OpenAI 兼容 SDK 或 HTTP 请求的地址改为 `https://api.ourzai.com/v1`，再选择支持相应接口的模型。不同模型支持的参数可能不同。

- **必须带 `/v1`**：OpenAI 兼容 SDK 会在 base_url 后面拼接 `/chat/completions` 等路径，漏掉 `/v1` 会得到 404。
- 使用 Anthropic SDK 调用 `/v1/messages` 时，base_url 填 `https://api.ourzai.com`（SDK 会自己加 `/v1`）。

## 3. 发出第一个请求 {#first-request}

先在控制台的「模型定价」挑一个支持对话的模型，把它的名称填进 `model` 字段。

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

### 用环境变量 {#env}

很多工具读取 OpenAI 的标准环境变量，设置后无需改代码：

```bash
export OPENAI_BASE_URL="https://api.ourzai.com/v1"
export OPENAI_API_KEY="<你的 API 密钥>"
```

## 4. 流式输出 {#streaming}

对话接口支持 SSE 流式输出，请求体里加 `"stream": true` 即可，用法与 OpenAI 相同。流已经开始后如果出错，错误会作为一条 SSE 事件返回，客户端需要处理。

## 5. 支持哪些模型，单价多少 {#models}

- **控制台「模型定价」**：列出平台提供的模型、每个模型支持的接口（对话、向量、生图、生视频等）和美元单价（每百万 Token 或每个计费单位），并显示 base_url。以这里为准。
- **`GET /v1/models`**：用 API 密钥获取模型列表，便于程序化读取。

模型名直接填进请求的 `model` 字段。一个模型不支持你调用的接口时会返回 404，见[错误、限制与用量](./errors.md)。

## 6. 看用量 {#usage}

控制台「使用记录」页可以按时间、密钥、模型筛选，查看调用次数、Token、费用（美元）、用量趋势和按模型分布，并可导出调用明细 CSV，查询范围最长 90 天。「API 密钥」页会显示每把密钥今天和累计的花费。

API 调用与 ZaiDrama 创作共用同一份美元余额，充值见[账号、余额与支持](../platform/account.md#credits)。

## 下一步 {#next-steps}

- [接口与能力](./endpoints.md)：对话、图像、语音、视频等全部接口；
- [错误、限制与用量](./errors.md)：错误码、请求限制和常见问题。

## 按型号接入 {#model-guides}

[模型目录与接入](./models.md) — 选择模型，查看它实际开放的接口与完整请求示例。模型 ID 必须原样填写；同一厂商的不同型号不一定支持相同接口。
