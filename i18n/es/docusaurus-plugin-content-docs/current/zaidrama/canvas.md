---
id: canvas
title: "Lienzo creativo"
description: "El lienzo creativo de ZaiDrama: generar en nodos, Zai en el lienzo, confirmar antes de generar, historial de versiones y compartir."
sidebar_position: 3
update_docs: engine-b
---

# Lienzo creativo {#canvas}

El lienzo Creativo es un lienzo infinito donde puedes organizar libremente ideas, referencias y resultados generados. Puedes generar imágenes, vídeos, texto y voz directamente en nodos, introducir una imagen en el siguiente nodo para seguir trabajando o pedirle a Zai en el lienzo que edite imágenes y cree vídeos por ti. Es ideal para probar estilos, crear arte conceptual, pulir una sola toma o hacer un vídeo corto que no necesite un guion completo.

## 1. Cómo se relacionan los lienzos con los proyectos {#canvas-and-projects}

- Un lienzo te pertenece personalmente y no está vinculado a ningún proyecto; los proyectos tampoco leen el contenido del lienzo.
- Un lienzo no es una segunda línea de producción: no tiene guion, lotes ni entrega de corte final, y sus resultados generados no entran automáticamente en un proyecto.
- Ambos se conectan a través de la **Biblioteca de recursos global**: las imágenes de un lienzo pueden enviarse con «Guardar en la biblioteca de recursos», y un proyecto las reutiliza con «Desde la biblioteca» en su página de Biblioteca de recursos; la pestaña «Recursos» de la barra lateral del lienzo también puede colocar contenido de la Biblioteca de recursos en el lienzo.

Usa un proyecto cuando necesites rodar una historia completa como un corto dramático de varios episodios; usa un lienzo cuando quieras experimentar libremente primero con los visuales, o solo hacer unos pocos vídeos independientes.

## 2. Crear y gestionar lienzos {#manage-canvases}

Haz clic en «Lienzo creativo» en la barra lateral para abrir la lista de lienzos. La primera vez que entras sin ningún lienzo, se abre directamente un lienzo en blanco.

La lista se agrupa en «Hoy / Últimos 7 días / Anteriores», y cada tarjeta muestra lo que hay en el lienzo. En la lista puedes:

- Buscar nombres o contenido de los lienzos desde la barra superior;
- Crear un «Nuevo lienzo» o «Duplicar» uno existente;
- «Importar» un lienzo en zip o «Exportar» un lienzo como zip (cuando un paquete importado no se reconoce, solo se importan sus medios);
- «Seleccionar» varios lienzos para exportarlos o eliminarlos en bloque;
- Renombrar y eliminar lienzos.

Los lienzos se nombran automáticamente según su contenido: la primera vez que se añade texto a un lienzo, este toma el nombre del primer nodo, y después de que Zai haga algo en el lienzo, se nombra según la solicitud de ese turno. Un nombre que has cambiado tú mismo nunca se sobrescribe. Un lienzo en blanco que cierras sin hacer nada se descarta automáticamente y no permanece en la lista.

Cada lienzo se abre en una nueva pestaña del navegador. Los lienzos se guardan automáticamente y la barra superior muestra «Guardado / Guardando… / No guardado»; si el mismo lienzo se edita en dos ventanas a la vez y las ediciones entran en conflicto, se te avisa con «Conflictos con cambios en otra ventana».

## 3. Nodos y conexiones {#nodes}

La barra de herramientas ofrece:

- **Seleccionar / Mano**: seleccionar nodos o desplazarse por el lienzo;
- **Añadir nodos**: Texto, Imagen, Vídeo, Audio; se pueden colocar varios nodos en un Grupo;
- **Subir archivos**: PNG, JPG, WEBP, MP4, WEBM, MP3, WAV; imágenes de hasta 20 MB, vídeos de hasta 200 MB, audio de hasta 30 MB;
- **Usar recursos existentes**: elegir entre material que has subido o generado antes;
- **Preajustes**: por ejemplo, «Guionista» y «Giro de personaje», que disponen de una vez un conjunto de nodos de uso común;
- **Ajustes del lienzo**: relación de aspecto predeterminada, resolución de imagen predeterminada, estilo de fondo y «Limpiar lienzo».

Una conexión entre nodos representa una relación de entrada: conecta un nodo de imagen a un nodo de vídeo y se convertirá en el primer fotograma o referencia del vídeo.

La barra lateral tiene tres pestañas: «Lienzo», «Recursos» y «Prompts». «Prompts» contiene colecciones públicas y tu propia biblioteca de prompts «Míos».

## 4. Generar en nodos {#generate}

Selecciona un nodo para abrir su panel de generación:

| Generar | Ajustes |
| --- | --- |
| Generar imagen | Modelo, resolución, número de imágenes, relación de aspecto, estilo; cuando la relación de aspecto se establece en «Auto», se utiliza la proporción más cercana a la primera imagen de referencia |
| Generar vídeo | Conecta una imagen como primer fotograma (el vídeo suele seguir su forma); conecta dos o más y todas entran como referencias, usa `@` para indicar quién es quién, y el vídeo sale con la relación de aspecto seleccionada; con «Primer y último fotograma» activado, las dos primeras imágenes son los fotogramas inicial y final; resolución, duración y si se genera audio |
| Escribir texto | Qué escribir |
| Voz | Voz, velocidad |

Una vez finalizada la generación, las acciones rápidas del nodo te permiten continuar con «Crear un vídeo», «Crear una imagen», «Añadir narración» o «Siguiente toma».

Los nodos de imagen también ofrecen herramientas como describir como prompt, recortar, dividir, ampliar, rellenar, nuevo ángulo, capturar el primer / fotograma actual / último de un vídeo y guardar en la biblioteca de recursos. De estas, recortar, dividir y ampliar se ejecutan en el navegador y son gratuitas.

Los modelos de generación seleccionables provienen de los candidatos que la plataforma ha abierto para cada propósito; consulta [Modelos y capacidades](./models.md).

## 5. Zai en el lienzo {#canvas-zai}

La ventana de Zai en la esquina inferior derecha del lienzo se puede arrastrar y redimensionar; haz doble clic sobre ella para devolverla a la esquina inferior derecha. Puede ver este lienzo y también editarlo por ti:

- **Alcance**: cuando hay nodos seleccionados, trabaja solo con los «N seleccionados»; de lo contrario, trabaja con el «Lienzo completo»;
- **Ver material**: puede ver las imágenes, los vídeos y el audio de los nodos;
- **Búsqueda web**: busca en la web cuando es necesario, y lo que recupera se utiliza solo como material de referencia;
- **Memo**: Zai lee el memo en la parte superior del panel en cada turno, y tanto tú como Zai podéis editarlo; los valores predeterminados del lienzo, como la relación de aspecto, el estilo y la resolución, se transfieren automáticamente a los lienzos nuevos, por lo que no es necesario escribirlos en el memo;
- **Deshacer este turno**: revierte todos los cambios de Zai en el lienzo de este turno con un solo clic.

Zai en el lienzo no asume que estás haciendo un corto dramático; escribir historias, hacer pósteres y crear imágenes de producto también funcionan. El modelo de chat que utiliza lo configura la plataforma.

### 5.1 Confirmar antes de generar {#approval}

Cuando una generación va a costar dinero, por defecto Zai muestra primero una barra de aprobación con el coste estimado (en USD) y tu saldo, y solo se ejecuta después de que hagas clic en «Generar»; haz clic en «Ver en el lienzo» para ver primero qué nodos pretende cambiar.

- En el ajuste de aprobación del panel de Zai, puedes cambiar a «Generar directamente», después de lo cual Zai ya no pregunta cada vez.
- Si marcas «Confirmar automáticamente el resto de este turno» en la barra de aprobación, las generaciones restantes de este turno ya no muestran una tarjeta una a una mientras se mantengan dentro del límite acumulado de 0,20 $; la generación que superaría el límite se confirma como de costumbre.
- Las acciones irreversibles, como eliminar nodos o limpiar el lienzo, siempre requieren confirmación.

## 6. Historial {#history}

«Historial» en la barra superior te permite previsualizar, nombrar o restaurar instantáneas del lienzo:

- La plataforma guarda versiones automáticamente de forma periódica mientras editas; también guarda una antes de que se elimine contenido, antes de que se restaure una versión y antes de que Zai modifique el lienzo;
- Las versiones que creas con «Guardar versión» y nombras no se limpian automáticamente;
- Puedes «Restaurar esta versión» o «Guardar como lienzo nuevo».

## 7. Compartir {#share}

«Compartir» en la barra superior puede generar un **enlace de solo lectura**: cualquier persona con el enlace puede ver este lienzo sin iniciar sesión, pero no puede editarlo. Puedes «Revocar el enlace» en cualquier momento, y el enlace deja de funcionar inmediatamente después de ser revocado.
