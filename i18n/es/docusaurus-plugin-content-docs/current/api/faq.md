---
id: faq
title: Preguntas frecuentes sobre la API
sidebar_label: Preguntas frecuentes
description: Preguntas frecuentes sobre la API para desarrolladores de ZAI, como dónde está disponible, el pago, la facturación, los precios, las diferencias con las API oficiales y la configuración en herramientas de programación.
sidebar_position: 6
update_docs: none
---

# Preguntas frecuentes sobre la API {#faq}

## ¿Qué es la API de ZAI? {#what-is-it}

La API para desarrolladores de ZAI es una pasarela de modelos que sigue el formato de la API de OpenAI. Con una sola clave de API y una sola base_url (`https://api.ourzai.com/v1`), puedes llamar a modelos de chat, imagen, voz y vídeo de GPT, Claude, Grok y otros proveedores. El código existente que usa el SDK de OpenAI o HTTP solo necesita una nueva base_url y una nueva clave. Consulta [Inicio rápido de la API](./quickstart.md).

## ¿Puedo usarla en Hong Kong, Taiwán u otras regiones? {#regions}

Sí. La API se ofrece a desarrolladores de todo el mundo. En Hong Kong, Taiwán, el Sudeste Asiático y otras regiones puedes registrarte, recargar saldo y hacer llamadas directamente; todas las solicitudes se envían a `https://api.ourzai.com`. Cumple los [Términos del servicio](https://ourzai.com/legal/terms.html) y las leyes del lugar donde te encuentres.

## ¿Cómo pago? {#payment}

Compra un paquete de recarga en la página "Top up" de la [consola para desarrolladores](https://ourzai.com/console). Los pagos los procesa Stripe, y la página de pago muestra los métodos de pago disponibles para ti. Las recargas llegan como saldo en dólares estadounidenses que no caduca. Consulta [Créditos](../platform/account.md#credits).

## ¿Cómo se cobra? ¿Hay cuota mensual? {#billing}

No hay cuota mensual ni suscripción. Cada llamada se cobra de tu saldo en dólares estadounidenses según el uso real. La unidad de facturación depende del tipo de modelo (por millón de tokens o por unidad de facturación), y una tarea de vídeo se cobra una sola vez, solo cuando el vídeo se genera correctamente. Consulta [Facturación y uso](./errors.md#billing).

## ¿Cómo se comparan los precios con los de las API oficiales? {#price}

La página **Precios** (Pricing) de la consola muestra el precio en dólares estadounidenses de cada modelo junto con su descuento respecto al precio público del proveedor. Los precios cambian; la página siempre muestra los vigentes.

## ¿En qué se diferencia de usar directamente la API oficial de OpenAI o Anthropic? {#vs-official}

- Una sola clave llama a modelos de varios proveedores, y el uso y la facturación de todos ellos se consultan en una sola consola.
- Los endpoints siguen el formato de OpenAI, así que los modelos de chat de Claude también se pueden llamar con `/v1/chat/completions`. Los modelos de Claude que ofrecen el endpoint nativo `messages` también se pueden usar directamente con el SDK de Anthropic. Consulta [Interfaces y capacidades](./endpoints.md).
- Los ID de modelo son propios de esta plataforma, y distintos modelos del mismo proveedor no ofrecen necesariamente los mismos endpoints. Consulta [Catálogo e integración de modelos](./models.md).
- Cuando un proveedor de origen sufre una caída o un límite de frecuencia, las solicitudes pueden devolver 502/503; espera y vuelve a intentarlo con retroceso. Consulta [5xx Servicio no disponible temporalmente](./errors.md#status-5xx).

## ¿Puedo usarla en Cursor, Cline, Claude Code o Codex? {#tools}

Sí. Para saber dónde introduce cada herramienta la base_url, la clave y el modelo, consulta [Usar con herramientas de programación](./tools/tools.md).

## ¿A quién contacto si algo falla? {#support}

Escribe a support@ourzai.com con el correo de tu cuenta, la hora del error y el mensaje de error de la respuesta. No incluyas tu clave de API. Para otros canales de contacto, consulta [Contacto y soporte](../platform/account.md#support).
