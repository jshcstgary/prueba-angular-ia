### User Input

Conecta el componente Auth con el service Auth con el handler Auth, toma en cuenta los types que se han modificado y sigue la siguiente lógica:
- El método POST en user.handler.ts no deberá existir, para la creación de un usuario se usará el register de auth.handler.ts
- La lógica del register será:
  - Recibirá un UserCreate
  - La lógica del handler le asignará automáticamente el profile de CLIENTE
  - Devovlerá un ApiResponse<User> con un JWT simulado
  - El usuario nuevo se deberá guardar en la variable de Users de user.db.ts como simulación de la DB, junto con el JWT
 La lógica del login será:
  - Recibirá un UserCredentials y validará el email y la contraseña
  - Devovlerá un ApiResponse<User>, el user tendrá un jwt simulado
- Al obtener el resultado en ambos métodos, se deberá guardar el JWT en el localStorage

*Edited relevant file*

*Viewed [auth.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/auth.handler.ts) *

*Viewed [user.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/user.handler.ts) *

*Edited relevant file*

*Viewed [auth.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/auth.handler.ts) *

*Listed directory [services](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services) *

*Edited relevant file*

*Edited relevant file*

### Planner Response

He conectado el componente de autenticación con el servicio y los manejadores de MSW siguiendo la lógica solicitada.

### Cambios realizados:

1.  **Limpieza en `user.handler.ts`**: Se ha eliminado el método `POST` de este archivo, ya que la creación de usuarios ahora se centraliza exclusivamente a través del módulo de autenticación (*register*).
2.  **Manejador `auth.handler.ts` actualizado**:
    *   **Registro**: Ahora recibe un objeto de tipo `UserCreate` (nombre, email, contraseña), le asigna automáticamente el perfil de **CLIENTE**, lo guarda en la "base de datos" simulada (`user.db.ts`) y devuelve un objeto `User` con un JWT simulado.
    *   **Login**: Valida el email y la contraseña contra los usuarios existentes y devuelve el usuario con su JWT si las credenciales son correctas.
3.  **Nuevo `AuthService`**: Creado en `src/app/services/auth.service.ts`. Este servicio gestiona las peticiones HTTP y se encarga de guardar automáticamente el JWT en el `localStorage` (bajo la clave `token`) tras un inicio de sesión o registro exitoso.
4.  **Integración en `AuthComponent`**:
    *   Se han conectado los formularios reactivos con el `AuthService`.
    *   Tras un registro o inicio de sesión exitoso, la aplicación redirige automáticamente al usuario a la página de Módulos (`/modules`).

### Flujo de datos:
- **SignUp**: Formulario -> `AuthService.register()` -> `auth.handler.ts` (Register) -> Almacena en `user.db.ts` -> Retorna JWT -> `AuthService` guarda en `localStorage` -> Redirección a `/modules`.
- **Login**: Formulario -> `AuthService.login()` -> `auth.handler.ts` (Login) -> Valida credenciales -> Retorna JWT -> `AuthService` guarda en `localStorage` -> Redirección a `/modules`.

> [!IMPORTANT]
> El perfil de **CLIENTE** se asigna de forma transparente en el servidor simulado (handler), por lo que el usuario final no necesita seleccionarlo durante el registro.
