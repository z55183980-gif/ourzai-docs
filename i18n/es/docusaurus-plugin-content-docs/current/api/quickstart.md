---
id: quickstart
title: Inicio rápido de la API
description: Obtén una clave de API desde la consola, cambia la base_url a https://api.ourzai.com/v1 y envía tu primera solicitud.
sidebar_position: 1
update_docs: none
---

# Inicio rápido de la API {#quickstart}

Empezar con la API de ZAI solo requiere tres pasos: obtener una clave, cambiar la base_url y enviar una solicitud. La API pública de ZAI es compatible con el formato de interfaz de OpenAI: el código existente del SDK de OpenAI o HTTP puede llamar a los modelos de la plataforma simplemente cambiando la base_url y la clave de API. Chat, imagen, vídeo y audio pasan por el mismo punto de entrada, y los cargos se descuentan de tu saldo en USD según el uso real.

| Elemento | Valor |
| --- | --- |
| base_url (SDK compatible con OpenAI) | `https://api.ourzai.com/v1` |
| Autenticación | Cabecera de solicitud `Authorization: Bearer <YOUR_API_KEY>` |
| Claves y uso | [Consola de desarrollador](https://ourzai.com/console) |

## 1. Obtener una clave {#get-key}

1. Abre la [Consola de desarrollador](https://ourzai.com/console) e inicia sesión con tu cuenta de la plataforma. Si todavía no tienes una cuenta, puedes registrarte directamente en la página de inicio de sesión; consulta [Cuenta, facturación y soporte](../platform/account.md#register).
2. Ve a **Claves de API** (API keys), haz clic en **Nueva** (New) e introduce un nombre.
3. Configura lo que necesites:
   - **Periodo de validez**: elige 7 días, 30 días, 90 días o una fecha personalizada, hasta 3650 días. Si no se activa ningún límite de validez, la clave permanece válida indefinidamente.
   - **Límite de gasto total**: al activarlo, establece la cantidad máxima en USD que esta clave puede consumir. Al desactivarlo, la clave no tiene un límite de gasto propio, pero las solicitudes siguen estando limitadas por el saldo disponible de la cuenta.
   - **Lista blanca / lista negra de IP**: una IP única o CIDR, hasta 100 entradas por lista.
4. Tras la creación, aparecerá un ejemplo de uso que puedes copiar directamente.

Las claves completas están enmascaradas de forma predeterminada en la consola; puedes hacer clic para verlas y copiarlas en cualquier momento. Una clave tiene este aspecto: `sk-` seguida de una cadena de caracteres hexadecimales. En la misma página puedes desactivar, activar, editar el periodo de validez y el límite, o eliminar la clave más adelante.

:::caution Mantén tu clave segura
Una clave equivale a la autoridad de gasto de tu cuenta. Nunca la pongas en código de frontend, la subas a un repositorio de código ni la compartas con otras personas. Si sospechas que se ha filtrado, desactívala o elimínala en la consola de inmediato y crea una nueva.
:::

## 2. Cambiar la base_url {#set-base-url}

Cambia la dirección que usa el SDK compatible con OpenAI o la solicitud HTTP a `https://api.ourzai.com/v1` y elige un modelo compatible con el endpoint correspondiente. Los distintos modelos pueden admitir parámetros diferentes.

- **La `/v1` es obligatoria**: los SDK compatibles con OpenAI añaden rutas como `/chat/completions` a la base_url. Si falta la `/v1`, se devolverá un error 404.
- Al usar el SDK de Anthropic para llamar a `/v1/messages`, establece la base_url en `https://api.ourzai.com` (el SDK añadirá `/v1` automáticamente).

## 3. Enviar tu primera solicitud {#first-request}

Primero elige un modelo compatible con chat en **Precios** (Pricing) de la consola y pon su nombre en el campo `model`.

### cURL {#curl}

```bash
curl https://api.ourzai.com/v1/chat/completions \
  -H "Authorization: Bearer $ZAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Python {#python}

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.ourzai.com/v1",
    api_key="<YOUR_API_KEY>",
)

response = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "Hello"}],
)
print(response.choices[0].message.content)
```

### Node.js {#nodejs}

```js
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.ourzai.com/v1",
  apiKey: process.env.ZAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "<MODEL_ID>",
  messages: [{ role: "user", content: "Hello" }],
});
console.log(response.choices[0].message.content);
```

### Usar variables de entorno {#env}

Muchas herramientas leen las variables de entorno estándar de OpenAI, por lo que no necesitas cambiar nada de código después de configurarlas:

```bash
export OPENAI_BASE_URL="https://api.ourzai.com/v1"
export OPENAI_API_KEY="<YOUR_API_KEY>"
```

## 4. Salida en streaming {#streaming}

El endpoint de chat admite salida en streaming mediante SSE. Añade `"stream": true` al cuerpo de la solicitud; el uso es el mismo que en OpenAI. Si se produce un error después de que el stream haya comenzado, se devolverá como un evento SSE y el cliente deberá gestionarlo.

## 5. Qué modelos son compatibles y cuánto cuestan {#models}

- **Precios en la consola**: muestra los modelos que ofrece la plataforma, los endpoints que admite cada modelo (chat, embeddings, generación de imágenes, generación de vídeo, etc.) y el precio unitario en USD (por millón de tokens o por unidad de facturación), junto con la base_url. Esta es la fuente autoritativa.
- **`GET /v1/models`**: usa tu clave de API para obtener la lista de modelos mediante programación.

Pon el nombre del modelo directamente en el campo `model` de la solicitud. Si un modelo no admite el endpoint al que estás llamando, devolverá un error 404; consulta [Errores, límites y uso](./errors.md).

## 6. Consultar el uso {#usage}

La página **Uso** (Usage) de la consola te permite filtrar por tiempo, clave y modelo para consultar el número de solicitudes, los tokens, el coste (USD), las tendencias de uso y la distribución por modelo. También puedes exportar los detalles de las llamadas como CSV, con un intervalo de consulta de hasta 90 días. La página **Claves de API** (API keys) muestra el gasto de cada clave hoy y en total.

Las llamadas a la API y la creación en ZaiDrama comparten el mismo saldo en USD. Para recargar saldo, consulta [Cuenta, facturación y soporte](../platform/account.md#credits).

## Siguientes pasos {#next-steps}

- [Endpoints y capacidades](./endpoints.md): todos los endpoints de chat, imagen, audio, vídeo y otros.
- [Errores, límites y uso](./errors.md): códigos de error, límites de solicitudes y preguntas frecuentes.

## Integración por modelo {#model-guides}

[Catálogo e integración de modelos](./models.md) — Elige un modelo para ver sus interfaces y ejemplos completos. Usa el ID exacto: los modelos del mismo proveedor no siempre admiten las mismas interfaces.
