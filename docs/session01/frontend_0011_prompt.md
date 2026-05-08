### User Input

Continue

*Viewed [profile.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/profile.handler.ts) *

### Planner Response

He revisado y corregido los handlers de MSW para asegurar que cumplen estrictamente con los requisitos de validación y formato de respuesta:

1.  **Actualización del Tipo `ApiResponse`**: He añadido la propiedad `statusCode: number` al tipo global en `src/app/types/api-response.type.ts`.
2.  **Códigos de Estado Explícitos**: Ahora todos los handlers devuelven el `statusCode` tanto en el cuerpo JSON de la respuesta como en el código de estado HTTP real.
3.  **Manejo de Errores de Lectura**: He añadido bloques `try-catch` al procesar el cuerpo de las peticiones (`request.json()`) para evitar caídas del worker ante datos malformados, devolviendo un error `400` controlado.
4.  **Validaciones de Existencia y Unicidad**:
    *   Los métodos `getById` y `delete` ahora devuelven explícitamente `status: "Error: no existe"` y `data: null` con código `404` si el ID no se encuentra.
    *   Se han reforzado las validaciones de nombres duplicados en `Module`, `Option` y `Profile`.
    *   Se han asegurado las validaciones de relaciones (ej. que el `moduleId` exista al crear una `Option`).

Puedes verificar la implementación detallada en los archivos de `src/mocks/handlers/`. El [walkthrough](file:///C:/Users/mcastillo/.gemini/antigravity/brain/ee510c51-2374-48e7-a67a-a304dfcf1d51/walkthrough.md) ha sido actualizado con estos cambios.
