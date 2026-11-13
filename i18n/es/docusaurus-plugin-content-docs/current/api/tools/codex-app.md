---
id: codex-app
title: Usar con la app de Codex
sidebar_label: App de Codex
description: La aplicación de escritorio de Codex comparte config.toml con Codex CLI. Añade ZAI como proveedor y asegúrate de que la aplicación pueda leer tu clave.
sidebar_position: 4
update_docs: none
---

# Usar con la app de Codex {#codex-app}

La aplicación de escritorio de Codex lee el mismo archivo de configuración que Codex CLI y la extensión para IDE: `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` en Windows). Codex llama a los modelos mediante el endpoint Responses, así que elige un modelo que ofrezca `responses`. Compruébalos en [Catálogo e integración de modelos](../models.md).

:::tip ¿Prefieres no configurar a mano?
ZAI ofrece una [herramienta de gestión de claves](./key-tool.md) de escritorio que reúne tus claves de API en un solo lugar y configura el acceso por ti. [Ir a la descarga](./key-tool.md#download)
:::

## Añadir el proveedor {#config}

Abre `config.toml` (los ajustes de la aplicación también permiten abrir el archivo de configuración) y añade lo siguiente en el nivel superior del archivo:

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

- Pon `model` y `model_provider` en el nivel superior del archivo. La aplicación de escritorio no lee los ajustes de `[profiles]`.
- Si ya configuraste [Codex CLI](./codex-cli.md), no hace falta añadirlo otra vez.

## Hacer que la aplicación lea la clave {#key}

`env_key` apunta a la variable de entorno `ZAI_API_KEY`. Una aplicación de escritorio abierta desde el Dock, el menú Inicio o el Launchpad no lee las líneas `export` de `~/.zshrc`, `~/.bashrc` ni de tu perfil de PowerShell, así que la variable debe definirse para todo el sistema.

En macOS, ejecuta esto en Terminal:

```bash
launchctl setenv ZAI_API_KEY "<your API key>"
```

Este ajuste se borra al reiniciar el ordenador, así que vuelve a ejecutarlo después de cada reinicio.

En Windows, ejecuta esto en PowerShell (es permanente):

```powershell
setx ZAI_API_KEY "<your API key>"
```

Después cierra por completo la aplicación de escritorio de Codex (Comando + Q en macOS; en Windows, asegúrate de que la aplicación ya no se ejecuta en segundo plano) y vuelve a abrirla.

## Comprobar {#verify}

Crea una tarea nueva y envía un mensaje. Si recibes respuesta, la configuración funciona. Si la aplicación indica que falta `ZAI_API_KEY`, no vio la variable al iniciarse: revisa el paso anterior, cierra la aplicación por completo y vuelve a abrirla. Para otros errores, busca el código de estado en [Errores, límites y uso](../errors.md): un 401 suele indicar una clave incorrecta, y un 404, un ID de modelo mal escrito o un modelo que no ofrece `responses`.
