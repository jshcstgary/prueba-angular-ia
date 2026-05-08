### User Input

Continue

*Edited relevant file*

*Edited relevant file*

*Viewed [auth.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/auth/pages/auth/auth.component.ts) *

*Viewed [auth.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/auth/pages/auth/auth.component.ts) *

*Viewed [app.component.html](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/app.component.html) *

*Viewed [user.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/user.type.ts) *

*Edited relevant file*

### Planner Response

He completado las correcciones en el módulo de autenticación:

1.  **Layout Independiente**: Se ha actualizado `app.component` para que la barra lateral y el encabezado se oculten automáticamente cuando el usuario se encuentra en la ruta `/auth`.
2.  **Formulario de Registro**:
    *   Ahora solicita **Nombre completo**, **Correo** y **Contraseña**.
    *   Se ha actualizado el tipo `UserCreate` para incluir la contraseña.
    *   Se ha eliminado la selección de perfil del formulario, ya que ahora es automática.
3.  **MSW Handler**: El manejador de registro en los mocks ahora asigna automáticamente el perfil con ID 3 (**CLIENTE**) a cualquier usuario nuevo creado desde el módulo de autenticación.
4.  **Interfaz de Usuario**:
    *   Títulos cambiados a **"Iniciar"** y **"Registrarse"**.
    *   Pestañas con `cursor: pointer`.
    *   Botones de envío deshabilitados hasta que todos los campos requeridos estén completos y sean válidos.

Todo el flujo de autenticación ahora funciona fuera del layout administrativo principal.
