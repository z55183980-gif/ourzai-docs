---
id: models
title: Catálogo e integración de modelos
description: Catálogo e integración de modelos
sidebar_position: 4
update_docs: none
---

# Catálogo e integración de modelos {#models}

Elige un modelo para ver sus interfaces y ejemplos completos. Usa el ID exacto: los modelos del mismo proveedor no siempre admiten las mismas interfaces.

Este catálogo describe la integración, no la disponibilidad en tiempo real. GET /v1/models muestra los modelos accesibles con tu clave; consulta precios en la consola. Un modelo listado puede devolver 502/503 durante fallos o periodos de espera. Reintenta con espera progresiva.

## Modelos e interfaces {#matrix}

| Modelo | Tipo | Interfaces compatibles |
|---|---|---|
| [gpt-6-astra](./models/gpt-6-astra.md) | Conversación | `chat.completions`, `responses` |
| [gpt-6-sol](./models/gpt-6-sol.md) | Conversación | `chat.completions`, `responses` |
| [gpt-5.6-sol](./models/gpt-5.6-sol.md) | Conversación | `chat.completions` |
| [claude-sonnet-5-5](./models/claude-sonnet-5-5.md) | Conversación | `chat.completions` |
| [claude-opus-5-5](./models/claude-opus-5-5.md) | Conversación | `chat.completions`, `messages`, `messages.count_tokens` |
| [gpt-image-2](./models/gpt-image-2.md) | Imagen | `images.generations`, `images.edits` |
| [gpt-image-2.5-flare](./models/gpt-image-2.5-flare.md) | Imagen | `images.generations`, `images.edits` |
| [gpt-image-2.5-sunburst](./models/gpt-image-2.5-sunburst.md) | Imagen | `images.generations`, `images.edits` |
| [grok-imagine-image](./models/grok-imagine-image.md) | Imagen | `images.generations`, `images.edits` |
| [grok-imagine-image-2.0](./models/grok-imagine-image-2.0.md) | Imagen | `images.generations`, `images.edits` |
| [grok-imagine-image-quality](./models/grok-imagine-image-quality.md) | Imagen | `images.generations`, `images.edits` |
| [grok-imagine-video](./models/grok-imagine-video.md) | Vídeo | `videos.generations` |
| [grok-imagine-video-1.5](./models/grok-imagine-video-1.5.md) | Vídeo | `videos.generations` |
| [minimax-h3](./models/minimax-h3.md) | Vídeo | `videos.generations` |
| [cosyvoice2-0.5b](./models/cosyvoice2-0.5b.md) | Síntesis de voz | `audio.speech` |

## Obtener la lista actual de modelos {#live-models}


```bash
curl --fail-with-body https://api.ourzai.com/v1/models \
  -H "Authorization: Bearer $ZAI_API_KEY"
```

## Documentación relacionada {#related}

- [Inicio rápido](./quickstart.md)
- [Errores y consumo](./errors.md)
