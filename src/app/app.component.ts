import { Component, computed, inject, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	standalone: false,
	styles: []
})
export class App {
	private readonly router = inject(Router);
	protected readonly title = signal("prueba-angular");

	private readonly currentUrl = signal("");

	protected readonly showLayout = computed(() => !this.currentUrl().startsWith("/auth"));

	constructor() {
		this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe((event) => {
				this.currentUrl.set((event as NavigationEnd).urlAfterRedirects);
			});
	}
}
