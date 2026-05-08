import { Component, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { Option, Module } from "../../../types";

type GroupedOptions = {
	module: Module;
	options: Option[];
};

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	standalone: false
})
export class SidebarComponent {
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);

	public groupedOptions = computed<GroupedOptions[]>(() => {
		const user = this.authService.currentUser();
		if (!user) return [];

		const groups: { [key: number]: GroupedOptions } = {};

		user.profile.options.forEach((option) => {
			if (!groups[option.module.id]) {
				groups[option.module.id] = {
					module: option.module,
					options: []
				};
			}
			groups[option.module.id].options.push(option);
		});

		return Object.values(groups);
	});

	public logout(): void {
		this.authService.logout();
		this.router.navigate(["/auth"]);
	}
}
