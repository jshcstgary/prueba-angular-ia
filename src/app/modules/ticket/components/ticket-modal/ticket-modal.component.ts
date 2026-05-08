import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TicketService } from "../../../../services/ticket.service";
import { UserService } from "../../../../services/user.service";
import { AuthService } from "../../../../services/auth.service";
import { ToastService } from "../../../../services/toast.service";
import { TicketPriority, User, Ticket } from "../../../../types";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
	selector: "app-ticket-modal",
	templateUrl: "./ticket-modal.component.html",
	styles: [`
		.modal-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.7);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 1000;
			backdrop-filter: blur(4px);
		}

		.modal-content {
			background: #282c4d;
			width: 100%;
			max-width: 500px;
			border-radius: 16px;
			box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
			overflow: hidden;
			animation: modalAppear 0.3s ease-out;
		}

		@keyframes modalAppear {
			from { transform: translateY(20px); opacity: 0; }
			to { transform: translateY(0); opacity: 1; }
		}

		.modal-header {
			padding: 20px 24px;
			background: #3c3f68;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.modal-body {
			padding: 24px;
		}

		.modal-footer {
			padding: 16px 24px;
			background: #1c1f3b;
			display: flex;
			justify-content: flex-end;
			gap: 12px;
		}

		.form-group {
			margin-bottom: 20px;
		}

		.form-group label {
			display: block;
			margin-bottom: 8px;
			color: #606271;
			font-size: 0.85rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		.form-control {
			width: 100%;
			background: #1c1f3b;
			border: 1px solid #3c3f68;
			border-radius: 8px;
			padding: 12px;
			color: white;
			outline: none;
			transition: border-color 0.2s;
		}

		.form-control:focus {
			border-color: #4d4d80;
		}

		.btn-cancel {
			background: transparent;
			border: 1px solid #3c3f68;
			color: #606271;
			padding: 8px 20px;
			border-radius: 8px;
			cursor: pointer;
			transition: all 0.2s;
		}

		.btn-cancel:hover {
			background: rgba(60, 63, 104, 0.3);
			color: white;
		}
	`],
	standalone: false
})
export class TicketModalComponent implements OnInit {
	@Input() ticket: Ticket | null = null;
	@Input() isViewOnly = false;
	@Output() closed = new EventEmitter<boolean>();

	private readonly fb = inject(FormBuilder);
	private readonly ticketService = inject(TicketService);
	private readonly userService = inject(UserService);
	private readonly authService = inject(AuthService);
	private readonly toastService = inject(ToastService);

	public supportUsers = toSignal(this.userService.getSupportUsers(), {
		initialValue: undefined
	});

	public priorities: TicketPriority[] = ["High", "Medium", "Low"];

	public ticketForm = this.fb.nonNullable.group({
		title: ["", [Validators.required]],
		description: ["", [Validators.required]],
		priority: ["Medium" as TicketPriority, [Validators.required]],
		assignedToId: [0, [Validators.required, Validators.min(1)]]
	});

	public ngOnInit(): void {
		if (this.ticket) {
			this.ticketForm.patchValue({
				title: this.ticket.title,
				description: this.ticket.description,
				priority: this.ticket.priority,
				assignedToId: this.ticket.assignedTo.id
			});

			if (this.isViewOnly) {
				this.ticketForm.disable();
			}
		}
	}

	public isSubmitting = signal(false);

	public onSave(): void {
		if (this.ticketForm.valid) {
			this.isSubmitting.set(true);
			const currentUser = this.authService.currentUser();
			
			if (!currentUser) {
				this.toastService.show("Error: No se pudo obtener el usuario actual");
				return;
			}

			const payload = {
				...this.ticketForm.getRawValue(),
				userId: currentUser.id
			};

			this.ticketService.create(payload).subscribe({
				next: (response) => {
					if (response.status === "success") {
						this.toastService.show("Ticket creado correctamente");
						this.closed.emit(true);
					} else {
						this.toastService.show(response.status);
					}
					this.isSubmitting.set(false);
				},
				error: (err) => {
					this.toastService.show("Error: No se pudo crear el ticket");
					this.isSubmitting.set(false);
				}
			});
		}
	}

	public onCancel(): void {
		this.closed.emit(false);
	}
}
