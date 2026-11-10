---
id: claude-code
title: Usar con Claude Code
sidebar_label: Claude Code
description: Conecta la línea de comandos de Claude Code a la API de ZAI mediante el endpoint Anthropic Messages, con variables de entorno o settings.json.
sidebar_position: 1
update_docs: none
---

# Usar con Claude Code {#claude-code}

Claude Code llama a los modelos mediante el endpoint Anthropic Messages, así que solo funcionan los modelos que ofrecen `messages`. Compruébalos en [Catálogo e integración de modelos](../models.md). Esta página trata de la línea de comandos de Claude Code; para usar Code en la aplicación de escritorio de Claude, consulta [Claude Desktop](./claude-desktop.md).

## Variables de entorno para una sesión {#env}

Define estas variables de entorno en el terminal donde inicias Claude Code:

```bash
export ANTHROPIC_BASE_URL="https://api.ourzai.com"
export ANTHROPIC_AUTH_TOKEN="<your API key>"
export ANTHROPIC_MODEL="<model ID that offers messages>"
export ANTHROPIC_DEFAULT_OPUS_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_SONNET_MODEL="<the same model ID>"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="<the same model ID>"
claude
```

En Windows PowerShell, define las mismas variables con `$env:NAME = "value"`. Estas variables solo se aplican al terminal actual.

## Guardar los ajustes de forma permanente {#settings}

Para no definir las variables cada vez, ponlas en el campo `env` de `~/.claude/settings.json` (`%USERPROFILE%\.claude\settings.json` en Windows). Después basta con ejecutar `claude`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.ourzai.com",
    "ANTHROPIC_AUTH_TOKEN": "<your API key>",
    "ANTHROPIC_MODEL": "<model ID that offers messages>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<the same model ID>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<the same model ID>",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<the same model ID>"
  }
}
```

Este archivo guarda tu clave en texto plano. No lo subas a un repositorio de código ni lo compartas.

## Notas {#notes}

- No añadas `/v1` a `ANTHROPIC_BASE_URL`: Claude Code añade `/v1/messages` por su cuenta.
- Claude Code usa por defecto otras gamas de modelos para tareas en segundo plano y subagentes. Haz que las tres variables `ANTHROPIC_DEFAULT_*_MODEL` apunten a un modelo que la plataforma ofrezca con `messages`, para que nunca pida un modelo que la plataforma no tiene y reciba un 404.
- Escribe `/status` en Claude Code para ver el endpoint y el modelo que está usando.

Si las solicitudes fallan tras la configuración, busca el código de estado en [Errores, límites y uso](../errors.md).
