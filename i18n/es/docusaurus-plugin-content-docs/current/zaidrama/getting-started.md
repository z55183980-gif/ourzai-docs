---
id: getting-started
title: Tutorial de introducción a ZaiDrama
description: El recorrido completo en ZaiDrama desde una sola frase, pasando por la finalización de un plan con Zai, la confirmación de la producción y la recepción del vídeo terminado.
sidebar_position: 1
update_docs: engine-a
---

# Tutorial de introducción a ZaiDrama {#getting-started}

Este tutorial te guía en la creación de tu primer drama corto en ZaiDrama (una aplicación de creación de dramas cortos con IA, <https://zaidrama.com>): partiendo de una sola frase o de un guion, refinando tus requisitos hasta convertirlos en un plan con Zai, confirmando el presupuesto de producción y recibiendo un vídeo terminado descargable. Solo tienes que abrir el sitio web e iniciar sesión; no es necesario instalar software ni configurar claves de API de terceros.

## Qué vas a conseguir {#what-you-will-build}

Al terminar este tutorial podrás:

1. Registrarte e iniciar sesión en la cuenta unificada de la plataforma;
2. Crear un proyecto en la página de inicio con una frase, un fragmento de novela o guion, o imágenes de referencia;
3. Desarrollar una propuesta creativa, un modelo de mundo y un plan de producción con Zai en una sola conversación;
4. Confirmar el presupuesto de producción y dejar que Zai avance por lotes en guiones gráficos, vídeos y el montaje final;
5. Seguir el progreso en el panel y en las páginas de lotes, y volver a rodar localmente cualquier segmento con el que no quedes satisfecho;
6. Previsualizar y descargar el vídeo terminado y el paquete editable.

## Tiempo y coste estimados {#time-and-cost}

- Enviar el primer mensaje, crear un proyecto y discutir el plan no genera cargos; solo la generación de imágenes, vídeo y audio descuenta de tu saldo (en USD).
- El tiempo de generación del vídeo depende del número de segmentos, de la cola de la plataforma y de los modelos utilizados.
- Tu saldo, los importes retenidos y los detalles de facturación están disponibles en "Facturación y saldo" dentro del menú de cuenta; la tarjeta de confirmación que aparece antes de la producción indica claramente cuánto costará este rodaje.
- Para tu primer intento, te recomendamos usar solo una pequeña cantidad de contenido, o decirle a Zai que "rode primero los dos primeros segmentos" para validar el estilo y los resultados antes de ampliar el alcance.

## 1. Regístrate e inicia sesión {#create-account}

### 1.1 Regístrate o inicia sesión {#sign-in}

En la página de inicio, haz clic en "Empezar a crear" o en "Iniciar sesión / Registrarse":

- **Iniciar sesión**: introduce tu correo electrónico o nombre de usuario y tu contraseña en el modal de inicio de sesión.
- **Registrarse**: en la página "Crea tu cuenta ZAI", regístrate con un código de verificación enviado por correo; la contraseña debe tener al menos 6 caracteres e incluir letras y números.
- **Olvidé mi contraseña**: haz clic en "¿Olvidaste tu contraseña?" dentro del modal de inicio de sesión para restablecerla con un código de verificación por correo.
- **Entrar desde la plataforma ZAI**: en ourzai.com, haz clic en "Espacio de creación" para entrar; si ya tienes una sesión iniciada válida, no tendrás que volver a introducir la contraseña.

ZaiDrama y la plataforma ZAI comparten la misma cuenta, de modo que una cuenta registrada en el sitio web oficial o en la consola para desarrolladores puede iniciar sesión directamente. Si tu sesión caduca o se requiere una verificación de seguridad, sigue las indicaciones de la página para volver a iniciar sesión. Para una guía completa sobre cuentas y saldos, consulta [Cuenta, saldo y soporte](../platform/account.md).

### 1.2 Menú de cuenta {#account-services}

El menú de cuenta situado en la esquina inferior izquierda de la barra lateral ofrece lo siguiente:

| Entrada | Función |
| --- | --- |
| Perfil | Avatar, apodo, vinculación de correo, cambio de contraseña, dispositivos de inicio de sesión, eliminar cuenta |
| Centro de recompensas | Recompensas por inicio de sesión diario, recompensas por referidos |
| Facturación y saldo | Saldo disponible, detalles del saldo, historial de compras, recargar |
| Almacenamiento | Capacidad utilizada, uso por proyecto, limpieza de versiones antiguas |
| Ayuda y comentarios | Atención al cliente en línea |
| Ajustes | Apariencia e idioma, tokens de API (para que herramientas externas accedan a ZaiDrama; distintos de las claves de API de la consola para desarrolladores), acerca de, registros de diagnóstico |

La insignia de saldo de la barra superior muestra tu saldo actual en USD; haz clic en ella para ver los detalles de uso.

## 2. Crea un proyecto desde la página de inicio {#start-conversation}

### 2.1 Di lo que quieres crear {#creative-intent}

El título de la página de inicio dice: "¿Qué quieres convertir en vídeo hoy?". Escribe en el cuadro de entrada cualquiera de estos puntos de partida:

- Una idea para una historia o un único objetivo creativo;
- Un fragmento de novela, un guion, un esquema o la presentación de un producto;
- Tus requisitos de estilo artístico, duración, relación de aspecto o público objetivo.

Las entradas de inicio rápido situadas debajo del cuadro de entrada pueden ayudarte a empezar: "Subir novela / Guion" abre directamente el selector de archivos; "Tengo una idea", "Escribir un episodio de un inicio viral de drama" y "Rodar un anuncio para un producto" solo rellenan el cuadro de entrada con una frase sin enviarla por ti.

### 2.2 Adjunta materiales {#source-intake}

Añade archivos adjuntos con el botón del clip en el cuadro de entrada, arrastrando y soltando, o pegando:

- **Imágenes**: PNG, JPG, WebP, hasta 5 MB por imagen y hasta 5 imágenes a la vez. Las imágenes se muestran a Zai y sirven como referencias de personajes, escenas o productos.
- **Archivos de novela / guion**: `.txt`, `.md`, `.docx`, `.epub`, `.pdf`, hasta 50 MB por archivo y hasta 5 archivos a la vez. Tras enviarlos, se guardan como texto fuente del proyecto.
- **Texto largo pegado**: al pegar un bloque largo de texto (unos 800 caracteres, 16 líneas o más), este se pliega automáticamente en una tarjeta de "Texto pegado", que también se guarda como texto fuente y cuenta como un hueco de archivo; si no quieres que ocurra, haz clic en "Volver a editar el cuerpo del texto".

Un único mensaje del cuadro de entrada tiene un límite de 20 000 caracteres; adjunta como archivo los contenidos más largos. Los PDF escaneados no tienen texto extraíble y deben pasarse primero por OCR; convierte los archivos `.doc` heredados a `.docx` antes de subirlos.

### 2.3 Al enviar se crea el proyecto {#create-project}

Cuando envías tu primer mensaje, ZaiDrama crea un proyecto y te lleva a la página del proyecto, donde tu mensaje y los archivos adjuntos continúan en la conversación con Zai dentro del proyecto. La página de inicio no guarda el historial de chat por separado; cada proyecto tiene exactamente una conversación con Zai que abarca desde las discusiones de planificación hasta el vídeo terminado. El proyecto se inicia como "Proyecto sin título" y Zai lo renombra después de leer el texto fuente.

## 3. Conoce la página del proyecto {#project-workspace}

La página del proyecto se divide en tres áreas:

- **Área principal: conversación con Zai**. Aquí haces peticiones, respondes preguntas y confirmas presupuestos; Zai informa aquí de lo que ha hecho en cada paso.
- **Lado derecho: banco de trabajo**. Redimensionable arrastrando y plegable. El "Panel" está siempre fijado a la izquierda del todo; haz clic en "+" para abrir "Lotes", "Documentos", "Biblioteca de recursos" e "Información del proyecto". Cuando el proyecto tiene productos, también aparece "Productos". Cada página es una pestaña que se puede cerrar.
- **Lado izquierdo: esquema del progreso de producción**. Muestra la etapa actual entre "Preproducción / Guion / Preparación de recursos / Producción episodio a episodio / Entrega final".

Al entrar por primera vez en un proyecto, el banco de trabajo abre automáticamente la página correspondiente a la etapa actual de Zai; después, tú decides entre qué páginas alternar. La etiqueta de estado del centro de la barra superior (por ejemplo, "Produciendo · Guiones gráficos 8/11" o "Necesita tu decisión") te devuelve al panel con un solo clic.

## 4. Finaliza el plan con Zai {#confirm-project}

### 4.1 Revisión del guion y preguntas {#script-review}

Si has proporcionado una novela o un guion, Zai lo lee primero y realiza una revisión del guion: identifica episodios que faltan, agujeros lógicos, personajes sin función y giros sin motivación (hasta 5 elementos, cada uno con el texto original y una corrección sugerida) y después pregunta si quieres hacer cambios.

Cuando Zai necesita que tomes una decisión, muestra una tarjeta de pregunta que se sitúa encima del cuadro de entrada: las opciones pueden estar marcadas como "Recomendada" y puedes seleccionarlas con las teclas numéricas o pulsar Esc para omitirla. Si ninguna de las opciones encaja, escribe tu respuesta en el cuadro de entrada; sigue contando como respuesta. Cuando se hacen varias preguntas a la vez, la tarjeta incluye una opción "Otro…" para responder a una pregunta concreta de forma individual. Seleccionar una opción como "Tengo un guion / novela" te lleva al cuadro de entrada, donde puedes pegar el texto o hacer clic en + para subir un archivo.

### 4.2 El plan de tres capas {#choose-content-mode}

Zai organiza tus requisitos en un plan editable de tres capas:

- **Propuesta creativa**: qué crear, para quién, dónde se publicará, qué duración debe tener y qué tono usar;
- **Modelo de mundo**: personajes (identidad y apariencia), escenas, atrezo, productos, estilo visual y reglas de continuidad;
- **Plan de producción**: división de la obra en segmentos, cada uno con tipo, duración, personajes implicados y dirección visual y de audio.

Los proyectos no requieren elegir por adelantado un modo como "drama corto / narración / anuncio", ni tampoco seleccionar de antemano una vía de "guion gráfico / imagen de referencia": cada segmento decide su propia ruta de producción, y una misma obra puede combinar enfoques. Después de que importes una novela o un guion, Zai también recomienda un estilo de proyecto (realista, drama cómico 3D o drama cómico 2D), con el realista como opción predeterminada.

En las acciones sin coste, como organizar el plan, analizar el texto fuente o escribir el primer borrador del guion, Zai simplemente las completa y te lo comunica. Solo muestra una tarjeta de confirmación cuando necesita sobrescribir contenido que hayas editado personalmente. Consulta [Flujos de trabajo creativos](./workflows.md) para más detalles.

### 4.3 Adopción del plan y confirmación de producción {#proposal-gate}

Cuando el plan toma forma, aparece un banner de confirmación encima de la conversación:

- **Adoptar plan de producción**: cuando el guion o las imágenes de recursos aún no están listos, adopta primero el plan; este paso no genera coste.
- **Confirmación de producción**: el título de la tarjeta indica "La producción costará $N" (USD). Haz clic en "Ver detalles" para consultar el número de segmentos, los segundos de vídeo, el número de guiones gráficos, el número de imágenes de escenario, así como el cambio en el saldo y los elementos no incluidos (como los rehacer). Después de hacer clic en "Aprobar y comenzar la producción", este presupuesto se asigna al proyecto actual y los pasos incluidos en ese presupuesto avanzan automáticamente sin interrumpirte uno a uno.

Puedes rodar solo una parte del proyecto: dile a Zai "roda primero el episodio uno" o "roda solo los dos primeros segmentos", y el presupuesto cubrirá únicamente esos segmentos; todos los guiones gráficos y vídeos posteriores se mantendrán dentro de ese alcance.

Si hay una tarjeta de confirmación pendiente y escribes un mensaje nuevo en el cuadro de entrada, la tarjeta queda anulada y Zai vuelve a empezar basándose en tus nuevos requisitos.

## 5. Revisa documentos y recursos {#review-script-assets}

### 5.1 Documentos {#script-documents}

La página "Documentos" del banco de trabajo muestra "Documentos originales" y guiones agrupados por "Lote N"; cada lote contiene la "Fuente del lote" y el "Guion oficial". Haz clic en "Subir archivo fuente" para añadir más materiales.

Abre el guion oficial para ver el contenido de cada segmento. Cuando un personaje tiene varios vestuarios, cada segmento debe tener uno seleccionado en el desplegable "Vestuario"; los segmentos sin selección muestran "No seleccionado" y deben corregirse antes de generar los guiones gráficos.

Los guiones los escribe directamente Zai, y puedes revisarlos y modificarlos en cualquier momento; si más adelante Zai necesita sobrescribir contenido que has editado, te pedirá tu consentimiento primero.

### 5.2 Personajes, escenas y atrezo {#asset-review}

La página "Biblioteca de recursos" agrupa los elementos por personajes, escenas y atrezo, y permite filtrar, añadir elementos nuevos o reutilizar recursos de otros proyectos mediante "Seleccionar de la biblioteca de recursos":

- **Imágenes de referencia de personajes**: una por personaje, que incluye un primer plano de cabeza y hombros más planos de cuerpo entero de frente, perfil y espalda; sirven como ancla de identidad para todas las generaciones posteriores.
- **Vestuarios**: un personaje puede tener varios vestuarios (pelo, parte de arriba, parte de abajo, zapatos, accesorios). Las variantes distintas del vestuario principal usan la imagen de referencia del vestuario principal como ancla de identidad, por lo que la imagen de referencia del vestuario principal debe generarse primero.
- **Voz**: puedes definir un audio de referencia para un personaje o generar un clip mediante conversión de texto a voz.
- **Historial de versiones**: las imágenes de recursos, los guiones gráficos y los vídeos admiten "Cambiar a esta versión"; después de "Bloquear versión actual", los resultados regenerados solo pasan a los candidatos históricos y no sustituyen a la versión actual.

Las entradas que añadas en la biblioteca de recursos se comunican automáticamente a Zai. Cuando cambian las definiciones de los recursos, los guiones gráficos y vídeos ya generados no se sobrescriben silenciosamente; en su lugar, se marcan como "anteriores al contenido actual", y tú decides si rehacerlos o no.

## 6. Sigue la producción {#run-production}

### 6.1 Panel y estado {#production-gates}

Una vez iniciada la producción, el "Panel" se convierte en el panel de producción:

- **Progreso por estación**: las cinco estaciones: Plan y guion, Imágenes de escenario, Guiones gráficos, Vídeos y Montaje final;
- **Necesita tu decisión**: por ejemplo, un paso ha superado su presupuesto y espera confirmación, o una estación tiene varios elementos fallidos;
- **Últimos resultados**: el contenido recién generado lleva un marcador "Nuevo".

Cada paso de la conversación informa de los resultados mediante una tarjeta de entrega, como "Generar vídeo · Completado", "Usando presupuesto de producción", "Tiempo transcurrido …"; los fallos parciales indican "M de N fallaron, el resto completado".

### 6.2 Página de lote {#task-status}

La producción avanza por lotes: cuando todos los guiones gráficos y vídeos de un lote están listos, se pasa al siguiente lote. La barra de título de la página "Lotes" permite alternar entre el lote anterior y el siguiente, y ofrece dos vistas:

- **Previsualización** (predeterminada): reproduce este lote de forma continua, con el guion de rodaje desplazándose línea a línea de forma sincronizada; cada segmento permite inspeccionar la instrucción enviada al modelo de vídeo, con pistas de vídeo y audio separadas debajo. Los segmentos fallidos indican el motivo y ofrecen "Reintentar".
- **Revisar y editar**: el vídeo compilado de este lote, el estado de producción, los personajes del lote, las imágenes de los guiones gráficos, la revisión de candidatos y los clips de vídeo.

Para pausar, reanudar o cancelar la producción, solo tienes que decírselo a Zai en la conversación. Los estados de las tareas incluyen En cola, En curso, Completada, Fallida, Cancelada e Interrumpida. Cuando la plataforma se reinicia, los vídeos ya enviados a los servicios de modelos siguen esperando resultados; un pequeño número de tareas de imagen en curso puede marcarse como interrumpido y debe regenerarse individualmente.

### 6.3 Rodajes locales {#rerun-and-versions}

Si no quedas satisfecho con un segmento, di claramente en la conversación qué segmento quieres cambiar y cómo (por ejemplo, "haz que parezca más fría en el segmento 3"). Zai ofrece una comparación de antes y después; una vez que confirmes, solo se rehace el vídeo de ese segmento.

- Los rodajes repetidos y las revisiones automáticas se descuentan de un presupuesto de rehacer independiente y no consumen el presupuesto de producción; si el presupuesto de rehacer es insuficiente, aparece otra tarjeta de confirmación.
- El resultado que no supera la validación automática se revisa automáticamente; si el mismo problema alcanza el límite de revisiones, se te devuelve para que decidas.
- La "Revisión de candidatos" enumera las versiones candidatas por puntuación, con opciones para "Seleccionar y bloquear", "Rechazar", "Generar otra" o "Revisar según sugerencia".

Los cambios que hagas directamente en el banco de trabajo (como cambiar de versión o volver a compilar) dejan un registro en la conversación, de modo que Zai los conoce antes de hablar la próxima vez.

## 7. Previsualiza y descarga {#preview-and-export}

La sección "Vídeo compilado de este lote", en la parte superior de la vista "Revisar y editar" de la página del lote, ofrece:

- Previsualización del vídeo compilado con un conmutador para activar o desactivar los "Subtítulos del montaje final";
- "Descargar" para el vídeo terminado;
- "Historial de versiones" para ver montajes compilados anteriores, con "Actual" marcando la versión en uso;
- "Volver a compilar".

El reproductor del segmento de vídeo ofrece:

- Para los segmentos con narración, alternar entre "Corte de audio original" y "Superposición de texto a voz";
- "Descargar paquete editable": un zip con el vídeo, el audio de narración, los subtítulos (`.vtt` / `.srt`) y un archivo de descripción, para editarlos después en otro software de vídeo.

El tamaño, la posición, el color y la fuente de los subtítulos se ajustan en "Información del proyecto → Estilo de subtítulos" y se aplican a partir de la siguiente compilación.

Te recomendamos descargar los vídeos terminados y los materiales que necesites conservar a largo plazo.

## 8. Modelos y parámetros {#provider-boundary}

La sección "Parámetros del episodio" de la página "Información del proyecto" tiene dos modos:

- **Modo automático**: elige solo la "Calidad de vídeo" (Rápida / Estándar / Alta calidad) y la relación de aspecto (Vertical 9:16 / Horizontal 16:9); la plataforma decide el modelo.
- **Modo Pro**: elige el modelo y la resolución según el caso de uso (imagen a vídeo, referencia a vídeo, texto a imagen, imagen a imagen), con la opción predeterminada "Seguir enrutamiento global"; también puedes establecer si se genera audio y el estilo del proyecto.

Ambos modos permiten configurar el método de entrega de la narración (voz en off de posproducción o voz en off de texto a voz) y el estilo de los subtítulos. El elemento "Ajustes del proyecto…" del menú del proyecto permite cambiar el estilo del proyecto y el modelo, la voz y la velocidad de la voz en off de narración. El modelo conversacional que usa Zai lo configura la plataforma y no puede ser seleccionado por los usuarios.

Los modelos seleccionables provienen únicamente de los candidatos actualmente abiertos en la plataforma. Cuando una capacidad no está disponible, una tarea falla o la facturación parece incorrecta, comprueba primero el motivo del fallo en la conversación; si no se resuelve, contacta con atención al cliente en línea mediante "Ayuda y comentarios". Nunca pegues ninguna clave de API ni contraseña en la conversación.

## 9. Próximos pasos {#next-steps}

- Lee [Flujos de trabajo creativos](./workflows.md) para aprender sobre segmentos, lotes, validación automática y puntos de confirmación;
- Lee [Lienzo creativo](./canvas.md) para experimentar libremente con imágenes y vídeos fuera de los proyectos;
- Lee [Modelos y capacidades](./models.md) para entender los límites de cada caso de uso;
- Consulta las [Preguntas frecuentes](./faq.md) si encuentras problemas con la cuenta, la producción o las descargas.
