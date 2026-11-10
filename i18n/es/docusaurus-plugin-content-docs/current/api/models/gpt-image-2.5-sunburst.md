---
id: gpt-image-2.5-sunburst
title: gpt-image-2.5-sunburst — Guía de integración
description: gpt-image-2.5-sunburst — Guía de integración
sidebar_position: 8
update_docs: none
---

# gpt-image-2.5-sunburst — Guía de integración {#integration}

Usa el ID exacto de esta página en model. Solo las interfaces de la tabla forman parte de la integración documentada para este modelo.

`model`: `gpt-image-2.5-sunburst`

## Modelos e interfaces {#endpoints}

| Interfaces compatibles | HTTP |
|---|---|
| `images.generations` | `POST /v1/images/generations` |
| `images.edits` | `POST /v1/images/edits` |

## Preparación y autenticación {#setup}

Los ejemplos leen ZAI_API_KEY del entorno. Python usa solo la biblioteca estándar, sin SDK. Guarda la clave en el servidor, nunca en código del navegador. Las solicitudes pueden generar cargos; los ejemplos producen resultados pequeños.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Parámetros y límites {#parameters}

Estas configuraciones son solicitudes mínimas para esta plataforma, no una lista exhaustiva ni límites máximos. Los parámetros avanzados omitidos no se han verificado aquí. No copies los límites de otro proveedor o modelo.

model y prompt son obligatorios. Configuración mínima: n=1, size=1024x1024, response_format=b64_json. La edición usa multipart/form-data con un PNG local en image y la modificación en prompt. El ejemplo usa una imagen; no garantiza límites de varias imágenes, otros tamaños ni valores de quality.

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


import base64
from pathlib import Path
from urllib.parse import urlsplit


def save_image(response, name):
    item = response["data"][0]
    if item.get("b64_json"):
        data = base64.b64decode(item["b64_json"])
    else:
        url = item["url"]
        if url.startswith("data:"):
            data = base64.b64decode(url.split(",", 1)[1])
        else:
            if urlsplit(url).scheme != "https":
                raise ValueError("Expected an HTTPS image URL")
            with urllib.request.urlopen(url, timeout=180) as response:
                data = response.read()
    suffix = ".png" if data.startswith(b"\x89PNG") else ".jpg" if data.startswith(b"\xff\xd8") else None
    if suffix is None:
        raise ValueError("Unexpected image format")
    Path(name + suffix).write_bytes(data)


body = {
    "model": "gpt-image-2.5-sunburst",
    "prompt": "A red mug on a white table",
    "n": 1,
    "size": "1024x1024",
    "response_format": "b64_json",
}
save_image(json.loads(call("/images/generations", body, timeout=240)), "generated")
```

### `/images/edits` {#edits}

```bash
curl --fail-with-body https://api.ourzai.com/v1/images/edits \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -F 'model=gpt-image-2.5-sunburst' \
  -F 'prompt=Change the mug to blue' \
  -F 'image=@input.png;type=image/png' \
  -F 'n=1' -F 'size=1024x1024' -F 'response_format=b64_json' \
  -o edited.json
```

```python
save_image(json.loads(Path("edited.json").read_text(encoding="utf-8")), "edited")
```

## Resultados y errores {#results}

La lista data puede contener b64_json o url. El ejemplo decodifica o descarga y elige PNG/JPEG según la firma real del archivo. Nunca envíes ZAI_API_KEY a una URL de imagen de terceros.

Este catálogo describe la integración, no la disponibilidad en tiempo real. GET /v1/models muestra los modelos accesibles con tu clave; consulta precios en la consola. Un modelo listado puede devolver 502/503 durante fallos o periodos de espera. Reintenta con espera progresiva.

## Documentación relacionada {#related}

- [Todos los modelos](../models.md)
- [Inicio rápido](../quickstart.md)
- [Errores y consumo](../errors.md)
