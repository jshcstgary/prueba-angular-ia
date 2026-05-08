### User Input

Modifica los handlers para que las rutas sean acorde a las especificadas en los environments

*Viewed [module.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/module.handler.ts) *

*Viewed [environment.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/environments/environment.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He actualizado todos los handlers de MSW para que las rutas coincidan exactamente con las definidas en los `environments`.

1.  **Integración de `environment.ts`**: He importado el objeto `environment` en cada archivo de handler (`module.handler.ts`, `option.handler.ts` y `profile.handler.ts`).
2.  **Rutas Dinámicas**: Ahora las rutas se construyen utilizando `${environment.baseUrl}${environment.urlPrefix}${environment.path.entity}`, asegurando que MSW intercepte correctamente las llamadas de los servicios de Angular (que utilizan la URL absoluta).
3.  **Mantenimiento**: Si cambias el `urlPrefix` o los `path` en el archivo de environment, los mocks se actualizarán automáticamente para coincidir con el "backend".

Los cambios ya están aplicados y puedes ver el resumen en el [walkthrough](file:///C:/Users/mcastillo/.gemini/antigravity/brain/ee510c51-2374-48e7-a67a-a304dfcf1d51/walkthrough.md).
