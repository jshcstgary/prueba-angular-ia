import { Component, inject } from "@angular/core";
import { AuthService } from "../../../services/auth.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	standalone: false
})
export class HeaderComponent {
	private readonly authService = inject(AuthService);
	public readonly currentUser = this.authService.currentUser;
}
