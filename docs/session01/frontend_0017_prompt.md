### User Input

Dentro de la carpeta /types crea un type User con las siguientes propiedades:
- UserDb: : id: number, name: string, email: string, password: string, profile: Profile (el profile deberá tener así mismo las opciones a las que tiene acceso, y cada option tendrá el móudlo al que pertenece). Esta propiedad solo se usará para la DB (user.db.ts en los mocks) cuando se creen los mocks respectivos
- User: id: number, name: string, email: string, jst: string, profile: Profile (el profile deberá tener así mismo las opciones a las que tiene acceso, y cada option tendrá el móudlo al que pertenece)
- UserCreate: Usa type utility para copiar las propiedades de User, eliminar la propiedad id, jwt y profile, y agregar la propiedad profileId: number
- UserUpdate: Usa type utility para copiar las propiedades de User, eliminar la propiedad jwt y profile, y agregar la propiedad profileId: number
- UserCredentials: email: string, password: string

*Viewed [profile.component.html](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/modules/profile/pages/profile/profile.component.html) *

*Viewed [profile.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/profile.type.ts) *

*Edited relevant file*

*Edited relevant file*

### Planner Response

He creado el archivo `src/app/types/user.type.ts` y actualizado el barril de exportaciones:

1.  **`UserDb`**: Tipo completo para la base de datos simulada (incluye `password`).
2.  **`User`**: Tipo para la aplicación (incluye `jwt` en lugar de `password`).
3.  **`UserCreate`**: Utiliza `Omit` para eliminar `id`, `jwt` y `profile`, añadiendo `profileId`.
4.  **`UserUpdate`**: Utiliza `Omit` para eliminar `jwt` y `profile`, añadiendo `profileId`.
5.  **`UserCredentials`**: Utiliza `Pick` para extraer `email` y `password` de `UserDb`.

Puedes encontrar las definiciones en [user.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/user.type.ts).
