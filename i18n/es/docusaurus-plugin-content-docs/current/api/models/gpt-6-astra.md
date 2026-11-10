---
id: gpt-6-astra
title: gpt-6-astra — Guía de integración
description: gpt-6-astra — Guía de integración
sidebar_position: 1
update_docs: none
---

# gpt-6-astra — Guía de integración {#integration}

Usa el ID exacto de esta página en model. Solo las interfaces de la tabla forman parte de la integración documentada para este modelo.

`model`: `gpt-6-astra`

## Modelos e interfaces {#endpoints}

| Interfaces compatibles | HTTP |
|---|---|
| `chat.completions` | `POST /v1/chat/completions` |
| `responses` | `POST /v1/responses` |

## Preparación y autenticación {#setup}

Los ejemplos leen ZAI_API_KEY del entorno. Python usa solo la biblioteca estándar, sin SDK. Guarda la clave en el servidor, nunca en código del navegador. Las solicitudes pueden generar cargos; los ejemplos producen resultados pequeños.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Parámetros y límites {#parameters}

Estas configuraciones son solicitudes mínimas para esta plataforma, no una lista exhaustiva ni límites máximos. Los parámetros avanzados omitidos no se han verificado aquí. No copies los límites de otro proveedor o modelo.

messages es una lista de roles y texto. max_tokens fija el presupuesto de salida; el ejemplo usa 256. stream es false por defecto; con true, lee SSE hasta [DONE].

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


body = {"model": "gpt-6-astra", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 256}
response = json.loads(call("/chat/completions", body))
print(response["choices"][0]["message"]["content"])
```

## Conversación en streaming {#streaming}


```bash
curl --fail-with-body --no-buffer https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-6-astra","messages":[{"role":"user","content":"Hello"}],"max_tokens":256,"stream":true}'
```

## Otros protocolos disponibles {#other-protocols}


```bash
curl --fail-with-body https://api.ourzai.com/v1/responses \
  -H "Authorization: Bearer $ZAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-6-astra","input":"Hello","max_output_tokens":256}'
```

## Resultados y errores {#results}

Lee choices[0].message.content, o choices[].delta.content en streaming. Gestiona errores SSE y desconexiones incluso tras HTTP 200. Responses devuelve texto en elementos output_text de output[].content[]; Messages usa elementos text de content[]. Los formatos no son intercambiables.

Este catálogo describe la integración, no la disponibilidad en tiempo real. GET /v1/models muestra los modelos accesibles con tu clave; consulta precios en la consola. Un modelo listado puede devolver 502/503 durante fallos o periodos de espera. Reintenta con espera progresiva.

## Documentación relacionada {#related}

- [Todos los modelos](../models.md)
- [Inicio rápido](../quickstart.md)
- [Errores y consumo](../errors.md)
