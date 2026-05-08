### User Input

Genera un guard con Angular con la siguiente lógica:
- La ruta /auth será pública, se validará que NO exista un jwt en el localStorage
- Las demás rutas serán privadas, se vadará que SÍ exista un jwt en el localStorage
- Si se accede a una ruta privada y no existe un jwt en el localStorage, dirigirlo directamente a la ruta /auth
- Si se accede a una ruta públic y sí existe un jwt en el localStorage, dirigirlo directamente a la ruta /module 

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

*Viewed [auth.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/auth/pages/auth/auth.component.ts) *

*Viewed [app-routing.module.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/app-routing.module.ts) *

*Edited relevant file*

*Viewed [auth.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/auth.service.ts) *

*Edited relevant file*

*Edited relevant file*

### Planner Response

He implementado los guards de Angular y configurado la protección de rutas siguiendo la lógica solicitada:

1.  **Creación de Guards**: He creado `src/app/guards/auth.guard.ts` utilizando el patrón funcional (`CanActivateFn`):
    *   `authGuard`: Protege las rutas privadas. Si no encuentra un `jwt` en el `localStorage`, redirige a `/auth`.
    *   `publicGuard`: Protege la ruta `/auth`. Si encuentra un `jwt`, redirige a `/modules`.
2.  **Sincronización con AuthService**: He actualizado `AuthService` para que utilice la clave `jwt` en el `localStorage` (antes usaba `token`), asegurando la consistencia con la lógica del guard.
3.  **Configuración de Rutas**: He aplicado los guards en `AppRoutingModule`:
    *   `modules`, `options` y `profiles` ahora requieren `authGuard`.
    *   `auth` ahora requiere `publicGuard`.

Esto garantiza que un usuario no autenticado siempre sea enviado al login, y un usuario ya autenticado no pueda volver a la pantalla de login/registro sin cerrar sesión.

Puedes revisar la implementación en:
*   [auth.guard.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/guards/auth.guard.ts)
*   [app-routing.module.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/app-routing.module.ts)
*   [auth.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/auth.service.ts)
