### User Input

Dentro de los handlers realiza la siguiente lógica:
- Para insertar un nuevo module primero valida que el nombre no exista, si ya existe, devuelve un ApiResponse con status: "Error: Módulo ya existe" y data null con statusCode 400
- Para actualizar un module valida que el nombre no exista en otro registro, si ya existe, devuelve un ApiResponse con status: "Error: Módulo ya existe" y data null con statusCode 400
- Para insertar un nuevo option valida primero que el module relacionado exista, si no existe, devuelve un ApiResponse con status: "Error: Módulo no existe" y data null con statusCode 404
- Luego valida que el nombre no exista, si ya existe, devuelve un ApiResponse con status: "Error: Opción ya existe" y data null con statusCode 400
- Al actualizar realiza lo mismo, pero al modificar validará si el nombre ya existe en otro registro
- Para insertar un nuevo profile valida primero que las opciones asociadas existan, si no existe al menos una, devuelve un ApiResponse con status: "Error: Una de las opciones no existe" y data null con statusCode 404
- Luego valida que el nombre no exista, si ya existe, devuelve un ApiResponse con status: "Error: Perfil ya existe" y data null con statusCode 400
- Al actualizar realiza lo mismo, pero al modificar validará si el nombre ya existe en otro registro
- Los métodos getAll (GET) devolverán un ApiResponse con status "success" y la data será el arreglo obtenido
- Los métodos getById validarán que exista el registro con el id proporcionado, si no existe, devuelve un ApiResponse<> con status: "Error: no existe" y data null con statusCode 404
- Los métodos delete validarán que exista el registro con el id proporcionado, si no existe, devuelve un ApiResponse<> con status: "Error: no existe" y data null con statusCode 404, en caso de éxitos, este devolverá ApiResponse
- Todos los casos de éxito y fallo, deverán devolver explícitamente el status code

*Viewed [module.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/module.handler.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He actualizado los handlers de MSW para incluir la lógica de validación y los códigos de estado explícitos que solicitaste:

### Lógica de Validación Implementada:
*   **Module (`module.handler.ts`)**:
    *   **Insertar/Actualizar**: Valida que el nombre sea único. Si ya existe, devuelve `400` con el mensaje `"Error: Módulo ya existe"`.
*   **Option (`option.handler.ts`)**:
    *   **Insertar/Actualizar**: 
        *   Valida que el `moduleId` relacionado exista (`404` si no).
        *   Valida que el nombre sea único (`400` si ya existe).
*   **Profile (`profile.handler.ts`)**:
    *   **Insertar/Actualizar**:
        *   Valida que todas las opciones en `optionIds` existan (`404` si falta alguna).
        *   Valida que el nombre sea único (`400` si ya existe).

### Reglas Generales:
*   **getAll**: Devuelve siempre `200 OK` con la data.
*   **getById / delete**: Validan la existencia del ID. Si no existe, devuelven `404` con `"Error: no existe"`. Si tiene éxito, devuelven `200 OK`.
*   **Explícito**: Todos los métodos `HttpResponse.json` ahora incluyen el objeto de configuración `{ status: ... }` para asegurar que el navegador reciba el código HTTP correcto.

Los cambios han sido aplicados en `src/mocks/handlers/` y puedes consultar el resumen en el [walkthrough](file:///C:/Users/mcastillo/.gemini/antigravity/brain/ee510c51-2374-48e7-a67a-a304dfcf1d51/walkthrough.md).
