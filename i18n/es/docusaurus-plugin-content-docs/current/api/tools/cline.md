---
id: cline
title: Usar con Cline
sidebar_label: Cline
description: Elige el proveedor OpenAI Compatible en Cline e introduce la URL base, la clave y el ID de modelo de la API de ZAI.
sidebar_position: 6
update_docs: none
---

# Usar con Cline {#cline}

Cline llama a los modelos mediante el endpoint `chat.completions`, así que sirve cualquier modelo de chat. Encuentra los ID de modelos en [Catálogo e integración de modelos](../models.md).

## Configuración {#setup}

1. Abre los ajustes de Cline y pon «API Provider» en **OpenAI Compatible**.
2. Pon «Base URL» en `https://api.ourzai.com/v1`.
3. Introduce tu clave en «API Key».
4. En «Model ID», escribe el ID de un modelo de chat que admita `chat.completions`.

Cline envía muchas solicitudes seguidas para completar una tarea, así que conviene fijar un límite de gasto en la clave. Consulta [Obtener una clave](../quickstart.md#get-key). Si las solicitudes fallan tras la configuración, busca el código de estado en [Errores, límites y uso](../errors.md).
