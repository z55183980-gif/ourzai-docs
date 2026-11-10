---
id: cosyvoice2-0.5b
title: cosyvoice2-0.5b — Guía de integración
description: cosyvoice2-0.5b — Guía de integración
sidebar_position: 14
update_docs: none
---

# cosyvoice2-0.5b — Guía de integración {#integration}

Usa el ID exacto de esta página en model. Solo las interfaces de la tabla forman parte de la integración documentada para este modelo.

`model`: `cosyvoice2-0.5b`

## Modelos e interfaces {#endpoints}

| Interfaces compatibles | HTTP |
|---|---|
| `audio.speech` | `POST /v1/audio/speech` |

## Preparación y autenticación {#setup}

Los ejemplos leen ZAI_API_KEY del entorno. Python usa solo la biblioteca estándar, sin SDK. Guarda la clave en el servidor, nunca en código del navegador. Las solicitudes pueden generar cargos; los ejemplos producen resultados pequeños.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Parámetros y límites {#parameters}

Estas configuraciones son solicitudes mínimas para esta plataforma, no una lista exhaustiva ni límites máximos. Los parámetros avanzados omitidos no se han verificado aquí. No copies los límites de otro proveedor o modelo.

input contiene el texto. Usa la voz completa FunAudioLLM/CosyVoice2-0.5B:alex y response_format=mp3. La respuesta es audio binario, no JSON. Solo esta voz y formato están verificados; no se garantizan otras voces, velocidades ni longitud máxima del texto.

## Ejemplo completo {#example}


```python
import json
import os
import urllib.error
import urllib.request

BASE = "https://api.ourzai.com/v1"
KEY = os.environ["ZAI_API_KEY"]


def call(path, body=None, timeout=180):
    headers = {"Authorization": f"Bearer {KEY}"}
    data = None
    if body is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(body).encode("utf-8")
    request = urllib.request.Request(BASE + path, data=data, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.read()
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"HTTP {error.code}: {error.read().decode(errors='replace')}") from error


from pathlib import Path

audio = call(
    "/audio/speech",
    {
        "model": "cosyvoice2-0.5b",
        "input": "Hello. This is a speech test.",
        "voice": "FunAudioLLM/CosyVoice2-0.5B:alex",
        "response_format": "mp3",
    },
)
Path("speech.mp3").write_bytes(audio)
```

## Resultados y errores {#results}

Guarda la respuesta correcta como MP3. Incluso un texto corto puede tardar; los 180 segundos de espera del cliente no garantizan latencia. Lee los errores no-2xx en vez de guardar JSON de error como audio.

Este catálogo describe la integración, no la disponibilidad en tiempo real. GET /v1/models muestra los modelos accesibles con tu clave; consulta precios en la consola. Un modelo listado puede devolver 502/503 durante fallos o periodos de espera. Reintenta con espera progresiva.

## Documentación relacionada {#related}

- [Todos los modelos](../models.md)
- [Inicio rápido](../quickstart.md)
- [Errores y consumo](../errors.md)
