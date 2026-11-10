---
id: minimax-h3
title: minimax-h3 — Guía de integración
description: minimax-h3 — Guía de integración
sidebar_position: 15
update_docs: none
---

# minimax-h3 — Guía de integración {#integration}

Usa el ID exacto de esta página en model. Solo las interfaces de la tabla forman parte de la integración documentada para este modelo.

`model`: `minimax-h3`

## Modelos e interfaces {#endpoints}

| Interfaces compatibles | HTTP |
|---|---|
| `videos.generations` | `POST /v1/videos/generations` |

## Preparación y autenticación {#setup}

Los ejemplos leen ZAI_API_KEY del entorno. Python usa solo la biblioteca estándar, sin SDK. Guarda la clave en el servidor, nunca en código del navegador. Las solicitudes pueden generar cargos; los ejemplos producen resultados pequeños.

```bash
export ZAI_API_KEY="<your-api-key>"
```

## Parámetros y límites {#parameters}

Estas configuraciones son solicitudes mínimas para esta plataforma, no una lista exhaustiva ni límites máximos. Los parámetros avanzados omitidos no se han verificado aquí. No copies los límites de otro proveedor o modelo.

Configuración verificada: duration=5 segundos, resolution=768P, aspect_ratio=16:9 y prompt de texto; también se verificaron una imagen inicial image (data URL o enlace https público) y dos reference_images. resolution tiene un solo nivel, 768P; duration es un entero de 1 a 15; aspect_ratio es 21:9, 16:9, 4:3, 1:1, 3:4 o 9:16. El vídeo siempre lleva pista de audio; no se acepta generate_audio. Los fotogramas inicial/final y reference_images no pueden combinarse en una misma solicitud. Hasta 9 reference_images; en el prompt se citan como <Picture 1>, <Picture 2>… en el orden del array (corchetes angulares, P mayúscula, un espacio antes del número; cualquier otra grafía se lee como texto). Los fotogramas inicial/final no llevan número. prompt admite como máximo 7.000 caracteres. last_frame y reference_audios no están verificados aquí; seed, watermark y los prompts negativos no son compatibles.

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


import time
from pathlib import Path
from urllib.parse import quote

created = json.loads(
    call(
        "/videos/generations",
        {
            "model": "minimax-h3",
            "prompt": "A red mug on a table, slow camera movement",
            "duration": 5,
            "resolution": "768P",
            "aspect_ratio": "16:9",
        },
    )
)
task_id = created.get("request_id") or created.get("id")
if not task_id:
    raise RuntimeError(created)
print("task_id:", task_id, flush=True)
path = "/videos/" + quote(task_id, safe="")
deadline = time.monotonic() + 600
while time.monotonic() < deadline:
    status = json.loads(call(path))
    if status.get("status") == "done":
        Path("result.mp4").write_bytes(call(path + "/content"))
        break
    if status.get("status") in ("failed", "expired"):
        raise RuntimeError(status)
    time.sleep(5)
else:
    raise TimeoutError(f"Keep task ID {task_id} and query its status later")
```

## Resultados y errores {#results}

Enviar correctamente no significa que el vídeo esté listo. El ejemplo acepta request_id/id, consulta pending → done y descarga /content con la misma clave; video.url puede ser relativo. failed/expired son estados finales; 409 significa que aún no está listo. No envíes la clave a otros dominios. Si se agota el tiempo, consulta la tarea existente antes de reenviar para evitar cargos duplicados.

Este catálogo describe la integración, no la disponibilidad en tiempo real. GET /v1/models muestra los modelos accesibles con tu clave; consulta precios en la consola. Un modelo listado puede devolver 502/503 durante fallos o periodos de espera. Reintenta con espera progresiva.

## Documentación relacionada {#related}

- [Todos los modelos](../models.md)
- [Inicio rápido](../quickstart.md)
- [Errores y consumo](../errors.md)
