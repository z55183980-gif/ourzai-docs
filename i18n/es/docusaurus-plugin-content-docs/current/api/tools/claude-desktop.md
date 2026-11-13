---
id: claude-desktop
title: Usar con Claude Desktop
sidebar_label: Claude Desktop
description: Usa la configuración de inferencia de terceros de la aplicación de escritorio de Claude para que Chat, Cowork y Code usen la API de ZAI.
sidebar_position: 2
update_docs: none
---

# Usar con Claude Desktop {#claude-desktop}

La aplicación de escritorio de Claude (macOS y Windows) puede pasar a usar la API de ZAI mediante su configuración de inferencia de terceros. Una vez configurada, Chat, Cowork y Code envían todas sus solicitudes a la API de ZAI mediante el endpoint Anthropic Messages, y se cobran de tu saldo según el uso. Solo funcionan los modelos que ofrecen `messages`; compruébalos en [Catálogo e integración de modelos](../models.md).

:::tip ¿Prefieres no configurar a mano?
ZAI ofrece una [herramienta de gestión de claves](./key-tool.mdx) de escritorio que reúne tus claves de API en un solo lugar y configura el acceso por ti. [Ir a la descarga](./key-tool.mdx#download)
:::

:::note Las variables de entorno no funcionan en la aplicación de escritorio
Las sesiones locales de Code en la aplicación de escritorio usan un endpoint que fija la propia aplicación, así que `ANTHROPIC_BASE_URL` no tiene efecto, la definas en un terminal, en las variables de entorno del sistema o en `~/.claude/settings.json`. Configura la aplicación con los pasos de esta página. Si solo usas la línea de comandos, consulta [Claude Code](./claude-code.md).
:::

## Abrir la ventana de configuración {#open}

1. Actualiza la aplicación de escritorio de Claude a la última versión.
2. Activa el modo desarrollador: desde la barra de menús en macOS, o desde el menú de la aplicación (☰) en la esquina superior izquierda de la pantalla de inicio de sesión en Windows, elige **Help → Troubleshooting → Enable Developer Mode**.
3. Elige **Developer → Configure Third-Party Inference…** para abrir la ventana de configuración.

Si no aparece el menú **Developer**, repite el paso 2. Si sigue sin aparecer, tu versión de la aplicación aún no admite inferencia de terceros; actualiza primero la aplicación.

## Introducir los datos de conexión {#connection}

En la sección **Connection** de la ventana de configuración, pon **Inference provider** en **Gateway** y rellena:

| Ajuste | Valor |
| --- | --- |
| Gateway base URL | `https://api.ourzai.com` (sin `/v1`) |
| Gateway API key | Tu clave de API |
| Credential kind | **Static API key** |
| Gateway auth scheme | **Bearer** |

La aplicación añade por su cuenta `/v1/messages` y `/v1/models` a la URL base, así que no añadas `/v1` aquí.

Cuando lo hayas rellenado, puedes hacer clic en **Test connection** para comprobar la conexión antes de continuar.

![Ventana de inferencia de terceros de Claude Desktop: sección Connection con Gateway seleccionado y los datos de la API de ZAI rellenados](/img/tools/claude-desktop-gateway-light.png#light-only)
![Ventana de inferencia de terceros de Claude Desktop: sección Connection con Gateway seleccionado y los datos de la API de ZAI rellenados](/img/tools/claude-desktop-gateway-dark.png#dark-only)

## Elegir modelos {#models}

Por defecto, la aplicación llama a `GET /v1/models` para descubrir los modelos y solo pone en el selector los ID que reconoce como modelos Claude. Si el modelo que quieres no está en el selector, añade a la lista de modelos de la ventana de configuración un ID de modelo que ofrezca `messages`, escrito exactamente igual.

## Aplicar la configuración {#apply}

Haz clic en **Apply Changes**. La aplicación guarda la configuración en este dispositivo y se reinicia. Tras el reinicio, envía un mensaje en Chat, Cowork o Code para confirmar que recibes respuesta. Los cambios posteriores también surten efecto solo después de aplicarlos y de que la aplicación se reinicie.

Si el menú **Developer** ha desaparecido cuando quieras volver a cambiar algo, activa de nuevo el modo desarrollador como en el paso 2 de [Abrir la ventana de configuración](#open).

## Solución de problemas {#faq}

- **El selector de modelos está vacío**: comprueba que la clave es correcta, o añade los ID de modelos a mano como se explica en [Elegir modelos](#models).
- **401**: la Gateway API key es incorrecta, o Gateway auth scheme no es **Bearer**.
- **404 o «el modelo no está disponible»**: el ID de modelo está mal escrito, o el modelo no ofrece el endpoint `messages`.

Para otros códigos de estado, consulta [Errores, límites y uso](../errors.md).
