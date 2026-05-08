### User Input

Para los Modules, Options y Profiles crea también un modal al presionar el botón Nuevo:
- Los modales deberán pedir la información de su respectivo modelo Create
- No debe cerrarse presionando Esc o dando click fuera
- El botón "Guardar" mandará a ejecutar el servicio y método correspondiente (CREATE)
- Al presionar en el botón editar deberá mostrar el mismo modal con la información cargada y al presionar en "Guardar" mandará a llamar al servicio y método correspondiente (UPDATE)
- Al presionar el Cerrar, el modal se cerrará pero eliminará las modificaciones que se hicieron en el formulario del modal

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [user.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/user.db.ts) *

*User accepted the command `mkdir src/app/modules/module/components src/app/modules/option/components src/app/modules/profile/components`*

*Viewed [module.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/module.type.ts) *

*Edited relevant file*

*Edited relevant file*

*Viewed [module.module.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/module/module.module.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [option.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/option.type.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [profile.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/profile.type.ts) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He implementado los modales para la gestión de **Módulos**, **Opciones** y **Perfiles**, integrando las operaciones de creación y edición en cada uno.

### Cambios realizados:

1.  **Modales Creados**:
    *   `ModuleModalComponent`: Maneja nombre, descripción y estado activo.
    *   `OptionModalComponent`: Permite configurar nombre, ruta, ícono y seleccionar el módulo al que pertenece.
    *   `ProfileModalComponent`: Permite definir el nombre, descripción y realizar una selección múltiple de las opciones disponibles.
2.  **Lógica de Operación**:
    *   **Creación**: Al presionar "Nuevo", se abre el modal vacío.
    *   **Edición**: Al presionar "Editar", se abre el modal con la información cargada.
    *   **Persistencia**: El botón "Guardar" ejecuta el método `create` o `update` del servicio correspondiente.
3.  **Comportamiento del Modal**:
    *   **Seguridad**: No se cierran al presionar `Esc` o hacer clic fuera, asegurando que el usuario tome una acción explícita.
    *   **Cancelación**: Al cerrar o cancelar, no se aplican cambios al listado original.
4.  **Diseño Premium**:
    *   Uso de *Glassmorphism* para el fondo del modal.
    *   Diseño limpio y coherente con la paleta de colores del proyecto.
    *   Uso de `ReactiveFormsModule` para validaciones en tiempo real (botones deshabilitados si faltan datos).

### Resumen Técnico:
*   Se actualizaron los archivos `.module.ts` de cada sección para incluir las declaraciones y el `ReactiveFormsModule`.
*   Se añadieron propiedades `Signal` en los componentes principales para controlar la visibilidad y el elemento seleccionado.
*   Se utiliza `location.reload()` tras una operación exitosa para refrescar los datos desde los mocks de MSW de forma consistente.

> [!TIP]
> En el modal de **Perfiles**, puedes seleccionar múltiples opciones simplemente haciendo clic en ellas dentro de la lista desplazable. El sistema validará automáticamente que hayas seleccionado al menos una opción antes de permitirte guardar.
