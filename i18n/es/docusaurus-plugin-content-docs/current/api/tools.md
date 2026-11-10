---
id: tools
title: Usar con herramientas de programación
sidebar_label: Herramientas de programación
description: Configura la base_url, la clave y el modelo de la API de ZAI en herramientas de programación como Cline, Cursor, Codex CLI y Claude Code.
sidebar_position: 5
update_docs: none
---

# Usar con herramientas de programación {#tools}

Cualquier herramienta de programación o cliente que acepte un endpoint personalizado compatible con OpenAI puede usar la API de ZAI. Todas las herramientas necesitan los mismos tres ajustes:

| Ajuste | Valor |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` |
| API Key | Una clave creada en la página **Claves de API** (API keys) de la [consola para desarrolladores](https://ourzai.com/console) |
| Modelo | Un ID de modelo del [catálogo de modelos](./models.md), escrito exactamente igual |

Las interfaces de las herramientas cambian entre versiones. Los pasos siguientes indican el nombre de cada ajuste en cada herramienta; si no encuentras alguno, rellena los tres ajustes anteriores donde la herramienta los pida. Una herramienta de programación puede enviar muchas solicitudes para completar una sola tarea, y cada una se cobra de tu saldo según el uso, así que conviene fijar un límite de gasto en la clave. Consulta [Obtener una clave](./quickstart.md#get-key).

:::tip Comprueba qué endpoints ofrece un modelo
Todos los modelos de chat admiten `chat.completions`; solo algunos ofrecen además `responses` o el endpoint `messages` de Anthropic. Codex necesita `responses` y Claude Code necesita `messages`. Antes de elegir un modelo, revisa sus endpoints en [Catálogo e integración de modelos](./models.md).
:::

## Cline {#cline}

1. Abre los ajustes de Cline y en «API Provider» elige **OpenAI Compatible**.
2. En «Base URL», escribe `https://api.ourzai.com/v1`.
3. Introduce tu clave en «API Key».
4. En «Model ID», escribe el ID de un modelo de chat que admita `chat.completions`.

## Cursor {#cursor}

1. Abre Cursor Settings → Models.
2. En API Keys, introduce tu clave como OpenAI API Key, activa **Override OpenAI Base URL** y escribe `https://api.ourzai.com/v1`.
3. Añade a la lista de modelos los ID que quieras usar y actívalos.

Tu propia clave solo se usa con los modelos que eliges en el chat y en Agent. Las funciones integradas de Cursor, como el autocompletado Tab, siguen funcionando con el servicio de Cursor.

## Codex CLI {#codex}

Codex llama a los modelos a través del endpoint Responses, así que elige un modelo que ofrezca `responses`. Añade lo siguiente a `~/.codex/config.toml`:

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

Después define la clave en la terminal donde inicias Codex:

```bash
export ZAI_API_KEY="<your API key>"
```

En Windows PowerShell, usa `$env:ZAI_API_KEY = "<your API key>"`.

## Claude Code {#claude-code}

Claude Code llama a los modelos a través del endpoint Messages de Anthropic, así que solo funcionan los modelos que ofrecen `messages`. Define estas variables de entorno antes de iniciarlo:

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

- No añadas `/v1` a `ANTHROPIC_BASE_URL`: Claude Code agrega `/v1/messages` por su cuenta.
- Claude Code usa por defecto otras gamas de modelos para tareas en segundo plano y subagentes. Haz que las tres variables `ANTHROPIC_DEFAULT_*_MODEL` apunten a un modelo que la plataforma ofrezca con `messages`, para que nunca pida un modelo que la plataforma no tiene y reciba un 404.
- En Windows PowerShell, define las mismas variables con `$env:NAME = "value"`.

## Otros clientes compatibles con OpenAI {#other-clients}

En aplicaciones como Chatbox, Cherry Studio, LobeChat, Open WebUI, Dify y n8n, añade un proveedor del tipo «compatible con OpenAI» u «OpenAI personalizado» y rellena los tres ajustes del principio de esta página. Para las herramientas que leen las variables de entorno estándar de OpenAI, consulta [Usar variables de entorno](./quickstart.md#env).

Si las solicitudes fallan tras la configuración, busca el código de estado en [Errores, límites y uso](./errors.md): un 401 suele indicar una clave incorrecta, y un 404, un ID de modelo mal escrito o un modelo que no admite ese endpoint.
