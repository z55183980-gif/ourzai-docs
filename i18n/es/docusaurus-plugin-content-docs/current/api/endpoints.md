---
id: endpoints
title: Interfaces y capacidades
description: Las interfaces de chat, vectores, imágenes, audio y vídeo que ofrece api.ourzai.com, incluidos los flujos de trabajo para enviar, consultar y descargar tareas de vídeo.
sidebar_position: 2
update_docs: none
---

# Interfaces y capacidades {#endpoints}

Las interfaces que se enumeran en este documento se encuentran en `https://api.ourzai.com/v1/` y admiten los formatos compatibles con OpenAI y Anthropic. Consulta [Inicio rápido de la API](./quickstart.md#get-key) para obtener más detalles sobre la autenticación.

## ¿Qué interfaces puede usar un modelo? {#model-endpoints}

Cada modelo admite interfaces distintas: un modelo de chat no puede generar imágenes y un modelo de generación de vídeo no puede chatear. La página **Pricing** (Precios) de la consola indica qué interfaces admite cada modelo, así que confírmalo antes de hacer una llamada. Si usas una interfaz que el modelo no admite o llamas a un modelo que tu cuenta no puede usar, se devolverá un error 404.

## Autenticación {#authentication}

Pasa tu clave de API mediante uno de los siguientes métodos:

- `Authorization: Bearer <YOUR_API_KEY>` (recomendado; úsalo para todas las interfaces compatibles con OpenAI);
- `x-api-key: <YOUR_API_KEY>` (el método del SDK de Anthropic);
- `x-goog-api-key: <YOUR_API_KEY>` (también se puede usar para pasar la clave; esto no implica compatibilidad con la interfaz nativa de Gemini).

No pongas la clave en los parámetros de consulta de la URL (p. ej., `?api_key=`); esas solicitudes se rechazarán.

## Texto {#text}

| Método y ruta | Propósito |
| --- | --- |
| `POST /v1/chat/completions` | Finalizaciones de chat, compatible con OpenAI; admite streaming mediante `stream` |
| `POST /v1/responses` | Interfaz Responses de OpenAI |
| `POST /v1/messages` | Compatible con Messages de Anthropic |
| `POST /v1/messages/count_tokens` | Calcula el recuento de tokens para solicitudes con formato de Anthropic |
| `POST /v1/embeddings` | Vectores de texto; solo lo admiten algunos modelos |
| `GET /v1/models` | Lista de modelos |

## Imágenes {#images}

| Método y ruta | Propósito |
| --- | --- |
| `POST /v1/images/generations` | Texto a imagen, compatible con OpenAI |
| `POST /v1/images/edits` | Imagen a imagen y edición de imágenes, compatible con OpenAI |

Las interfaces de imágenes devuelven resultados de forma síncrona.

## Audio {#audio}

| Método y ruta | Propósito |
| --- | --- |
| `POST /v1/audio/speech` | Texto a voz, compatible con OpenAI |
| `POST /v1/audio/transcriptions` | Voz a texto, compatible con OpenAI |

Las respuestas pueden incluir `X-Zai-Audio-Duration-Ms` (duración del audio en milisegundos) o `X-Zai-Audio-Confidence` (confianza de la transcripción), según el modelo utilizado.

## Generación de vídeo {#video}

La generación de vídeo es asíncrona: primero envía una tarea para recibir un `request_id`, luego consulta el estado y descarga el resultado cuando el vídeo esté listo.

| Método y ruta | Propósito |
| --- | --- |
| `POST /v1/videos/generations` | Envía una tarea de vídeo; devuelve `request_id` |
| `GET /v1/videos/generations/{request_id}` | Consulta el estado de la tarea |
| `GET /v1/videos/generations/{request_id}/content` | Descarga el vídeo generado |

`/v1/videos` y `/v1/videos/{request_id}` son rutas abreviadas equivalentes.

### Enviar una tarea {#video-submit}

Campos del cuerpo de la solicitud:

| Campo | Descripción |
| --- | --- |
| `model` | Obligatorio; el nombre del modelo de vídeo |
| `prompt` | Descripción de los elementos visuales y el movimiento |
| `duration` | Duración (segundos) |
| `aspect_ratio` | Relación de aspecto |
| `resolution` | Resolución |
| `generate_audio` | Si se debe generar una pista de audio |
| `seed` | Semilla aleatoria |
| `watermark` | Si se debe añadir una marca de agua |
| `image` | Imagen del primer fotograma |
| `last_frame` | Imagen del último fotograma |
| `reference_images` | Lista de imágenes de referencia |
| `reference_audios` | Lista de clips de audio de referencia |

Los campos y valores admitidos varían según el modelo. Usa la página **Pricing** (Precios) para confirmar la interfaz de vídeo y sus precios; rellena los parámetros específicos según las capacidades del modelo que hayas seleccionado. Si la validación de parámetros falla, la respuesta puede devolver un 400 con `video_input_unsupported` e indicar en `field` qué campos hay que ajustar.

```bash
curl https://api.ourzai.com/v1/videos/generations \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<VIDEO_MODEL_ID>", "prompt": "Sunset by the sea, with a slow camera push-in", "duration": 5}'
```

### Consultar el estado y obtener los resultados {#video-status}

La consulta devuelve `request_id` y `status`. Cuando el vídeo está listo, incluye `video.url` (junto con la duración, la resolución, etc.); si falla, incluye `error.code` y `error.message`. Posibles valores de `status`:

| Estado | Significado |
| --- | --- |
| `pending` | Generando; vuelve a consultar más tarde |
| `done` | Completado; listo para descargar |
| `failed` | Error en la generación; consulta `error` |
| `expired` | Tarea caducada |

### Descargar el vídeo {#video-download}

Después de `done`, solicita `/content` para obtener el archivo de vídeo. Si el vídeo aún no está listo, la solicitud devuelve 409 `video_not_ready`; simplemente vuelve a intentarlo más tarde.

La generación de vídeo solo se factura una vez cuando se completa correctamente; consultar el estado cualquier número de veces no genera cargos adicionales.

## Llamar a modelos Gemini {#gemini}

La interfaz nativa de Gemini en `/v1beta/` no está disponible actualmente. Para llamar a modelos Gemini, comprueba primero en la página **Pricing** (Precios) la interfaz compatible que admite el modelo y, a continuación, usa la ruta `/v1/` correspondiente.

## Integración por modelo {#model-guides}

[Catálogo e integración de modelos](./models.md) — Elige un modelo para ver sus interfaces y ejemplos completos. Usa el ID exacto: los modelos del mismo proveedor no siempre admiten las mismas interfaces.
