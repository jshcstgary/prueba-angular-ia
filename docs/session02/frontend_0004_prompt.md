### User Input

Crea los siguientes datos de prueba en los archivos de DB:

Module:
- Mantenedores
- Tickets
- Usuarios

Option:
- Módulos: ruta /modules (pertenece al módulo de Mantenedores)
- Perfiles: ruta /profiles (pertenece al módulo de Mantenedores)
- Opciones: ruta /options (pertenece al módulo de Mantenedores)

Profile: Crea 3 registros, uno para admin (el cual tendrá todas las opciones), otro para support (el cual tendrá las opciones de tickets y usuarios) y otro para cliente (el cual tendrá solo la opción de tickets)

*Viewed [option.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/option.service.ts) *

*Viewed [module.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/module.db.ts) *

*Viewed [option.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/option.db.ts) *

*Viewed [profile.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/profile.db.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He actualizado los archivos de base de datos simulada (`mock db`) con la información solicitada.

### Datos de prueba creados:

1.  **[module.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/module.db.ts)**:
    *   **Mantenedores**: Configuración y mantenimiento del sistema.
    *   **Tickets**: Gestión de tickets de soporte.
    *   **Usuarios**: Administración de usuarios.

2.  **[option.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/option.db.ts)**:
    *   **Módulos**, **Perfiles** y **Opciones**: Todas apuntando al módulo de *Mantenedores*.
    *   He añadido adicionalmente las opciones de **Listado de Tickets** y **Gestión de Usuarios** para poder completar la lógica de los perfiles de soporte y cliente.

3.  **[profile.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/profile.db.ts)**:
    *   **Admin**: Tiene acceso a las 5 opciones disponibles.
    *   **Support**: Tiene acceso a las opciones de *Tickets* y *Usuarios*.
    *   **Cliente**: Tiene acceso únicamente a la opción de *Tickets*.

Los datos están listos para ser consumidos por los handlers de MSW y tus servicios de Angular.
