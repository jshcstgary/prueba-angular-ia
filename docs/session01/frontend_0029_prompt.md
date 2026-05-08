### User Input

Cuando ingreso un nuevo registro, mediante los modales en los mantenedores, guarda la información y luego recarga la página y esto hace que se pierdan los valores, revisa por qué etá ocurriendo esto

*Edited relevant file*

*Viewed [user.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/user.db.ts) *

*Edited relevant file*

*Viewed [module.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/module.db.ts) *

*Edited relevant file*

*Viewed [module.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/module.handler.ts) *

*Edited relevant file*

*Viewed [option.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/option.db.ts) *

*Edited relevant file*

*Viewed [option.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/option.handler.ts) *

*Edited relevant file*

*Viewed [profile.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/profile.db.ts) *

*Edited relevant file*

*Viewed [profile.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/profile.handler.ts) *

*Edited relevant file*

*Viewed [user.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/user.db.ts) *

*Edited relevant file*

*Viewed [user.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/user.handler.ts) *

*Edited relevant file*

*Viewed [ticket.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/ticket.db.ts) *

*Edited relevant file*

*Viewed [ticket.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/ticket.handler.ts) *

*Edited relevant file*

### Planner Response

Este problema ocurría porque el "backend" simulado (MSW) mantiene los datos en la memoria del navegador. Al recargar la página, la aplicación de Angular se reinicia y vuelve a cargar los archivos `*.db.ts` con sus valores iniciales "hardcoded", perdiendo cualquier cambio realizado.

He implementado un **sistema de persistencia** para solucionar esto:

1.  **Utilidad de Persistencia**: He creado `persistence.utils.ts` para manejar la lectura y escritura en el `localStorage` del navegador.
2.  **Base de Datos Persistente**: He actualizado todos los archivos de base de datos (`module.db.ts`, `option.db.ts`, `profile.db.ts`, `user.db.ts`, `ticket.db.ts`) para que, al cargar, intenten recuperar los datos guardados en el navegador antes de usar los valores por defecto.
3.  **Handlers Sincronizados**: He modificado todos los handlers de la API simulada (MSW) para que, cada vez que crees, edites o elimines un registro, los cambios se guarden automáticamente en el almacenamiento local.

Con estos cambios, ahora puedes agregar o modificar registros y, al recargar la página (`location.reload()`), **los datos se mantendrán intactos**.

Puedes verificar la utilidad principal aquí: [persistence.utils.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/persistence.utils.ts).
