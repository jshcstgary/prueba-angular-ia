import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Module, ModuleCreate } from "../../../../types";
import { ModuleService } from "../../../../services/module.service";
import { ToastService } from "../../../../services/toast.service";

@Component({
	selector: "app-module-modal",
	templateUrl: "./module-modal.component.html",
	standalone: false
})
export class ModuleModalComponent implements OnInit {
	@Input() public module: Module | null = null;
	@Output() public closed = new EventEmitter<boolean>();

	private readonly fb = inject(FormBuilder);
	private readonly moduleService = inject(ModuleService);
	private readonly toastService = inject(ToastService);

	public moduleForm = this.fb.nonNullable.group({
		name: ["", [Validators.required]],
		description: ["", [Validators.required]],
		active: [true]
	});

	public ngOnInit(): void {
		if (this.module) {
			this.moduleForm.patchValue(this.module);
		}
	}

	public onSave(): void {
		if (this.moduleForm.invalid) return;

		if (this.module) {
			// Update
			const updatedModule: Module = { ...this.module, ...this.moduleForm.getRawValue() };
			this.moduleService.update(updatedModule).subscribe({
				next: (res) => {
					if (res.status === "success") {
						this.toastService.show("Módulo actualizado con éxito");
						this.closed.emit(true);
					}
				}
			});
		} else {
			// Create
			const newModule: ModuleCreate = this.moduleForm.getRawValue();
			this.moduleService.create(newModule).subscribe({
				next: (res) => {
					if (res.status === "success") {
						this.toastService.show("Módulo creado con éxito");
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
