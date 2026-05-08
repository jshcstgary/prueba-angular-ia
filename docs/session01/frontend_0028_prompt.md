### User Input

Modifica la creación de un Option para que el moduleId se envíe como number

*Edited relevant file*

*Edited relevant file*

*Viewed [option.handler.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/handlers/option.handler.ts) *

*Viewed [option.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/option.type.ts) *

*User accepted the command `powershell -Command "Test-Path src/app/modules/option/components/option-modal/option-modal.component.ts"`*

*Checked command status*

*Viewed [option-modal.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/option/components/option-modal/option-modal.component.ts) *

*Viewed [option-modal.component.html](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/option/components/option-modal/option-modal.component.html) *

*Edited relevant file*

*Edited relevant file*

### Planner Response

He modificado el `OptionModalComponent` para asegurar que el `moduleId` se envíe siempre como un valor de tipo `number`. 

Aunque el formulario se inicializa con un número, los elementos `<select>` de HTML a veces pueden devolver el valor como un string al capturar el valor del formulario. Para evitar fallos en la validación del backend (MSW), ahora realizo un casting explícito a `Number()` antes de enviar el objeto tanto en la creación como en la actualización.

Puedes ver el cambio en el método `onSave` de [option-modal.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/option/components/option-modal/option-modal.component.ts).
