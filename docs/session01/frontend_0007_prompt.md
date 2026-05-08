### User Input

Modifica el main.ts para usar el Mock Service Worker

*Viewed [option.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/option.service.ts) *

*Viewed [main.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/main.ts) *

*User accepted the command `dir src/environments`*

*Viewed [environment.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/environments/environment.ts) *

*Listed directory [app](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He configurado Mock Service Worker (MSW) siguiendo todas tus instrucciones para simular un backend completo:

1.  **Inicialización**: He ejecutado `pnpm dlx msw init public --save`, lo que ha generado el script del Service Worker en la carpeta `public`.
2.  **Base de Datos en Memoria**:
    *   Creados en `src/mocks/db/`: `module.db.ts`, `option.db.ts` y `profile.db.ts`.
    *   Se han configurado las relaciones: `Option` referencia a un objeto `Module`, y `Profile` contiene un arreglo de `Option[]` (cada una con su `Module`).
3.  **Handlers (CRUD)**:
    *   Implementados en `src/mocks/handlers/`: `module.handler.ts`, `option.handler.ts` y `profile.handler.ts`.
    *   Soportan operaciones `GET` (todos e individual), `POST`, `PUT` y `DELETE` para cada entidad, respetando los tipos de utilidad y la lógica de negocio (como generar IDs o buscar relaciones).
4.  **Configuración de MSW**:
    *   `src/mocks/handler.ts`: Centraliza todos los handlers en un único arreglo.
    *   `src/mocks/browser.ts`: Configura el worker del navegador.
5.  **Integración con la App**:
    *   Modificado `src/main.ts` para que la aplicación inicie el worker de MSW antes de arrancar el módulo de Angular (solo en entornos no productivos).

Ahora, cualquier petición a `/api/modules`, `/api/options` o `/api/profiles` será interceptada por MSW utilizando los datos simulados. Puedes ver los detalles en el [walkthrough](file:///C:/Users/mcastillo/.gemini/antigravity/brain/ee510c51-2374-48e7-a67a-a304dfcf1d51/walkthrough.md).
