### User Input

Dentro de la carpeta /services, crea las pruebas unitarias para cada uno:
- Que abarque todos los métodos creados
- Valida tanto lo escenarios de éxito como los de error
- Usa Vitest como paquete para pruebas

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

*Viewed [package.json](file:///c:/Users/mcastillo/Documents/prueba-angular/package.json) *

*User accepted the command `ls vitest.config.ts`*

*Checked command status*

*Edited relevant file*

*Viewed [module.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/module.service.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [user.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/user.service.ts) *

*Edited relevant file*

### Planner Response

He generado las pruebas unitarias para todos los servicios de la aplicación utilizando **Vitest**.

### Resumen de las pruebas creadas:

1.  **Configuración de Vitest**: He creado el archivo `vitest.config.ts` configurado para un entorno de pruebas de Angular con `jsdom`.
2.  **Servicios Cubiertos**:
    *   `AuthService`: Pruebas de login, registro, logout y manejo de `localStorage` (JWT).
    *   `ModuleService`: Cobertura completa de los métodos CRUD (GetAll, GetById, Create, Update, Delete).
    *   `OptionService`: Pruebas de CRUD con validación de asociación de módulos.
    *   `ProfileService`: Pruebas de CRUD con manejo de selección de opciones.
    *   `TicketService`: Pruebas de CRUD con filtros por usuario asignado.
    *   `UserService`: Pruebas de obtención de usuarios y filtrado por perfiles de soporte.
3.  **Escenarios Validados**:
    *   **Éxito**: Se verifica que las peticiones HTTP se realicen con los métodos correctos (GET, POST, PUT, DELETE) y que los datos devueltos coincidan con lo esperado.
    *   **Error**: Se han incluido pruebas para validar el comportamiento del servicio ante respuestas fallidas del servidor (ej. error 500).

### Detalles Técnicos:
*   He utilizado `HttpTestingController` para interceptar y simular las respuestas de la API de forma controlada.
*   Para el `AuthService`, se ha simulado el `localStorage` de forma global para asegurar que los tokens se guarden y eliminen correctamente sin afectar al navegador real.

> [!TIP]
> Puedes ejecutar todas las pruebas utilizando el comando `npx vitest` en la terminal. Las pruebas están organizadas en archivos `.spec.ts` dentro de la carpeta `src/app/services/`.
