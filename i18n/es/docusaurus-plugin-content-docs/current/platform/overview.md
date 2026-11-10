---
id: overview
title: Descripción general de la plataforma
description: Qué ofrece la plataforma ZAI, dónde encontrar cada punto de entrada y cómo funciona una única cuenta en todos los productos.
sidebar_position: 1
update_docs: none
---

# Descripción general de la plataforma {#overview}

ZAI es una plataforma de IA que actualmente ofrece tres categorías de productos:

- **Acompañamiento con IA (Meet Zai)**: Para personas que buscan una pareja de IA con la que charlar. Chatea de forma casual y haz llamadas de voz en zai.gg, elige un avatar y una dinámica de relación, y gestiona la memoria a largo plazo.

- **Acceso a la API**: Para desarrolladores. Una única URL base, una única clave de API: chat, imágenes, vídeo y voz pasan por un único punto de entrada, y cada llamada se factura desde tu saldo en función del uso. Gestiona claves, uso y recargas en la consola de desarrollador.

- **Espacio de trabajo de creación (ZaiDrama)**: Para creadores. Convierte ideas, novelas, guiones o presentaciones de productos en dramas cortos, anuncios o vídeos explicativos. Guion, personajes, escenas, guiones gráficos y resultado final se gestionan dentro de un único proyecto.

Los tres productos comparten la misma cuenta de plataforma. La API y ZaiDrama comparten un saldo en USD; el nivel gratuito, la membresía y las asignaciones de voz de Meet Zai se detallan en el plan de acompañamiento.

## Puntos de entrada de un vistazo {#entry-points}

| Punto de entrada | URL | Propósito |
| --- | --- | --- |
| Sitio web oficial | <https://ourzai.com> | Introducción a la plataforma. La página de inicio te permite chatear directamente con el asistente de la plataforma, Zai. |
| Meet Zai | <https://zai.gg> | Producto de acompañamiento con IA. Consulta [Inicio rápido](../zai/getting-started.md). |
| Consola de desarrollador | <https://ourzai.com/console> | Crea y gestiona claves de API, consulta el uso, recarga saldo y explora los modelos disponibles. |
| API pública | `https://api.ourzai.com/v1` | El endpoint para llamadas programáticas a modelos. Consulta [Inicio rápido de la API](../api/quickstart.md). |
| ZaiDrama | <https://zaidrama.com> | Aplicación de creación de dramas cortos con IA. Consulta [Introducción a ZaiDrama](../zaidrama/getting-started.md). |
| Centro de documentación | <https://docs.ourzai.com/es/> | Este sitio. |

## Una cuenta para todos los productos {#one-account}

Las cuentas de la plataforma se registran con una dirección de correo electrónico. Regístrate una vez y podrás iniciar sesión en Meet Zai, la consola de desarrollador y ZaiDrama. Todos los productos utilizan el mismo inicio de sesión de cuenta; si ya tienes una sesión válida, puedes entrar directamente. Si la sesión caduca o se requiere verificación, vuelve a iniciar sesión cuando se te solicite. El enlace "Espacio de trabajo de creación" de la página de inicio oficial lleva a ZaiDrama.

Para el registro, inicio de sesión, recuperación de contraseña y seguridad de la cuenta, consulta [Cuenta, saldo y soporte](./account.md).

## Saldo de la plataforma y beneficios de acompañamiento {#credits}

El saldo de la plataforma para la API y ZaiDrama está denominado y se factura en USD:

- Generar imágenes, vídeos y voces en off en ZaiDrama descuenta de tu saldo;
- Llamar a modelos a través de la API descuenta de tu saldo en función del uso por llamada;
- Chatear con el asistente de la plataforma en el sitio web oficial no descuenta de tu saldo de plataforma.

Puedes recargar el saldo en la página "Recargar" de la consola de desarrollador o en la página "Facturación y saldo" de ZaiDrama. Ambos lugares de recarga suman al mismo saldo, y el saldo recargado nunca caduca. El precio en USD por modelo está disponible en "Precios" en la consola, o puedes preguntar directamente al asistente de la plataforma en la página de inicio.

La validez de la membresía de Meet Zai, la duración de las respuestas de voz, la duración de las llamadas y los paquetes adicionales se explican en [Planes y uso de Companion](../zai/plans-and-usage.md). Recargar tu saldo de plataforma no es lo mismo que comprar Zai Plus, y tu saldo no representa la asignación de voz restante.

## Asistente de plataforma en la página de inicio {#platform-assistant}

El Zai de la página de inicio oficial es un asistente de plataforma: una IA, no un servicio de atención al cliente humano. Puede:

- Presentar la plataforma y sus productos, ayudándote a encontrar a dónde ir;
- Responder preguntas de uso e integración basándose en la documentación de este sitio, con enlaces a las fuentes;
- Consultar los modelos disponibles actualmente y sus precios públicos en USD.

No puede ver tu cuenta, comprobar tu saldo, asignación o pedidos, ni actuar en tu nombre. Para asuntos que requieran asistencia humana, consulta [Contacto y soporte](./account.md#support).

## Siguientes pasos {#next-steps}

- Si buscas un compañero de IA: empieza tu primer chat con el [Inicio rápido de Meet Zai](../zai/getting-started.md);
- Desarrolladores: obtén tu clave de API y haz tu primera solicitud con el [Inicio rápido de la API](../api/quickstart.md);
- Creadores: empieza tu primer drama corto con la [Introducción a ZaiDrama](../zaidrama/getting-started.md);
- Problemas de cuenta o saldo: consulta [Cuenta, saldo y soporte](./account.md).
