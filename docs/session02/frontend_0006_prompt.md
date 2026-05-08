### User Input

Crea un nuevo module llamado Shared y dentro crea los componentes sidebar y header, estos serán el layout de toda la aplicación
- El sidebar ya está creado en el index.html. pásalo al nuevo componente, adicional, agrega la opción de cerrar sesión al final del sidebar
- El header deberá tener el nombre del usuario y debajo el rol en letras más pequeñas y con un color más suave

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [profile.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/profile/pages/profile/profile.component.ts) *

*User accepted the command `mkdir src/app/shared src/app/shared/components src/app/shared/components/sidebar src/app/shared/components/header`*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He creado el módulo `Shared` y los componentes de layout solicitados para organizar mejor la aplicación.

### Cambios realizados:

1.  **Nuevo Módulo `Shared`**: Creado en `src/app/shared`, encargado de gestionar los componentes comunes.
2.  **Componente `Sidebar`**: 
    *   Se ha extraído la lógica de navegación desde `app.component.html`.
    *   Se ha añadido la opción **"Cerrar sesión"** en la parte inferior con un estilo diferenciado en rojo.
3.  **Componente `Header`**: 
    *   Se ha diseñado para mostrar la información del usuario en la parte superior derecha.
    *   Muestra el nombre del usuario y su rol con un diseño de tipografía jerárquica (el rol es más pequeño y en un color más suave).
4.  **Layout Principal**: Se ha actualizado el `app.component.html` para integrar estos nuevos componentes, logrando una estructura más limpia y modular.

### Estructura de archivos:
*   `src/app/shared/shared.module.ts`
*   `src/app/shared/components/sidebar/`
*   `src/app/shared/components/header/`

> [!NOTE]
> Los componentes ahora están centralizados en el `SharedModule`, lo que facilita su mantenimiento y permite añadir nuevas funcionalidades globales (como notificaciones o perfiles de usuario) de forma sencilla.
