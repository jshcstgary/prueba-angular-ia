### User Input

Crea un Toast que muestre un mensaje tipo notificación a la derecha inferior de la pantalla, para los errores, que lo muestre con un color rojo (se diferencia porque el mensaje llevará un "Error:" al inicio) y con un color verde para éxito

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*User accepted the command `powershell -Command "Test-Path src/app/shared/shared.module.ts"`*

*Checked command status*

*Edited relevant file*

*Viewed [shared.module.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/shared/shared.module.ts) *

*Edited relevant file*

*Viewed [app.component.html](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/app.component.html) *

*Edited relevant file*

*Viewed [auth.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/auth/pages/auth/auth.component.ts) *

*Edited relevant file*

### Planner Response

He implementado el sistema de notificaciones (Toast) solicitado:

1.  **Servicio de Notificaciones**: He creado `ToastService` en `src/app/services/toast.service.ts`. Este servicio detecta automáticamente el tipo de mensaje: si comienza con "Error:", lo marca como tipo error (rojo), de lo contrario lo marca como éxito (verde).
2.  **Componente Toast**: He creado un componente global en `src/app/shared/components/toast/` que renderiza las notificaciones en la esquina inferior derecha de la pantalla con animaciones suaves de entrada.
3.  **Integración Global**: El componente se ha registrado en el `SharedModule` e incluido en el `AppComponent`, por lo que está disponible en toda la aplicación.
4.  **Uso Inicial**: He actualizado el `AuthComponent` para que muestre notificaciones reales al iniciar sesión o registrarse, tanto para éxitos como para errores.

**Características visuales:**
*   **Éxito**: Fondo verde (`#10b981`) con icono de check.
*   **Error**: Fondo rojo (`#ef4444`) con icono de error.
*   **Posición**: `fixed` abajo a la derecha con un `z-index` alto para asegurar visibilidad.

Puedes ver la implementación en [toast.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/shared/components/toast/toast.component.ts) y probarlo intentando iniciar sesión.
