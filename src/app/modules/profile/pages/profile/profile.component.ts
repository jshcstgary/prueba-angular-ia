import { Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProfileService } from "../../../../services/profile.service";
import { Profile } from "../../../../types";

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

	public showModal = signal(false);
	public selectedProfile = signal<Profile | null>(null);

	public openModal(profile: Profile | null = null): void {
		this.selectedProfile.set(profile);
		this.showModal.set(true);
	}

	public onModalClosed(success: boolean): void {
		this.showModal.set(false);
		this.selectedProfile.set(null);
		if (success) {
			location.reload();
		}
	}
}
