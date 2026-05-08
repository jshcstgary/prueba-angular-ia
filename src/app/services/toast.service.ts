import { Injectable, signal } from "@angular/core";
import { Toast, ToastType } from "../types";

@Injectable({
	providedIn: "root"
})
export class ToastService {
	private readonly _toasts = signal<Toast[]>([]);
	public readonly toasts = this._toasts.asReadonly();

	public show(message: string): void {
		const type: ToastType = message.startsWith("Error:") ? "error" : "success";
		const id = Date.now();

		this._toasts.update((toasts) => [...toasts, { id, message, type }]);

		setTimeout(() => {
			this.remove(id);
		}, 3000);
	}

	public remove(id: number): void {
		this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
	}
}
