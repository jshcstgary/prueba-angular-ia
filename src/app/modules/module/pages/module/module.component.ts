import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ModuleService } from "../../../../services/module.service";

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
}
