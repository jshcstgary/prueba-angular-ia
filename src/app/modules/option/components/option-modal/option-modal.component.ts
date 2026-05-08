import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { Option, OptionCreate, OptionUpdate } from "../../../../types";
import { OptionService } from "../../../../services/option.service";
import { ModuleService } from "../../../../services/module.service";
import { ToastService } from "../../../../services/toast.service";

@Component({
	selector: "app-option-modal",
	templateUrl: "./option-modal.component.html",
	standalone: false
})
export class OptionModalComponent implements OnInit {
	@Input() public option: Option | null = null;
	@Output() public closed = new EventEmitter<boolean>();

	private readonly fb = inject(FormBuilder);
	private readonly optionService = inject(OptionService);
	private readonly moduleService = inject(ModuleService);
	private readonly toastService = inject(ToastService);

	public modules = toSignal(this.moduleService.getAll(), { initialValue: undefined });

	public optionForm = this.fb.nonNullable.group({
		name: ["", [Validators.required]],
		path: ["", [Validators.required]],
		icon: ["", [Validators.required]],
		moduleId: [0, [Validators.required, Validators.min(1)]]
	});

	public ngOnInit(): void {
		if (this.option) {
			this.optionForm.patchValue({
				name: this.option.name,
				path: this.option.path,
				icon: this.option.icon,
				moduleId: this.option.module.id
			});
		}
	}

	public onSave(): void {
		if (this.optionForm.invalid) return;

		const formValue = this.optionForm.getRawValue();
		const payload = {
			...formValue,
			moduleId: Number(formValue.moduleId)
		};

		if (this.option) {
			// Update
			const updatedOption: OptionUpdate = { ...payload, id: this.option.id };
			this.optionService.update(updatedOption).subscribe({
				next: (res) => {
					if (res.status === "success") {
						this.toastService.show("Opción actualizada con éxito");
						this.closed.emit(true);
					}
				}
			});
		} else {
			// Create
			const newOption: OptionCreate = payload;
			this.optionService.create(newOption).subscribe({
				next: (res) => {
					if (res.status === "success") {
						this.toastService.show("Opción creada con éxito");
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
