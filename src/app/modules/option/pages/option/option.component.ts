import { Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { OptionService } from "../../../../services/option.service";
import { Option } from "../../../../types";

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

	public showModal = signal(false);
	public selectedOption = signal<Option | null>(null);

	public openModal(option: Option | null = null): void {
		this.selectedOption.set(option);
		this.showModal.set(true);
	}

	public onModalClosed(success: boolean): void {
		this.showModal.set(false);
		this.selectedOption.set(null);
		if (success) {
			location.reload();
		}
	}
}
