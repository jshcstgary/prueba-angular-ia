### User Input

Crea una carpeta "/src/app/types" donde crees los modelos usando type en lugar de interface, a cada archivo agrega el sufijo type, por ejemplo, profile.type.ts, y sigue los siguientes esquemas, un archivo por cada grupo de modelos:

- Profile: id: number, name: string, description: string, createdAt: Date, updatedAt: Date, options: Option[]
- ProfileCreate: Utiliza utility types para copar las propiedades de Profile, eliminar las propiedades id, createdAt, updatedAt y options y agregar la propiedad optionIds: number[]
- ProfileUpdate: Utiliza utility types para copar las propiedades de Profile, eliminar la propiedad options y agregar la propiedad optionIds: number[]

- Module: id: number, name: string, description: string, active: boolean
- ModuleCreate: Utiliza utility types para copar las propiedades de Module, eliminar las propiedades id y active
- ModuleUpdate: Utiliza utility types para copar las propiedades de Module

- Option: id: number, name: string, path: string, icon: string, module: Module
- OptionCreate: Utiliza utility types para copar las propiedades de Option, eliminar las propiedades id y module y agregas la propiedad moduleId: number
- OptionCreate: Utiliza utility types para copar las propiedades de Option, eliminar la propiedad module y agregas la propiedad moduleId: number

- ApiResponse: status: string, data: T

Crea un index.ts que actúe como Barril para los types

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He creado la carpeta `src/app/types` y los archivos correspondientes siguiendo tus esquemas y utilizando `type` con tipos de utilidad de TypeScript.

1.  **Archivos Creados**:
    *   `src/app/types/module.type.ts`: Contiene `Module`, `ModuleCreate` (sin `id` ni `active`) y `ModuleUpdate`.
    *   `src/app/types/option.type.ts`: Contiene `Option`, `OptionCreate` y `OptionUpdate` (con `moduleId` y sin el objeto `module`).
    *   `src/app/types/profile.type.ts`: Contiene `Profile`, `ProfileCreate` (sin `id`, fechas ni `options`, pero con `optionIds`) y `ProfileUpdate`.
    *   `src/app/types/api-response.type.ts`: Contiene el tipo genérico `ApiResponse<T>`.
    *   `src/app/types/index.ts`: Archivo barril que exporta todos los tipos anteriores.

2.  **Detalles Técnicos**:
    *   Se han utilizado `Omit` y combinaciones de tipos (`&`) para derivar los modelos de creación y actualización de forma robusta.
    *   Se han respetado las relaciones entre tipos (ej. `Option` importa `Module`, `Profile` importa `Option`).

Puedes ver los cambios en el [walkthrough actualizado](file:///C:/Users/mcastillo/.gemini/antigravity/brain/ee510c51-2374-48e7-a67a-a304dfcf1d51/walkthrough.md).
