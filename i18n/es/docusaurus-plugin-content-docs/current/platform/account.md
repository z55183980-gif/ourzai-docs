---
id: account
title: Cuenta, créditos y soporte
description: Registro, inicio de sesión, recuperación de contraseña, seguridad de la cuenta, recargas de créditos y recompensas, reembolsos y canales de contacto.
sidebar_position: 2
update_docs: none
---

# Cuenta, créditos y soporte {#account}

## Registro {#register}

Todos los productos tienen un punto de entrada para registrarse. Al registrarte desde cualquier lugar se crea la misma cuenta ZAI: regístrate una sola vez y úsala para iniciar sesión en todos los productos:

| Dónde registrarse | Punto de entrada | Después del registro |
| --- | --- | --- |
| Sitio web oficial | "Sign Up" en la esquina superior derecha, o "No account yet? Sign Up" en la ventana de inicio de sesión | Sigues en la página actual después de iniciar sesión |
| Consola de desarrollo | "Go to Sign Up" en la parte inferior de la página de inicio de sesión | Inicias sesión automáticamente y accedes a la consola |
| Meet Zai | La entrada de registro en la página de inicio de sesión de [zai.gg](https://zai.gg) | Entras al producto de acompañante según se indique en la página |
| ZaiDrama | Desde la ventana emergente de inicio de sesión, cambia a "Create your ZAI account"; puedes introducir un código de invitación | Accedes directamente a ZaiDrama |

Al registrarte con una dirección de correo electrónico:

- Debes introducir el código de verificación de 6 dígitos enviado a tu correo (válido durante 10 minutos; puedes reenviarlo tras 60 segundos);
- La contraseña debe tener al menos 6 caracteres e incluir letras y números;
- Cada dirección de correo solo puede registrarse una vez. Si ya está registrada, verás "This email is already registered": en ese caso, simplemente inicia sesión.

Si chateaste con Zai en la página principal del sitio web oficial antes de registrarte, esa conversación se conservará en tu nueva cuenta.

## Inicio de sesión {#sign-in}

- Inicia sesión con el correo y la contraseña con los que te registraste.
- El sitio web oficial, Meet Zai y ZaiDrama comparten el mismo inicio de sesión de cuenta. Si ya tienes una sesión activa válida, puedes entrar directamente; si la sesión ha caducado o se requiere verificación, vuelve a iniciar sesión según se indique en la página.
- Cuando la página de inicio de sesión ofrezca la opción de Google, también puedes elegir "Continue with Google"; la primera vez se creará una cuenta siguiendo el flujo de la página.
- Si ya has iniciado sesión en el sitio web oficial, al hacer clic en "Creation workspace" en la página principal entrarás en ZaiDrama sin necesidad de contraseña.
- Las sesiones de inicio de sesión se renuevan automáticamente; si hay demasiados dispositivos conectados a la misma cuenta a la vez, se cerrará la sesión más antigua.

## Contraseña olvidada {#reset-password}

En la ventana de inicio de sesión, haz clic en "Forgot password?", introduce tu correo registrado y establece una nueva contraseña tras recibir el código de verificación. Para evitar revelar si un correo está registrado, la página también dirá que se ha enviado un código cuando introduzcas un correo no registrado.

## Seguridad de la cuenta {#account-security}

En el "Profile" de ZaiDrama puedes:

- Cambiar el correo vinculado (tras el cambio, usa el nuevo correo para iniciar sesión en todos los productos);
- Cambiar tu contraseña;
- Ver los "Logged-in devices" y cerrar sesión en dispositivos desconocidos uno a uno;
- Eliminar tu cuenta: introduce tu correo completo y tu contraseña, revisa qué se borrará y confirma de nuevo. Tras enviar la solicitud, se cerrará tu sesión; la limpieza de datos puede tardar y el resultado mostrado en la página es definitivo. La eliminación de la cuenta es irreversible.

Nunca compartas tu contraseña, código de verificación o claves de API con nadie, incluida cualquier persona que afirme ser del equipo de soporte.

## Créditos {#credits}

- **Un único saldo**: Los créditos se expresan en dólares estadounidenses. El saldo de la esquina superior derecha de la Consola de desarrollo y el saldo de ZaiDrama corresponden a la misma cuenta. La generación de imágenes, vídeo y voz en ZaiDrama, así como las llamadas a la API de los modelos, se descuentan de este saldo; chatear con el asistente en el sitio web oficial no consume créditos de la plataforma.
- **Recargar**: Compra paquetes de recarga en la página "Top up" de la Consola de desarrollo o en la página "Billing & Balance" de ZaiDrama. Cada paquete indica el importe acreditado (en USD, incluida cualquier parte de bonificación); los paquetes con precio en CNY se pagan en CNY, pero el importe acreditado sigue siendo un saldo en USD. Los pagos los procesa Stripe, que admite tarjetas bancarias, Alipay y WeChat Pay. La plataforma no almacena los datos de la tarjeta; los créditos de Alipay y WeChat Pay pueden tardar un poco, pero se aplican automáticamente una vez confirmado el pago.
- **Sin caducidad**: Los créditos recargados no caducan nunca.
- **Precios unitarios**: Los precios en USD de cada modelo (por millón de tokens o por unidad de facturación) se indican en "Pricing" en la Consola. Cada generación de ZaiDrama se cobra como "tarifa × uso", con precisión de 0,0001 $ y un mínimo de 0,0001 $; la tarjeta de confirmación y la barra de aprobación muestran un presupuesto antes de empezar.
- **Visualización**: Las cifras de tipo saldo (saldo superior derecho, tarjeta de saldo, recargas/gastos acumulados) muestran 2 decimales y se truncan hacia abajo, por ejemplo `$1,234.56`; al pasar el cursor se muestra el valor exacto con 4 decimales. Los cargos individuales, extractos, presupuestos y otros conceptos similares muestran 4 decimales, por ejemplo `$0.0123`.
- **Registros**: La pestaña "Billing" de la página "Top up" de la Consola y la página "Billing & Balance" de ZaiDrama muestran los registros de recarga; el consumo de la API está en "Usage" en la Consola, y los detalles de descuento de ZaiDrama están en "Billing & Balance".

### Recompensas {#rewards}

El "Welfare Center" de ZaiDrama ofrece:

- **Recompensa diaria por iniciar sesión**: Cuando el evento está activo y cumples las condiciones, iniciar sesión en ZaiDrama la reclama automáticamente; cuando la página proporcione un botón de reclamación, también puedes seguir las indicaciones. Los importes, la frecuencia y los límites acumulados se rigen por las normas vigentes del evento;
- **Recompensa por recomendación**: Invita a nuevos usuarios mediante un enlace o código de invitación y recibe recompensas en créditos según las normas del evento.

Los importes de las recompensas se suman al mismo saldo. Los importes concretos se muestran en la página del Welfare Center.

## Planes del acompañante Meet Zai {#companion-plans}

Meet Zai utiliza la misma cuenta de la plataforma, pero el nivel gratuito, Zai Plus, las respuestas de voz y los minutos de llamada, y los paquetes adicionales se gestionan en la página de membresía del producto de acompañante. Recargar créditos de la plataforma no es lo mismo que comprar una membresía, y no convierte el saldo de créditos en minutos de voz.

Para consultar las ventajas actuales, las fechas de renovación y las normas de compra y caducidad, consulta [Planes y uso del acompañante](../zai/plans-and-usage.md). Para operaciones de chat, avatar y memoria, empieza por la [Guía de inicio rápido de Meet Zai](../zai/getting-started.md).

## Reembolsos {#refunds}

Las normas de reembolso figuran en la sección 6, "Subscriptions, Payments & Refunds", de los [Términos del servicio](https://ourzai.com/legal/terms.html). Las normas específicas sobre precios y reembolsos son las que se muestran en la página de compra. Para solicitar un reembolso, escribe a support@ourzai.com indicando tu correo registrado y los datos del pedido.

## Contacto y soporte {#support}

| Canal | Ideal para | Quién puede usarlo |
| --- | --- | --- |
| Zai en la página principal del sitio web oficial | Conocer la plataforma, encontrar documentación, consultar los modelos disponibles y los precios unitarios públicos | Todo el mundo, sin necesidad de registro |
| "New chat" de la Consola de desarrollo | Preguntar directamente a Zai cómo llamar a las API o elegir modelos tras iniciar sesión | Usuarios con sesión iniciada |
| "Help & Feedback" de ZaiDrama | Problemas durante la creación; soporte humano en directo; puedes enviar capturas de pantalla | Usuarios de ZaiDrama con sesión iniciada |
| [Página de contacto del sitio web oficial](https://ourzai.com/contact) | Contactar con soporte en directo o consultar otros canales de contacto | Todo el mundo |
| support@ourzai.com | Problemas de cuenta, solicitudes de reembolso, consultas comerciales | Todo el mundo |

Si Zai en la página principal del sitio web oficial no está disponible temporalmente, aparece un botón "Transfer to human support" y tu conversación anterior se reenviará al equipo de soporte junto contigo.

## Términos y privacidad {#legal}

- [Términos del servicio](https://ourzai.com/legal/terms.html) ([inglés](https://ourzai.com/legal/terms-en.html))
- [Política de privacidad](https://ourzai.com/legal/privacy.html) ([inglés](https://ourzai.com/legal/privacy-en.html))
