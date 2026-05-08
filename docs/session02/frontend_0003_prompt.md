### User Input

Genera los servicios con los métodos CRUD para Module, Option y Profile:
- El create recibirá los modelos Create respectivamente
- El update recibirá los modelos Update respectivamente
- Todos devovlerán un ApiRespose<Model>
- El delete devolverá un ApiResponse<boolean>

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [profile.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/profile.db.ts) *

*Listed directory [types](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types) *

*Viewed [index.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/index.ts) *

*Viewed [module.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/module.type.ts) *

*Viewed [option.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/option.type.ts) *

*Viewed [profile.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/profile.type.ts) *

*Listed directory [app](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [app.module.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/app.module.ts) *

*Edited relevant file*

### Planner Response

He generado los servicios CRUD para `Module`, `Option` y `Profile` siguiendo tus requerimientos.

### Cambios realizados:

1.  **Nuevos Servicios**:
    *   **[module.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/module.service.ts)**
    *   **[option.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/option.service.ts)**
    *   **[profile.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/profile.service.ts)**
2.  **Estructura de los métodos**:
    *   `getAll()`: Devuelve `Observable<ApiResponse<Model[]>>`.
    *   `getById(id)`: Devuelve `Observable<ApiResponse<Model>>`.
    *   `create(data)`: Recibe `CreateModel` y devuelve `Observable<ApiResponse<Model>>`.
    *   `update(data)`: Recibe `UpdateModel` y devuelve `Observable<ApiResponse<Model>>`.
    *   `delete(id)`: Devuelve `Observable<ApiResponse<boolean>>`.
3.  **Configuración**:
    *   Se utiliza la configuración de `environment` (`baseUrl`, `urlPrefix` y `path`) para construir las URLs de la API.
    *   Se ha actualizado el **[app.module.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/app.module.ts)** para incluir `provideHttpClient()`, permitiendo que los servicios funcionen correctamente.

Todos los servicios están marcados con `providedIn: 'root'`, por lo que están listos para ser inyectados en cualquier parte de la aplicación.
