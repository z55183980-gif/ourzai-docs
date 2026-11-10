---
id: codex-cli
title: Usar con Codex CLI
sidebar_label: Codex CLI
description: Añade ZAI como proveedor en ~/.codex/config.toml para que Codex CLI llame a la API de ZAI mediante el endpoint Responses.
sidebar_position: 3
update_docs: none
---

# Usar con Codex CLI {#codex}

Codex llama a los modelos mediante el endpoint Responses, así que elige un modelo que ofrezca `responses`. Compruébalos en [Catálogo e integración de modelos](../models.md). Esta página trata de la línea de comandos de Codex; para la aplicación de escritorio de Codex, consulta [App de Codex](./codex-app.md).

## Añadir el proveedor {#config}

Añade lo siguiente a `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` en Windows):

```toml
model = "<model ID that offers responses>"
model_provider = "zai"

[model_providers.zai]
name = "ZAI"
base_url = "https://api.ourzai.com/v1"
env_key = "ZAI_API_KEY"
wire_api = "responses"
```

`env_key` contiene el nombre de una variable de entorno, no la clave en sí, así que tu clave no se guarda en este archivo.

## Definir la clave {#key}

Define la clave en el terminal donde inicias Codex y luego ejecuta `codex`:

```bash
export ZAI_API_KEY="<your API key>"
codex
```

En Windows PowerShell, usa `$env:ZAI_API_KEY = "<your API key>"`. Para que sea permanente, añade la línea `export` a `~/.zshrc` o `~/.bashrc`; en Windows, añade una variable de usuario llamada `ZAI_API_KEY` en Propiedades del sistema → Variables de entorno y vuelve a abrir el terminal.

Si las solicitudes fallan tras la configuración, busca el código de estado en [Errores, límites y uso](../errors.md): un 404 suele indicar un ID de modelo mal escrito o un modelo que no ofrece `responses`.
