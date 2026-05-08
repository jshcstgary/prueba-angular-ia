import { Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ModuleService } from "../../../../services/module.service";
import { Module } from "../../../../types";

@Component({
	selector: "app-module",
	templateUrl: "./module.component.html",
	standalone: false
})
export class ModuleComponent {
	private readonly moduleService = inject(ModuleService);

	public modules = toSignal(this.moduleService.getAll(), {
		initialValue: undefined
	});

	public showModal = signal(false);
	public selectedModule = signal<Module | null>(null);

	public openModal(module: Module | null = null): void {
		this.selectedModule.set(module);
		this.showModal.set(true);
	}

	public onModalClosed(success: boolean): void {
		this.showModal.set(false);
		this.selectedModule.set(null);
		if (success) {
			// In a real app we might use a subject to refresh toSignal
			// For now, location.reload() or re-calling the service if we had a signal for it.
			// Better: location.reload() to ensure mock data consistency.
			location.reload();
		}
	}
}
