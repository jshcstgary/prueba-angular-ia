### User Input

Crea los environments para Angular, además de la propiedad production por defecto, agrega las siguientes:

baseUrl: URL base, por ejemplo, http://localhost:4300
urlPrefix: La cual será /api
Path: Cada uno de los path, para este caso, será module, option y profile con el valor de /modules, /options y /profiles correspondientemente

*Edited relevant file*

*Viewed [styles.css](file:///c:/Users/mcastillo/Documents/prueba-angular/src/styles.css) *

*Listed directory [src](file:///c:/Users/mcastillo/Documents/prueba-angular/src) *

*Viewed [angular.json](file:///c:/Users/mcastillo/Documents/prueba-angular/angular.json) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### Planner Response

He creado los archivos de entorno y configurado `angular.json` para que se realicen los reemplazos correctamente durante la compilación de producción.

### Cambios realizados:

1.  **Nuevo archivo [environment.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/environments/environment.ts)**: Configuración para el entorno de desarrollo.
2.  **Nuevo archivo [environment.prod.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/environments/environment.prod.ts)**: Configuración para el entorno de producción (con `production: true`).
3.  **Actualización de [angular.json](file:///c:/Users/mcastillo/Documents/prueba-angular/angular.json)**: Se ha añadido la sección `fileReplacements` dentro de la configuración de `production` para intercambiar los archivos de entorno automáticamente al compilar con `--configuration production`.

La estructura de los archivos es la siguiente:

```typescript
export const environment = {
	production: false, // true en environment.prod.ts
	baseUrl: "http://localhost:4300",
	urlPrefix: "/api",
	path: {
		module: "/modules",
		option: "/options",
		profile: "/profiles"
	}
};
```

> [!TIP]
> Recuerda que para usar estas variables en tus componentes o servicios, debes importar `environment` desde `src/environments/environment`. Angular se encargará de cambiar el archivo según el modo de compilación.
