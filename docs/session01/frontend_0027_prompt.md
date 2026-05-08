### User Input

Modifica, o agrega, un guard para que:
- Si el usuario logueado es cliente, solo pueda acceder a la ruta /tickets
- Si el usuario logueado es soporte, solo pueda acceder a las rutas /tickets y /users
- Si el usuario logueado es admin, puede acceder a todas las rutas

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [option.component.html](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/option/pages/option/option.component.html) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [profile.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/profile.db.ts) *

*Viewed [auth.guard.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/guards/auth.guard.ts) *

*Edited relevant file*

*Viewed [app-routing.module.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/app-routing.module.ts) *

*User accepted the command `powershell -Command "Get-ChildItem -Path src/app/modules -Directory"`*

*Checked command status*

### Planner Response

He actualizado el `authGuard` para implementar el control de acceso por roles (RBAC) solicitado:

1.  **Lógica del Guard**: He modificado `src/app/guards/auth.guard.ts` para que valide el perfil del usuario obtenido desde el `AuthService`:
    *   **Cliente**: Solo tiene permitido el acceso a rutas que comiencen por `/tickets`. Si intenta acceder a otra, es redirigido a `/tickets`.
    *   **Soporte**: Tiene permitido el acceso a `/tickets` y `/users`. De lo contrario, es redirigido a `/tickets`.
    *   **Admin**: Tiene acceso total a todas las rutas de la aplicación.
2.  **Sincronización de Rutas**: He actualizado las redirecciones del `publicGuard` y del `AppRoutingModule` para que la ruta por defecto sea `/tickets`, asegurando que todos los roles tengan un destino válido al iniciar sesión.

**Seguridad Adicional**: 
Como el Sidebar ya carga las opciones dinámicamente basándose en el perfil del usuario (configurado en pasos anteriores), los usuarios ahora solo verán en su menú las opciones a las que realmente tienen permiso de acceder, y el Guard actuará como una segunda capa de seguridad si intentan ingresar la URL manualmente.

Puedes revisar la implementación en [auth.guard.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/guards/auth.guard.ts).
