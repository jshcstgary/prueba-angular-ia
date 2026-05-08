### User Input

Configura los mocks usando msw (Mock Service Worker) de la siguiente forma:

- Inicializa MSW en la carpeta /public del proyecto usando el comando "pnpm dlx msw init --save" para ejecutarlo
- Una vez inicializado, crea una carpeta /mocks dentro de /src y crea la configuración en el browser.ts
- En la carpeta /mocks crea el handler.ts el cual actuará como una especie de centralizador (Barril) y que exporte cada handler en un arreglo
- En el browser.ts configura el hanlder expuesto en el handler.ts
- Dentro de la carpeta /mocks crea una carpeta /db con archivos .ts que simularían una base datos en memoria para module (module.db.ts), profile (profile.db.ts) y option (option.db.ts), siguiendo las estructuras de Module, Profile y Option respectivamente
- Simula las relaciones foráneas como en una DB SQL, un Option tiene una propiedad Module y un Profile tiene una propiedades Option[] y cada Option traerá su propio Module
- Dentro de la carpeta mocks crea una carpeta /handlers para agregar los handlers de cada módulo, profile.handler.ts, module.handler.ts y option.handler.ts. Crea los métodos para realizar un CRUD para module, profile y option, sigue los esquemas de los types
- Configura el main.ts para usar MSW al inicializar la aplicación y que el navedor los use como backend

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Viewed [tsconfig.json](file:///c:/Users/mcastillo/Documents/prueba-angular/tsconfig.json) *

*User accepted the command `powershell -ExecutionPolicy Bypass -Command "pnpm dlx msw init public --save"`*

*Checked command status*

*Checked command status*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*
