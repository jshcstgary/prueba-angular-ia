import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProfileService } from "../../../../services/profile.service";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	standalone: false
})
export class ProfileComponent {
	private readonly profileService = inject(ProfileService);

	public profiles = toSignal(this.profileService.getAll(), {
		initialValue: undefined
	});
}
