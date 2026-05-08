### User Input

Crea un módulo nuevo allamado Auth con la ruta /auth, el cual mostrará el formulario de signIn y de signUp, el cual se puede intercambiar mediante pestañas (tabs):
- Para el signIn crea un formulario siguiendo el type UserCredentials
- Para el signUp crea un formulario siguiendo el type UserCreate

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [environment.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/environments/environment.ts) *

*Viewed [user.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/user.type.ts) *

*User accepted the command `mkdir src/app/modules/auth src/app/modules/auth/pages src/app/modules/auth/pages/auth`*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He creado el módulo de **Autenticación (Auth)** con la ruta `/auth`. Este módulo permite intercambiar entre los formularios de inicio de sesión (*Sign In*) y registro (*Sign Up*) mediante un sistema de pestañas (*tabs*).

### Cambios realizados:

1.  **Nuevo Módulo `Auth`**: Configurado con carga perezosa (*lazy loading*) y `ReactiveFormsModule`.
2.  **Formulario de Sign In**: Basado en el tipo `UserCredentials`, incluye los campos:
    *   Correo Electrónico (`email`)
    *   Contraseña (`password`)
3.  **Formulario de Sign Up**: Basado en el tipo `UserCreate`, incluye los campos:
    *   Nombre Completo (`name`)
    *   Correo Electrónico (`email`)
    *   Perfil (`profileId`): Cargado dinámicamente desde el servicio de perfiles.
4.  **Diseño Visual**:
    *   Sigue la línea estética del proyecto (*Cards & Tiles*).
    *   Usa el sistema de pestañas para una transición suave entre formularios.
    *   Validaciones reactivas para asegurar que los botones de envío se habiliten solo cuando los datos son correctos.

### Acceso:
Puedes acceder al nuevo módulo navegando a la ruta: `http://localhost:4300/auth`.

> [!NOTE]
> El formulario de registro carga los perfiles disponibles (*Admin, Support, Cliente*) directamente desde la base de datos simulada para que el usuario pueda seleccionarlos correctamente.
