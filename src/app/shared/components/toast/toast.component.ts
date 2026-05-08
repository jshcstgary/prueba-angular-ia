import { Component, inject } from "@angular/core";
import { ToastService } from "../../../services/toast.service";

@Component({
	selector: "app-toast",
	template: `
		<div class="toast-container">
			@for (toast of toastService.toasts(); track toast.id) {
				<div class="toast" [class.toast-success]="toast.type === 'success'" [class.toast-error]="toast.type === 'error'">
					<span class="material-icons">
						{{ toast.type === "success" ? "check_circle" : "error" }}
					</span>
					<span class="toast-message">{{ toast.message }}</span>
					<button class="toast-close" (click)="toastService.remove(toast.id)">
						<span class="material-icons">close</span>
					</button>
				</div>
			}
		</div>
	`,
	styles: [`
		.toast-container {
			position: fixed;
			bottom: 24px;
			right: 24px;
			display: flex;
			flex-direction: column;
			gap: 12px;
			z-index: 9999;
		}

		.toast {
			display: flex;
			align-items: center;
			gap: 12px;
			padding: 12px 16px;
			border-radius: 8px;
			color: white;
			min-width: 300px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
			animation: slideIn 0.3s ease-out;
		}

		.toast-success {
			background-color: #10b981; /* Green */
		}

		.toast-error {
			background-color: #ef4444; /* Red */
		}

		.toast-message {
			flex: 1;
			font-size: 0.9rem;
			font-weight: 500;
		}

		.toast-close {
			background: none;
			border: none;
			color: white;
			cursor: pointer;
			opacity: 0.7;
			display: flex;
			padding: 0;
		}

		.toast-close:hover {
			opacity: 1;
		}

		.toast-close .material-icons {
			font-size: 18px;
		}

		@keyframes slideIn {
			from {
				transform: translateX(100%);
				opacity: 0;
			}
			to {
				transform: translateX(0);
				opacity: 1;
			}
		}
	`],
	standalone: false
})
export class ToastComponent {
	public readonly toastService = inject(ToastService);
}
