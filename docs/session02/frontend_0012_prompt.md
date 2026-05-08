### User Input

Crea el módulo Ticket y crea también una vista para mostrar los tickets, esta vist será protegida

*Viewed [option.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/option.db.ts) *

*User accepted the command `mkdir src/app/modules/ticket src/app/modules/ticket/pages src/app/modules/ticket/pages/ticket`*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He creado el módulo de **Tickets** y su vista correspondiente, asegurando que sea una ruta protegida.

### Cambios realizados:

1.  **Nuevo Módulo `Ticket`**: Configurado con carga perezosa (*lazy loading*).
2.  **Vista de Tickets**: 
    *   Se ha implementado una tabla siguiendo el diseño de **"Cards & Tiles"**.
    *   Muestra información detallada: Título, Prioridad (con etiquetas de colores), Estado, Creador y Usuario Asignado.
    *   Utiliza **Angular Signals** para una gestión de datos reactiva y eficiente.
3.  **Ruta Protegida**: 
    *   Se ha añadido la ruta `/tickets` al `AppRoutingModule`.
    *   Se ha aplicado el `authGuard`, por lo que solo los usuarios autenticados pueden acceder a esta vista.
4.  **Integración con Sidebar**: Como la barra lateral genera las opciones dinámicamente basadas en el perfil del usuario, la opción "Listado de Tickets" aparecerá automáticamente para aquellos usuarios que tengan el módulo de Tickets asignado en su perfil.

### Características de la vista:
*   **Prioridades**: Etiquetas visuales para *High* (rojo), *Medium* (amarillo) y *Low* (azul).
*   **Estados**: Etiquetas para *OPEN*, *IN_PROGRESS* y *RESOLVED*.
*   **Acciones**: Botones de edición y eliminación integrados en cada fila.

Puedes acceder a esta nueva sección a través del enlace "Listado de Tickets" en el menú lateral.
