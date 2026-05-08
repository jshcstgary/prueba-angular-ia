### User Input

Modifica el sidebar para que muestre las Options agrupadas según el Module al que pertenecen, estas las obtendría del campo profile dentro del user que devuelve el método de signIn o singUp

*Viewed [user.db.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/mocks/db/user.db.ts) *

*Viewed [auth.service.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/services/auth.service.ts) *

*Edited relevant file*

*Viewed [sidebar.component.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/shared/components/sidebar/sidebar.component.ts) *

*Edited relevant file*

*Viewed [sidebar.component.html](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/shared/components/sidebar/sidebar.component.html) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He actualizado el Sidebar para que sea dinámico y muestre las opciones del usuario agrupadas por su módulo correspondiente:

1.  **Persistencia del Usuario**: He modificado el `AuthService` para que, al iniciar sesión o registrarse, guarde el objeto `User` completo (incluyendo su perfil y opciones) en el `localStorage`. También he expuesto este usuario a través de un Signal `currentUser`.
2.  **Lógica de Agrupamiento**: En el `SidebarComponent`, he implementado un Signal computado que transforma la lista plana de opciones del usuario en una estructura agrupada por el ID del módulo.
3.  **Interfaz Dinámica**: El HTML del sidebar ahora recorre estos grupos, mostrando el nombre del módulo como un encabezado de sección y sus opciones correspondientes debajo, manteniendo los iconos y las rutas dinámicas.
4.  **Cierre de Sesión**: He activado el botón de "Cerrar sesión" para que limpie el almacenamiento local y redirija al usuario a la pantalla de autenticación.

Con esto, el menú lateral reflejará exactamente los permisos del perfil que tenga el usuario que ha iniciado sesión. Puedes verlo en funcionamiento en [sidebar.component.html](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/shared/components/sidebar/sidebar.component.html).
