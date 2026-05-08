import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { OptionService } from "../../../../services/option.service";

@Component({
	selector: "app-option",
	templateUrl: "./option.component.html",
	standalone: false
})
export class OptionComponent {
	private readonly optionService = inject(OptionService);

	public options = toSignal(this.optionService.getAll(), {
		initialValue: undefined
	});
}
