### User Input

Crealiza la siguiente lógica:
- Cuando el usuario logueado es soporte, que los tickets que se muestren sean solo los asignados al usuario logueado
- Cuando el usuario logueado es soporte, en la columna Acciones cambia los botones de "Editar" y "Eliminar" por "Ver", "Aprobar" y "Rechazar"
- El botón Ver mostrará el modal del ticket con la información cargada, pero sin la posibilidad de modificar y solo con el botón de Cerrar
- El botón Aprobar modificará el ticket (UPDATE) con el estado de "RESOLVED" y el botón de Rechazar con el estado de "REJECTED"

*Edited relevant file*

*Viewed [ticket.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/ticket.db.ts) *

*Edited relevant file*

*Viewed [ticket.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/ticket.handler.ts) *

*Edited relevant file*

*Edited relevant file*

*Viewed [ticket-modal.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/ticket/components/ticket-modal/ticket-modal.component.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [ticket.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/ticket/pages/ticket/ticket.component.ts) *

*Edited relevant file*

*Edited relevant file*

### Planner Response

He implementado la lógica especializada para los usuarios con perfil de **Soporte** en el módulo de tickets:

1.  **Filtrado Dinámico**: He actualizado el backend simulado (MSW) y el `TicketService` para permitir el filtrado por `assignedToId`. Ahora, si un usuario de soporte inicia sesión, solo verá los tickets que tiene asignados.
2.  **Acciones de Soporte**: En la tabla de tickets, cuando el perfil es "Support", he reemplazado los botones de edición/eliminación por:
    *   **Ver (Icono de Ojo)**: Abre el modal en modo de solo lectura.
    *   **Aprobar (Icono de Check)**: Cambia el estado del ticket a `RESOLVED` mediante una petición `PUT`.
    *   **Rechazar (Icono de Cancelar)**: Cambia el estado del ticket a `REJECTED`.
3.  **Modal Versátil**: He modificado el `TicketModalComponent` para que acepte un ticket como entrada y un modo de "solo lectura". En este modo, todos los campos están deshabilitados y el botón de "Guardar" se reemplaza por uno de "Cerrar".
4.  **Flujo de Usuario**:
    *   Los usuarios normales siguen viendo el botón "Nuevo Ticket" y las acciones de editar/eliminar.
    *   Los usuarios de soporte no pueden crear tickets (botón oculto) y solo gestionan los que les corresponden.
    *   Se han añadido **Toasts** para confirmar el éxito de las aprobaciones y rechazos.

Puedes probarlo iniciando sesión con el usuario `soporte@angular.com` (password: `soporte123`). Verás que solo aparecen los tickets asignados a él con las nuevas opciones de gestión.

Definiciones actualizadas en:
*   [ticket.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/ticket/pages/ticket/ticket.component.ts)
*   [ticket-modal.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/ticket/components/ticket-modal/ticket-modal.component.ts)
