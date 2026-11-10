---
id: faq
title: Preguntas frecuentes sobre ZaiDrama
description: Preguntas frecuentes sobre cuentas, avance de producción, regrabaciones, lienzo, voces en off y descargas en la aplicación de creación ZaiDrama.
sidebar_position: 5
update_docs: engine-b
---

# Preguntas frecuentes sobre ZaiDrama {#faq}

Este artículo cubre las preguntas más comunes sobre cuentas, producción y descargas en la aplicación de creación ZaiDrama. Si es la primera vez que la usas, te recomendamos empezar por la [Guía de inicio de ZaiDrama](./getting-started.md). Para cuentas y saldos de la plataforma, consulta [Cuenta, saldo y soporte](../platform/account.md).

## ¿Qué límites de capacidad debo conocer antes de usar ZaiDrama? {#capability-boundaries}

- La generación de medios es programada por la plataforma a través de servicios de modelos externos. La velocidad de generación, la disponibilidad y las políticas de contenido pueden cambiar según el estado actual del servicio.
- Zai avanza automáticamente la mayoría de los pasos, pero para contenido de larga duración recomendamos revisar el plan, las hojas de referencia de personajes y los segmentos clave. ZaiDrama busca potenciar a los creadores, no sustituir su criterio.
- Los distintos modelos de vídeo admiten límites diferentes en cuanto a número de imágenes de referencia, duración, pistas de audio y resolución.
- Solo tienes que abrir el sitio web e iniciar sesión para empezar. No se requiere instalar software ni usar claves API de terceros.

## Registro, inicio de sesión y cuenta {#install-deploy-update}

### ¿Cómo empiezan los usuarios normales? {#how-to-install}

En la página de inicio, haz clic en «Comenzar a crear», regístrate o inicia sesión con una cuenta unificada de la plataforma y entra en la página principal. Escribe en el cuadro de entrada qué vídeo quieres hacer o adjunta una novela, un guion e imágenes de referencia. Al enviar el primer mensaje se crea un proyecto y accedes a su página. Este paso no genera ningún cargo.

### ¿Cómo inicio sesión? ¿Qué hago si olvido mi contraseña? {#default-login}

- El cuadro de inicio de sesión admite entrar con correo electrónico o nombre de usuario. No hay una cuenta predeterminada; primero debes registrarte.
- Si olvidas tu contraseña, haz clic en «¿Olvidaste tu contraseña?» en el cuadro de inicio de sesión y restablécala con un código de verificación por correo.
- Si ya has iniciado sesión y quieres cambiar la contraseña, ve a «Centro personal» en el menú de la cuenta y haz clic en «Cambiar contraseña».
- Al entrar desde ourzai.com a través del «Espacio de trabajo de creación», no necesitarás volver a introducir la contraseña si ya tienes una sesión válida. ZaiDrama y la plataforma ZAI comparten la misma cuenta.

Nunca compartas tu contraseña ni tu código de verificación con nadie por chat.

### ¿Cómo consulto los dispositivos con sesión iniciada o elimino mi cuenta? {#account-security}

En «Centro personal», dentro de «Dispositivos con sesión», puedes ver todos los dispositivos con sesión activa y hacer clic en «Cerrar sesión» en cada uno. «Eliminar cuenta» también está en el Centro personal.

### ¿Qué hago si las páginas de la plataforma no abren o las solicitudes fallan? {#page-request-failure}

Primero comprueba tu conexión de red y tu estado de sesión; luego actualiza la página y vuelve a intentarlo. Si solo falla un proyecto o una generación concretos, revisa el motivo del fallo indicado en la conversación o en la página de lotes. Si los fallos persisten, contacta con el soporte en línea a través de «Ayuda y comentarios» en el menú de la cuenta, indicando la hora y la página donde se produjo. Si es necesario, descarga los registros de diagnóstico desde «Ajustes → Registros de diagnóstico» y envíalos al soporte. No subas archivos de entorno ni pegues credenciales en el chat.

### ¿Cómo se actualiza la plataforma? ¿Perderé mis proyectos? {#platform-updates}

El sitio web se actualiza automáticamente; los usuarios no necesitan instalar paquetes de actualización. Durante las actualizaciones, los vídeos ya enviados a los servicios de modelos seguirán esperando resultados. Un número reducido de tareas de imagen en curso puede marcarse como interrumpido y necesitar regeneración. Los resultados ya completados no se sobrescribirán silenciosamente con las nuevas versiones.

### ¿Dónde se almacenan los proyectos? ¿Cómo hago copias de seguridad? {#where-is-data}

Los proyectos, los recursos y los resultados de generación se almacenan en la plataforma. Recomendamos descargar el contenido que quieras conservar a largo plazo. Puedes descargar en cualquier momento los vídeos terminados, los paquetes editables y el audio de narración, pero la plataforma no ofrece exportación ZIP a nivel de proyecto. Los datos de cuenta y saldo no se incluyen en ninguna descarga.

### ¿Qué hago si el almacenamiento está lleno? {#storage-full}

En el menú de la cuenta, dentro de «Almacenamiento», consulta el límite de capacidad y el uso por proyecto. Usa «Limpiar historial» para eliminar las versiones históricas que ya no necesites (solo se eliminan las versiones históricas; las versiones actualmente en uso se conservan).

## Conversar con Zai {#setup-and-assistant}

### ¿Qué credenciales necesito configurar antes de empezar a producir? {#required-credentials}

Ninguna. Los usuarios normales solo necesitan una cuenta unificada de la plataforma. La conversación de Zai, las capacidades de texto/imagen/vídeo/voz y los recursos de tareas son proporcionados por la plataforma.

### ¿Cómo consigo que Zai inicie o reanude la producción? {#start-or-resume-assistant}

Indica tu objetivo directamente en la conversación de Zai del proyecto, por ejemplo «Inicia la producción» o «Continúa rodando el resto». Zai primero revisará el avance actual del proyecto y continuará desde donde lo dejó. Cuando necesite una decisión tuya, mostrará una tarjeta de pregunta o de confirmación encima del cuadro de entrada.

### ¿Gastará Zai dinero sin preguntarme? {#assistant-spending}

No superará el alcance que apruebes:

- Antes de empezar el rodaje, Zai te da un presupuesto. Después de hacer clic en «Aprobar y comenzar», los pasos dentro de ese presupuesto se ejecutan automáticamente sin más interrupciones.
- Cuando se supere el presupuesto de rodaje o el presupuesto de retrabajo sea insuficiente, aparecerá de nuevo una tarjeta de confirmación.
- Las acciones que no generan coste, como analizar el texto fuente, organizar el plan o redactar el primer borrador del guion, se completan directamente y se te informa después.
- Cuando Zai quiera sobrescribir contenido que hayas editado manualmente, también te pedirá consentimiento primero.

### ¿Puedo rodar solo una parte primero? {#partial-production}

Sí. Dile a Zai «Rueda primero el episodio 1» o «Rueda solo los dos primeros segmentos». El presupuesto cubrirá únicamente esos segmentos, y los guiones gráficos y vídeos posteriores se mantendrán dentro de ese alcance. Cuando termines, pide a Zai que continúe con el resto.

### Si edito cosas directamente en el espacio de trabajo, ¿Zai lo sabe? {#workbench-edits}

Sí. Cuando añades nuevos elementos a la biblioteca de recursos, Zai los lee primero y te pregunta cómo quieres usarlos. Acciones como cambiar de versión o recomponer dejan un registro en la conversación que Zai verá antes de su siguiente turno. Cuando Zai quiera sobrescribir contenido que hayas editado, te pedirá confirmación primero, mostrando cada cambio «antiguo → nuevo» en la tarjeta.

### ¿Qué hago si Zai no arranca o las solicitudes agotan el tiempo de espera? {#assistant-startup-failure}

Primero actualiza la página. Zai se reconecta automáticamente si se pierde la conexión, y el turno actual no se interrumpirá. Si sigue sin funcionar, anota la hora y contacta con el soporte en línea a través de «Ayuda y comentarios».

## Modelos y proveedores {#providers-models-api}

### ¿Qué modelos admite ZaiDrama? ¿Puedo elegirlos yo? {#supported-providers}

La plataforma selecciona los modelos para cada invocación en función de la tarea (texto a imagen, imagen a vídeo, referencia a vídeo, narración, etc.). El rango disponible se muestra en la página del producto. Puedes elegir entre los candidatos disponibles de la plataforma en los parámetros del episodio (Modo Pro) dentro de «Información del proyecto», en la voz en off de narración de los ajustes del proyecto y en el panel de generación del lienzo creativo. El modelo de conversación de Zai no se puede seleccionar. Consulta [Modelos y capacidades](./models.md).

### ¿Puedo usar mi propio proveedor de modelos en ZaiDrama? {#custom-provider-setup}

No. ZaiDrama proporciona modelos listos para usar y no admite añadir tus propios proveedores de modelos.

- Para llamar a los modelos de la plataforma desde tu propio programa: crea una clave API en la consola de desarrollador y configura base_url como `https://api.ourzai.com/v1`. Consulta la [Guía rápida de la API](../api/quickstart.md).
- La opción «Ajustes → Tokens de API» de ZaiDrama crea tokens para que herramientas externas accedan a ZaiDrama en sí, lo que es diferente de las claves API de la consola de desarrollador.

### ¿Qué debo hacer si falla una generación? {#auth-rate-limit-timeout}

Primero comprueba el motivo del fallo: la tarjeta de envío en la conversación y la página de lotes indican qué elementos han fallado y por qué. La plataforma reintenta automáticamente cuando los servicios externos están limitados por velocidad o no disponibles temporalmente. Si los reintentos no ayudan, vuelve a rodar solo los segmentos afectados; no reenvíes el lote completo. Si se agota el tiempo de espera después del envío, es posible que la tarea externa ya se haya creado. No reintentes a ciegas en rápida sucesión: espera un poco, comprueba los resultados y contacta con soporte si el problema persiste.

## Flujo de trabajo del proyecto y producción {#project-workflow-and-tasks}

### ¿Necesito elegir primero modo narración, episodio o anuncio? {#choose-mode-and-route}

No. Los proyectos no tienen modo de contenido ni ruta de generación que se bloquee tras la creación. Zai decide el tipo de cada segmento (interpretación, narración, presentación, etc.) y el método de generación de vídeo (guiado por guion gráfico o por referencia) según el material. Puedes mezclarlos dentro del mismo episodio. Consulta [Flujo de trabajo de creación](./workflows.md).

### ¿Qué formatos de archivo fuente se admiten? {#supported-source-formats}

- Archivos: `.txt`, `.md`, `.docx`, `.epub`, `.pdf`. Cada archivo debe pesar menos de 50 MB, con un máximo de 5 archivos por adjunto.
- Imágenes: PNG, JPG, WebP. Cada imagen debe pesar menos de 5 MB, con un máximo de 5 imágenes por adjunto.
- Puedes adjuntar archivos e imágenes directamente en el cuadro de entrada de Zai, en la página principal o en un proyecto. También puedes usar «Subir archivo fuente» en la página de Guiones del proyecto.
- Al pegar un texto muy largo, se compacta automáticamente en una tarjeta «Texto pegado», que se guarda como texto fuente al enviarse.

Los PDF escaneados no tienen texto extraíble y requieren OCR previo. Convierte los archivos heredados `.doc` a `.docx` antes de subirlos.

### ¿Dónde puedo consultar el avance de la producción? {#production-progress}

- La etiqueta de estado en el centro de la barra superior, como «Produciendo · Guiones gráficos 8/11» o «Necesita tu decisión».
- El progreso de cinco etapas, «Necesita tu decisión» y «Últimos resultados» en el tablero Kanban del espacio de trabajo.
- La página de Lotes para previsualizar lote por lote. Cada segmento muestra el prompt enviado al modelo de vídeo y el motivo del fallo, si lo hay.

### ¿Por qué se ha estancado la producción? {#stage-blocked}

Motivos habituales:

- Un paso está esperando tu confirmación (el Kanban muestra «Un paso necesita tu confirmación», con la tarjeta de confirmación encima del cuadro de diálogo).
- Un personaje tiene varios atuendos, pero en algunos segmentos aún no se ha seleccionado ninguno.
- Algunos segmentos de una etapa han fallado y necesitas decidir si reintentar o revisar.
- El alcance de rodaje actual está completo; para continuar con más, avisa a Zai.

### ¿Cómo pauso, reanudo o cancelo la producción? {#task-states}

Solo tienes que decírselo a Zai en la conversación, por ejemplo «Pausa», «Continúa» o «Cancela esta producción». Al cancelar y reanudar, solo se rehacen las partes canceladas o faltantes; los resultados completados se conservan y se reutilizan.

### ¿Qué hago si solo quiero volver a rodar un segmento? {#reshoot-segment}

En la conversación, especifica qué segmento y cómo cambiarlo, por ejemplo «Hazla más fría en el segmento 3». Zai muestra una comparación de los cambios antiguo → nuevo. Después de que confirmes, solo se rehace el vídeo de ese segmento. Las regrabaciones usan el presupuesto de retrabajo, independiente del presupuesto de rodaje inicial; si es insuficiente, Zai pedirá confirmación de nuevo.

### ¿Cómo evito que una versión satisfactoria se regenere y se sustituya? {#pin-version}

En el «Historial de versiones» de ese recurso, haz clic en «Bloquear versión actual». Una vez bloqueada, los resultados regenerados solo pasan a los candidatos del historial y no sustituirán automáticamente la versión actual. También puedes hacer clic en «Cambiar a esta versión» en cualquier momento para volver a un resultado anterior.

## Visuales, vídeo y audio {#visuals-video-audio}

### ¿Cómo mejoro la consistencia de los personajes? {#character-consistency}

Primero confirma la hoja de referencia del personaje (una imagen que contenga un primer plano de cabeza y hombros más vistas de cuerpo entero de frente, perfil y espalda) y luego genera los guiones gráficos y los vídeos. La biblioteca global de recursos admite búsqueda y reutilización entre proyectos. Cuando cambia la definición de un recurso, los guiones gráficos y vídeos existentes no se sobrescriben silenciosamente; se marcan como anteriores al contenido actual, y tú decides si volver a rodarlos.

### ¿Qué hago si un personaje cambia de vestuario en la historia? {#character-looks}

Añade un nuevo **atuendo** al personaje: en los detalles del personaje dentro de la biblioteca de recursos, haz clic en «Añadir atuendo», rellena peinado, ropa y accesorios, y genera una hoja de referencia (primero se requiere la hoja de referencia del atuendo principal). Luego, en el guion, selecciona qué vestuario lleva ese personaje en cada segmento. Los segmentos sin selección se detendrán en el paso de guion. También puedes pedir a Zai que redacte los atuendos y rellene las selecciones de atuendo de los segmentos.

### ¿Cómo hago que los segmentos adyacentes sean más coherentes? {#shot-continuity}

Fija los personajes, escenas y atuendos antes de generar los vídeos. Mantén coherentes la ubicación, el tiempo, la ropa y las descripciones de los personajes. Los segmentos guiados por guion gráfico usan la imagen del guion gráfico del segmento anterior como referencia de continuidad.

### ¿Cómo funcionan el primer y el último fotograma? {#first-and-last-frame}

En los proyectos, los segmentos guiados por guion gráfico usan la imagen del guion gráfico como primer fotograma del vídeo; no se usan últimos fotogramas. Para controlar tanto el primer como el último fotograma, activa «Primer/Último fotograma» en un nodo de vídeo del [Lienzo creativo](./canvas.md) (según si el modelo seleccionado lo admite).

### ¿Por qué aparecen personas en las imágenes de diseño de escena? {#people-in-scene-images}

Las imágenes de diseño de escena se generan con instrucciones para excluir personas, pero los modelos de imagen pueden no cumplirlo del todo. Puedes regenerar la imagen de la escena o usar la edición de imagen para eliminar a las personas.

### ¿Admite ZaiDrama voces en off? {#voice-over-support}

- Los **diálogos** los pronuncia directamente el modelo de vídeo.
- La **narración** se elige en los parámetros del episodio, dentro de «Información del proyecto»: doblaje en posproducción (predeterminado, el vídeo final excluye la voz de narración) o doblaje TTS (narración sintetizada por la plataforma). El modelo de doblaje, la voz y la velocidad se ajustan en los ajustes del proyecto, en «Voz en off de narración».
- El reproductor del segmento de narración permite alternar entre «Vídeo original» y «Superposición TTS».

### ¿Puedo ajustar el estilo de los subtítulos? {#subtitle-style}

Sí. En «Información del proyecto → Estilo de subtítulos», ajusta el tamaño de fuente, la posición vertical, el color y la fuente. La vista previa muestra exactamente lo que se grabará en el vídeo final, con efecto a partir de la siguiente composición.

## Lienzo creativo {#creative-canvas}

### ¿Qué es el Lienzo creativo? ¿En qué se diferencia de los proyectos? {#canvas-vs-project}

El Lienzo creativo es tu lienzo personal de forma libre donde colocas texto, imágenes, vídeo y audio como nodos y generas directamente sobre ellos. No está vinculado a un proyecto y no tiene guion, lotes ni entrega de vídeo final. Usa los proyectos para rodar un drama completo de varios episodios; usa el lienzo para experimentar libremente con visuales o crear segmentos de vídeo independientes. Ambos comparten recursos a través de la biblioteca global. Consulta [Lienzo creativo](./canvas.md).

### ¿Gastará Zai dinero directamente en el lienzo? {#canvas-approval}

No por defecto: cuando Zai está a punto de gastar dinero en una generación, aparece una barra de aprobación que muestra el coste estimado en USD y tu saldo para que confirmes. Puedes cambiar el modo de aprobación a «Generar directamente» o marcar «Confirmar automáticamente el resto de este turno» en la barra de aprobación para omitir la confirmación por imagen durante el resto de ese turno hasta un límite acumulado de 0,20 $. Las acciones irreversibles, como eliminar nodos o vaciar el lienzo, siempre requieren confirmación.

### ¿Puedo compartir o hacer una copia de seguridad del lienzo? {#canvas-share-export}

- «Compartir» genera un enlace de solo lectura que otros pueden ver sin iniciar sesión. Puedes revocarlo en cualquier momento.
- El lienzo puede exportarse como zip e importarse desde un zip.
- El «Historial de versiones» te permite previsualizar, nombrar, restaurar instantáneas o guardarlas como un lienzo nuevo.

## Coste, datos y descargas {#cost-data-export}

### ¿Dónde puedo consultar mi saldo y mis gastos? {#view-and-control-cost}

La insignia de saldo en la barra superior muestra tu saldo actual en USD; haz clic en ella para ver los detalles de uso. En el menú de la cuenta, «Facturación y saldo» muestra el saldo disponible, el importe retenido, los detalles del saldo y el historial de compras; también puedes recargar allí. El saldo muestra 2 decimales (truncado), mientras que cada cargo y otros detalles muestran 4 decimales. Las recompensas diarias por inicio de sesión y las recompensas por referidos están en el «Centro de recompensas».

### ¿Qué puedo descargar? {#project-zip-vs-full-backup}

- **Vídeo final**: página de Lotes → vista «Revisar» → «Vídeo del episodio» → «Descargar» para ese episodio.
- **Paquete editable**: «Descargar paquete editable» en el reproductor del segmento de vídeo. Es un zip que contiene el vídeo, el audio de narración, los subtítulos (`.vtt` / `.srt`) y un archivo de descripción para seguir editando en otro software.
- **Audio de narración**: «Descargar audio» en el historial de versiones de la narración.

La plataforma no ofrece exportación ZIP de un proyecto completo.

### ¿Por qué faltan segmentos en el paquete editable? {#project-export-missing-clips}

El paquete editable solo incluye el contenido generado correctamente. Para los segmentos que faltan, comprueba el motivo del fallo en la página de lotes, vuelve a rodar o regenera y descarga de nuevo.

### ¿Hay una aplicación móvil? {#mobile-app-support}

ZaiDrama es una aplicación web y actualmente no tiene aplicación nativa independiente para iOS o Android. Los teléfonos pueden acceder mediante el navegador, pero revisar lotes y editar el lienzo es mejor hacerlo en un ordenador.

### ¿Puedo usarla comercialmente o crear sobre ella? {#commercial-use}

El código fuente de ZaiDrama se publica bajo AGPL-3.0. Consulta el repositorio de código en [GitHub](https://github.com/z55183980-gif/zaidrama).

## Prácticas recomendadas de calidad y coste {#quality-and-cost-best-practices}

1. Rueda primero unos pocos segmentos para validar el estilo artístico, los personajes y el ritmo antes de escalar.
2. Finaliza las hojas de referencia de personajes y los atuendos antes de generar en lote los guiones gráficos y los vídeos.
3. Mantén coherentes la ubicación, el tiempo, la ropa y las descripciones de los personajes en los segmentos adyacentes.
4. Referencia solo los recursos que el segmento actual necesita de verdad; demasiadas imágenes de referencia diluyen las restricciones.
5. Si un único segmento tiene problemas, vuelve a rodar solo ese segmento; bloquea cuanto antes las versiones satisfactorias.
6. Planifica el alcance de la producción según el saldo y los detalles de «Facturación y saldo».
