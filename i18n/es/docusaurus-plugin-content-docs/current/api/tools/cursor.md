---
id: cursor
title: Usar con Cursor
sidebar_label: Cursor
description: Introduce tu clave de la API de ZAI en Cursor y sustituye la URL base de OpenAI para usar modelos de ZAI en el chat y en Agent.
sidebar_position: 5
update_docs: none
---

# Usar con Cursor {#cursor}

Cursor llama a los modelos personalizados mediante el endpoint `chat.completions`, así que sirve cualquier modelo de chat. Encuentra los ID de modelos en [Catálogo e integración de modelos](../models.md).

## Configuración {#setup}

1. Abre Cursor Settings → Models.
2. En API Keys, introduce tu clave como OpenAI API Key, activa **Override OpenAI Base URL** y escribe `https://api.ourzai.com/v1`.
3. Añade a la lista de modelos los ID que quieras usar y actívalos.

## Qué usa tu clave {#scope}

Tu propia clave solo se usa con los modelos que eliges en el chat y en Agent. Las funciones integradas de Cursor, como el autocompletado Tab, siguen funcionando con el servicio de Cursor.

Si las solicitudes fallan tras la configuración, busca el código de estado en [Errores, límites y uso](../errors.md): un 401 suele indicar una clave incorrecta, y un 404, un ID de modelo mal escrito.
