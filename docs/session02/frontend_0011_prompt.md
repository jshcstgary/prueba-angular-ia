### User Input

Genera la lógica para los tickets:
- Crea el service que realice las operaciones CRUD para ticket
- Crea un ticket.db.ts con información inicial para mostrar
- Crea un ticket.handler.ts con los métodos CRUD también con la siguiente lógica:
  - Al crear un ticket, se deberá validar que el usuario asignado sí exista, sino devolver que el usuario asignado no existe
  - Setear las fechas correspondientes
  - El status inicialmente será "OPEN"

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

*Edited relevant file*

*Viewed [ticket.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/ticket.type.ts) *

*Edited relevant file*

*Edited relevant file*

*Viewed [environment.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/environments/environment.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He implementado la lógica completa para la gestión de tickets, incluyendo el servicio, la base de datos simulada y los controladores de MSW.

### Cambios realizados:

1.  **Configuración de Entorno**: Se ha añadido la ruta `/tickets` al archivo `environment.ts`.
2.  **Base de Datos Simulada (`ticket.db.ts`)**:
    *   Se han creado datos iniciales con tickets de ejemplo.
    *   Se ha exportado en el índice de bases de datos para su uso global.
3.  **Manejador de MSW (`ticket.handler.ts`)**:
    *   Implementa todos los métodos CRUD (Get, GetById, Create, Update, Delete).
    *   **Validación**: Al crear un ticket, verifica que tanto el creador como el usuario asignado existan en la "DB" de usuarios.
    *   **Lógica Automática**: Al crear, se asigna el estado `"OPEN"` por defecto y se generan las fechas de creación y actualización automáticamente.
4.  **Servicio de Angular (`TicketService`)**:
    *   Implementa los métodos para interactuar con la API de tickets utilizando `HttpClient`.
    *   Utiliza inyección de dependencias moderna (`inject`).

### Detalles del Handler de Creación:
```typescript
// Al crear un ticket:
- Valida assignedToId
- Status: "OPEN"
- createdAt: new Date()
- updatedAt: new Date()
```

> [!TIP]
> Los tickets ahora están vinculados a usuarios reales de tu `user.db.ts`. Si intentas crear un ticket asignado a un ID de usuario inexistente, el servidor de mocks devolverá un error 404 con el mensaje correspondiente.
