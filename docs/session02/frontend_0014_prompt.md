### User Input

En el auth.service crea el método logout, que solo elimine el jwt del localStorage y redirija a la ruta /auth 

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [ticket.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/ticket.service.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [auth.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/auth.service.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He actualizado el método `logout` en el `AuthService` según tus indicaciones:

*   **Eliminación del JWT**: Ahora el método solo elimina la clave `jwt` del `localStorage`.
*   **Redirección**: Se ha inyectado el `Router` para que, inmediatamente después de limpiar el token, el usuario sea redirigido a la pantalla de autenticación (`/auth`).

El código del método ha quedado de la siguiente manera:

```typescript
public logout(): void {
	localStorage.removeItem("jwt");
	this.router.navigate(["/auth"]);
}
```
