import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { Profile, ProfileCreate, ProfileUpdate } from "../../../../types";
import { ProfileService } from "../../../../services/profile.service";
import { OptionService } from "../../../../services/option.service";
import { ToastService } from "../../../../services/toast.service";

@Component({
	selector: "app-profile-modal",
	templateUrl: "./profile-modal.component.html",
	standalone: false
})
export class ProfileModalComponent implements OnInit {
	@Input() public profile: Profile | null = null;
	@Output() public closed = new EventEmitter<boolean>();

	private readonly fb = inject(FormBuilder);
	private readonly profileService = inject(ProfileService);
	private readonly optionService = inject(OptionService);
	private readonly toastService = inject(ToastService);

	public options = toSignal(this.optionService.getAll(), { initialValue: undefined });

	public profileForm = this.fb.nonNullable.group({
		name: ["", [Validators.required]],
		description: ["", [Validators.required]],
		optionIds: [[] as number[], [Validators.required, Validators.minLength(1)]]
	});

	public ngOnInit(): void {
		if (this.profile) {
			this.profileForm.patchValue({
				name: this.profile.name,
				description: this.profile.description,
				optionIds: this.profile.options.map((o) => o.id)
			});
		}
	}

	public toggleOption(id: number): void {
		const currentIds = this.profileForm.getRawValue().optionIds;
		if (currentIds.includes(id)) {
			this.profileForm.patchValue({ optionIds: currentIds.filter((o) => o !== id) });
		} else {
			this.profileForm.patchValue({ optionIds: [...currentIds, id] });
		}
	}

	public onSave(): void {
		if (this.profileForm.invalid) return;

		const formValue = this.profileForm.getRawValue();

		if (this.profile) {
			// Update
			const updatedProfile: ProfileUpdate = { 
				...this.profile,
				...formValue,
				updatedAt: new Date()
			};
			this.profileService.update(updatedProfile).subscribe({
				next: (res) => {
					if (res.status === "success") {
						this.toastService.show("Perfil actualizado con éxito");
						this.closed.emit(true);
					}
				}
			});
		} else {
			// Create
			const newProfile: ProfileCreate = formValue;
			this.profileService.create(newProfile).subscribe({
				next: (res) => {
					if (res.status === "success") {
						this.toastService.show("Perfil creado con éxito");
						this.closed.emit(true);
					}
				}
			});
		}
	}

	public onClose(): void {
		this.closed.emit(false);
	}
}
