---
id: models
title: Modelos y capacidades de ZaiDrama
description: Cómo selecciona modelos por propósito la app creativa ZaiDrama en cada generación, y cómo elegir modelos, ajustar parámetros y resolver problemas de generación.
sidebar_position: 4
update_docs: engine-b
---

# Modelos y capacidades de ZaiDrama {#providers}

Esta página explica cómo elegir modelos, entender sus capacidades y resolver problemas de generación en ZaiDrama. Para llamar a los modelos de la plataforma directamente desde tu propia aplicación, consulta [Inicio rápido de la API](../api/quickstart.md).

No necesitas preparar ninguna clave de API de terceros para crear en ZaiDrama. ZaiDrama selecciona modelos **por propósito** en cada llamada, y tú solo tomas decisiones en algunos lugares a partir de los candidatos que ofrece la plataforma.

## 1. Selección de modelos por propósito {#model-usages}

Cada llamada a un modelo pertenece a un propósito fijo:

| Categoría | Propósito | Qué hace |
| --- | --- | --- |
| Texto | Tareas simples | Resúmenes del texto de origen, análisis de imágenes de estilo, comprobaciones de coherencia |
| Texto | Tareas complejas | Guiones, planificación por lotes, escritura en el lienzo |
| Texto | Asistente del lienzo | Zai actuando en tu nombre en el lienzo creativo |
| Texto | Comprensión visual y de audio del lienzo | Zai del lienzo viendo imágenes, vídeos y audio en los nodos |
| Texto | Recuperación web | Zai del lienzo consultando la web cuando necesita información en tiempo real |
| Imagen | Texto a imagen | Imágenes de personajes, imágenes de escenas, imágenes de guion gráfico y otras generaciones de imagen solo a partir de texto |
| Imagen | Imagen a imagen | Generación de imágenes con imágenes de referencia y edición de imágenes |
| Vídeo | Imagen a vídeo | Vídeos impulsados por los primeros fotogramas del guion gráfico y diseños de cuadrícula |
| Vídeo | Referencia a vídeo | Generación de vídeos directamente a partir de imágenes de referencia de personajes, escenas, atrezo o productos |
| Audio | Narración | Locuciones de narración y vistas previas de voz de personajes |

Cuando usas la selección predeterminada, la plataforma elige el modelo disponible en ese momento para el propósito correspondiente.

## 2. Dónde puedes elegir modelos {#user-model-selection}

| Ubicación | Qué puedes elegir |
| --- | --- |
| Información del proyecto → Parámetros del episodio → Modo automático | Sin selección de modelo; solo eliges "Calidad de vídeo" (Rápida / Estándar / Alta calidad) y la relación de aspecto. La plataforma elige los modelos según el nivel de calidad |
| Información del proyecto → Parámetros del episodio → Modo profesional | Elige modelos y resoluciones por separado para imagen a vídeo, referencia a vídeo, texto a imagen e imagen a imagen; por defecto, "Seguir enrutamiento global" |
| Ajustes del proyecto → Locución de narración | Modelo de narración predeterminado, voz de narración y velocidad de habla |
| Lienzo creativo → Panel de generación del nodo | El modelo usado para esta generación |

- Los menús desplegables muestran los modelos disponibles actualmente para ese propósito.
- Cuando un modelo especificado en el proyecto no está disponible temporalmente, la interfaz muestra "El modelo especificado en el proyecto no está disponible actualmente." Puedes volver a "Seguir enrutamiento global."
- El modelo de conversación de Zai y otros propósitos de texto los configura la plataforma; los usuarios no pueden elegirlos.
- La página personal de "Ajustes" no tiene opciones de modelo.

Para tu primera producción, conviene validar el estilo y los resultados con un número reducido de clips antes de ampliar el alcance.

## 3. Límites de las capacidades {#capability-boundaries}

La plataforma declara las capacidades por modelo concreto, en lugar de inferirlas del proveedor en su conjunto. Las siguientes son categorías de capacidades; cuáles admite un modelo concreto depende de las opciones realmente disponibles en el panel de generación y en los desplegables:

- **Texto**: salida estructurada, comprensión de imágenes (entrada de imagen);
- **Imagen**: texto a imagen, imagen a imagen (generación y edición con imágenes de referencia), resoluciones y relaciones de aspecto admitidas;
- **Vídeo**: imagen a vídeo (impulsado por el primer fotograma; algunos modelos admiten fotogramas finales), referencia a vídeo (varias imágenes de referencia, con número y tipo según el modelo), audio de referencia, duración, resoluciones y relaciones de aspecto admitidas;
- **Pista de audio del vídeo**: algunos modelos te permiten elegir si se genera una pista de audio, algunos siempre producen sonido y algunos son siempre silenciosos;
- **Voz**: TTS y voces seleccionables; la velocidad de habla se ajusta en los ajustes del proyecto o en los nodos de voz del lienzo.

Las solicitudes que superan las capacidades declaradas de un modelo (por ejemplo, pasar un fotograma final a un modelo que no admite fotogramas finales) se rechazan explícitamente antes del envío, y nunca se cambian silenciosamente por un modelo que no elegiste.

## 4. Tarifas y créditos {#credits-and-usage}

Los usuarios deben consultar el saldo disponible y los detalles del saldo en "Facturación y saldo", dentro del menú de la cuenta. La plataforma registra el propósito, el modelo, el estado y el coste (en USD) de cada generación; cada generación se cobra como "tarifa × uso", con una precisión de 0,0001 $ y un mínimo de 0,0001 $. Los resultados del cobro se reflejan en los detalles del saldo.

Si encuentras un saldo insuficiente o cargos anómalos, anota el nombre del proyecto y la hora en que ocurrió y contacta con el soporte en línea a través de "Ayuda y comentarios". No hagas clic repetidamente en generar ni intentes eludir las comprobaciones de créditos.

## 5. Resolución de problemas {#troubleshooting}

### Lado del usuario {#user-troubleshooting}

- **Falta un modelo en el desplegable**: el modelo no se ofrece para este propósito o no está disponible temporalmente;
- **El modelo especificado en el proyecto no está disponible**: vuelve a "Seguir enrutamiento global" o elige otro candidato;
- **La generación falló**: lee primero el motivo del fallo indicado en la página de conversación o de lote, y reintenta solo los clips afectados;
- **Lleva demasiado tiempo en cola**: las tareas se programan de manera uniforme desde la plataforma; no las vuelvas a enviar;
- **Saldo insuficiente**: comprueba tu saldo y los detalles en "Facturación y saldo".
