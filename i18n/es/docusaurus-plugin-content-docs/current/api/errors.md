---
id: errors
title: Errores, límites y uso
description: Formato de error de la API y códigos de estado comunes, saldo y cuotas, límites de tamaño de solicitud y tiempo de espera, y consejos para la resolución de problemas.
sidebar_position: 3
update_docs: none
---

# Errores, límites y uso {#errors}

## Formato del error {#error-format}

El formato del cuerpo del error depende del protocolo de la API y de la etapa en la que se produce el error:

- **APIs compatibles con OpenAI**: `{"error": {"type": "...", "message": "..."}}`, y algunos errores incluyen `code`;
- **APIs compatibles con Anthropic**: `{"type": "error", "error": {"type": "...", "message": "..."}}`;
- **Comprobaciones de clave de API y facturación** (antes de que la solicitud llegue al modelo): `{"code": "...", "message": "..."}`.

Al solucionar problemas, comprueba primero el código de estado HTTP y luego consulta `code` o `type`.

## Códigos de estado comunes {#status-codes}

### 400 Solicitud incorrecta {#status-400}

- El cuerpo de la solicitud está vacío o no es un JSON válido, falta `model` o algún campo tiene un tipo incorrecto;
- Una solicitud de vídeo incluye un campo que el modelo no admite: `video_input_unsupported`, y `field` indica de qué campo se trata;
- El servicio del modelo rechazó el contenido de la solicitud: `upstream_rejected`, posiblemente con un `upstream_code` devuelto por el servicio del modelo.

### 401 Error de autenticación {#status-401}

| código | Significado | Qué hacer |
| --- | --- | --- |
| `API_KEY_REQUIRED` | No se ha proporcionado ninguna clave de API | Comprueba la cabecera de solicitud `Authorization: Bearer <YOUR_API_KEY>` |
| `INVALID_API_KEY` | Clave de API no válida | Verifica la clave en la consola o crea una nueva |
| `API_KEY_DISABLED` | Clave de API desactivada | Vuelve a activarla en la consola |

Pasar la clave de API únicamente como parámetro de consulta de la URL no cuenta como autenticación válida y devuelve `API_KEY_REQUIRED`.

### 402 Saldo insuficiente {#status-402}

`insufficient_credits`: El saldo disponible de la cuenta es insuficiente. Recarga en la página «Recargar» de la consola e inténtalo de nuevo.

### 403 Prohibido {#status-403}

| código | Significado | Qué hacer |
| --- | --- | --- |
| `API_KEY_EXPIRED` | La clave de API ha caducado | Actualiza su periodo de validez en la consola o crea una nueva clave |
| `ACCESS_DENIED` | La IP de origen no está en la lista de permitidas o está en la lista de bloqueadas | Comprueba la configuración de IP de la clave |

### 404 No encontrado {#status-404}

- `model_not_found`: El nombre del modelo está mal escrito o tu cuenta no puede usar este modelo;
- El modelo no admite la API llamada (por ejemplo, llamar a un endpoint de generación de imágenes con un modelo de chat);
- La ruta de la solicitud no existe, a menudo porque a la base_url le falta `/v1`.

### 409 Vídeo no listo {#status-409}

`video_not_ready`: El vídeo se está generando todavía. Solicita la descarga de nuevo más tarde.

### 413 Cuerpo de la solicitud demasiado grande {#status-413}

El cuerpo de la solicitud supera el límite. Consulta [Límites de solicitud](#limits).

### 429 Cuota o límite de velocidad superado {#status-429}

| Escenario | Respuesta | Qué hacer |
| --- | --- | --- |
| Cuota total de la clave de API agotada | `API_KEY_QUOTA_EXHAUSTED` | Aumenta la cuota en la consola o restablece la cuota consumida |
| Límite de solicitudes simultáneas superado | `gateway_concurrency_limit` | Reduce la concurrencia y reintenta tras esperar |
| Limitación de velocidad del servicio del modelo | `upstream_rate_limited` | Reintenta tras esperar; si la respuesta incluye `Retry-After`, espera según lo indicado |

### 5xx Servicio no disponible temporalmente {#status-5xx}

- 502 `upstream_unavailable`: El servicio del modelo no está disponible temporalmente;
- 503 `no_available_account` o Servicio no disponible temporalmente: No hay capacidad de servicio disponible en este momento.

Estos errores se pueden reintentar más tarde; se recomienda una espera exponencial.

## Límites de solicitud {#limits}

| Límite | Valor |
| --- | --- |
| Tamaño máximo del cuerpo de la solicitud | 100 MB |
| Espera sin respuesta | El tiempo de espera de lectura de la capa de acceso es de 600 segundos; la API del modelo o el cliente pueden agotar el tiempo antes. Este no es el tiempo máximo de ejecución de toda la tarea |
| Rango de consulta de uso | Hasta 90 días |

La cuota total por clave, el periodo de validez y las restricciones de IP las configuras tú en la consola; los límites de velocidad de solicitudes y de concurrencia a nivel de cuenta los establece la plataforma y devuelven 429 cuando se superan.

## Facturación y uso {#billing}

- Las llamadas a la API se cobran en función del uso real de tu saldo en USD cada vez. El saldo se comparte con la creación en ZaiDrama; para obtener información sobre el saldo y las recargas, consulta [Cuenta, créditos y soporte](../platform/account.md#credits).
- Los precios unitarios en USD de cada modelo (por millón de tokens o por unidad de facturación) están disponibles en «Precios» en la consola.
- Las tareas de vídeo se facturan solo una vez, cuando el vídeo se produce correctamente.
- Los detalles de las llamadas están disponibles en «Uso» en la consola. Cada registro incluye el modelo, la API, si fue en streaming, el recuento de tokens, el coste (USD) y la duración, y se puede exportar como CSV.
- Cuando el saldo es insuficiente, el mensaje devuelto tiene este aspecto: `余额不足：这次调用至少需要 $x，当前可用 $y，请充值后再试`.

## Lista de comprobación para la resolución de problemas {#troubleshooting}

1. **Todas las solicitudes devuelven 404**: Comprueba si la base_url se escribió como `https://api.ourzai.com/v1` (con `/v1`).
2. **401**: Comprueba si la cabecera de la solicitud es `Authorization: Bearer <YOUR_API_KEY>` y si la clave de API está completa y no ha sido desactivada.
3. **Un modelo concreto devuelve 404**: Comprueba si el nombre del modelo coincide con «Precios» y si el modelo admite la API que estás llamando.
4. **402, 403 o 429**: Comprueba el saldo disponible, la cuota total de la clave de API, el periodo de validez, la configuración de IP y la concurrencia.
5. **El vídeo permanece en `pending`**: La generación de vídeo lleva tiempo; sondea a intervalos. `expired` significa que la tarea ha caducado y debe volver a enviarse.
6. **Sigue sin resolverse**: Escribe a support@ourzai.com indicando la hora en que se produjo, la API llamada, el nombre del modelo y la respuesta de error. No incluyas la clave de API completa.
