import { platformBrowser } from "@angular/platform-browser";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

async function prepareApp() {
	if (!environment.production) {
		const { worker } = await import("./mocks/browser");
		return worker.start({
			onUnhandledRequest: "bypass"
		});
	}
	return Promise.resolve();
}

prepareApp().then(() => {
	platformBrowser()
		.bootstrapModule(AppModule, {})
		.catch((err) => console.error(err));
});
