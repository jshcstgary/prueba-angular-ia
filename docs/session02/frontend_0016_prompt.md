### User Input

Modifica el header para que muestre el nombre del usuario y rol reales del usuario logueado

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [option-modal.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/option/components/option-modal/option-modal.component.ts) *

*Viewed [header.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/shared/components/header/header.component.ts) *

*Edited relevant file*

*Edited relevant file*

### Planner Response

He actualizado el encabezado de la aplicación para que muestre la información real del usuario autenticado:

*   **Integración con AuthService**: El componente ahora consume el `signal` del usuario actual.
*   **Nombre Dinámico**: Muestra el nombre completo del usuario que inició sesión.
*   **Rol Real**: Muestra el nombre del perfil (ej. *Admin*, *Support*, *Cliente*) asignado al usuario en la base de datos.
*   **Seguridad**: He añadido valores por defecto ("Invitado" y "Sin Rol") para evitar errores visuales en caso de que la información tarde en cargar o el estado sea inconsistente.

Los cambios se reflejarán automáticamente cada vez que un usuario inicie sesión o cambie de cuenta.
