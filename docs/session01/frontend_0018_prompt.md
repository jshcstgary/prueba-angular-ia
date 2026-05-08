### User Input

Crea el user.db.ts dentro de los mocks y crea 3 tipos de usuarios:
- Usuario admin, tendrá el profile admin
- Usuario soporte, tendrá el profile soporte
- Usuario cliente, tendrá el profile cliente
Estos usuarios serán de tipo UserDb
Crea también los handlers respectivos para un CRUD de usuario
Aparte, crea un hanlder auth para el signIn del usuario usando el UserCredentials

*Viewed [profile.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/profile.db.ts) *

*Edited relevant file*

*Edited relevant file*

*Viewed [environment.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/environments/environment.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He ampliado el sistema de mocks para incluir la gestión de usuarios y autenticación:

1.  **Base de Datos de Usuarios**: He creado `src/mocks/db/user.db.ts` con 3 usuarios iniciales (`admin`, `soporte`, `cliente`), cada uno vinculado a su perfil correspondiente definido en `profile.db.ts`.
2.  **Mantenimiento de Usuarios**: He implementado `src/mocks/handlers/user.handler.ts` con un CRUD completo para la entidad `User`. Al devolver datos, se omite el `password` y se añade un `jwt` simulado, cumpliendo con el tipo `User`.
3.  **Autenticación**: He creado `src/mocks/handlers/auth.handler.ts` con un handler de `signIn` (`/api/auth/login`). Este valida las `UserCredentials` contra la base de datos simulada y devuelve el objeto `User` con su token si las credenciales son correctas (o `401` si no lo son).
4.  **Configuración**: He añadido las rutas `/users` y `/auth` al archivo de environments y centralizado los nuevos handlers en el sistema de MSW.

Puedes ver los detalles en los archivos de mocks y en el [user.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/user.db.ts).
