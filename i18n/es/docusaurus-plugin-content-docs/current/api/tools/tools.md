---
id: tools
slug: /api/tools
title: Usar con herramientas de programación
sidebar_label: Herramientas de programación
description: Ajustes comunes para usar la API de ZAI en herramientas de programación como Claude Code, Claude Desktop, Codex, Cursor y Cline, con enlaces a la guía de cada herramienta.
sidebar_position: 0
update_docs: none
---

# Usar con herramientas de programación {#tools}

Cualquier herramienta de programación o cliente que acepte un endpoint personalizado puede usar la API de ZAI. Todas las herramientas necesitan los mismos tres ajustes:

| Ajuste | Valor |
| --- | --- |
| Base URL | `https://api.ourzai.com/v1` (las herramientas que usan el protocolo de Anthropic llevan `https://api.ourzai.com`; consulta la página de cada herramienta) |
| API Key | Una clave creada en la página **Claves de API** (API keys) de la [consola para desarrolladores](https://ourzai.com/console) |
| Modelo | Un ID de modelo del [catálogo de modelos](../models.md), escrito exactamente igual |

Las interfaces de las herramientas cambian entre versiones. La página de cada herramienta indica el nombre de sus ajustes; si no encuentras alguno, rellena los tres ajustes anteriores donde la herramienta los pida. Una herramienta de programación puede enviar muchas solicitudes para completar una sola tarea, y cada una se cobra de tu saldo según el uso, así que conviene fijar un límite de gasto en la clave. Consulta [Obtener una clave](../quickstart.md#get-key).

:::tip Comprueba qué endpoints ofrece un modelo
Todos los modelos de chat admiten `chat.completions`; solo algunos ofrecen además `responses` o el endpoint `messages` de Anthropic. Antes de elegir un modelo, revisa sus endpoints en [Catálogo e integración de modelos](../models.md).
:::

## Elige tu herramienta {#choose}

| Herramienta | Tipo | Endpoint necesario | Guía |
| --- | --- | --- | --- |
| Claude Code | Línea de comandos | `messages` | [Claude Code](./claude-code.md) |
| Claude Desktop | Aplicación de escritorio (Chat, Cowork, Code) | `messages` | [Claude Desktop](./claude-desktop.md) |
| Codex CLI | Línea de comandos | `responses` | [Codex CLI](./codex-cli.md) |
| App de Codex | Aplicación de escritorio | `responses` | [App de Codex](./codex-app.md) |
| Cursor | Editor | `chat.completions` | [Cursor](./cursor.md) |
| Cline | Extensión de editor | `chat.completions` | [Cline](./cline.md) |

## Otros clientes compatibles con OpenAI {#other-clients}

En aplicaciones como Chatbox, Cherry Studio, LobeChat, Open WebUI, Dify y n8n, añade un proveedor de tipo «compatible con OpenAI» u «OpenAI personalizado» y rellena los tres ajustes del principio de esta página. Para herramientas que leen las variables de entorno estándar de OpenAI, consulta [Usar variables de entorno](../quickstart.md#env).

## Si la configuración falla {#troubleshooting}

Busca el código de estado en [Errores, límites y uso](../errors.md): un 401 suele indicar una clave incorrecta, y un 404, un ID de modelo mal escrito o un modelo que no admite ese endpoint.
