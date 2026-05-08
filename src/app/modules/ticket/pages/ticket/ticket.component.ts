import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { TicketService } from "../../../../services/ticket.service";
import { AuthService } from "../../../../services/auth.service";
import { ToastService } from "../../../../services/toast.service";
import { Ticket, TicketStatus } from "../../../../types";

@Component({
	selector: "app-ticket",
	templateUrl: "./ticket.component.html",
	standalone: false
})
export class TicketComponent {
	private readonly ticketService = inject(TicketService);
	private readonly authService = inject(AuthService);
	private readonly toastService = inject(ToastService);

	public readonly currentUser = this.authService.currentUser;

	public readonly isSupport = computed(() => this.currentUser()?.profile.name === "Support");

	public tickets = toSignal(
		this.isSupport() 
			? this.ticketService.getAll(this.currentUser()?.id) 
			: this.ticketService.getAll(),
		{ initialValue: undefined }
	);

	public showModal = signal(false);
	public selectedTicket = signal<Ticket | null>(null);
	public isViewOnly = signal(false);

	public priorityLabels: Record<string, string> = {
		High: "ALTA",
		Medium: "MEDIA",
		Low: "BAJA"
	};

	public statusLabels: Record<string, string> = {
		OPEN: "ABIERTO",
		IN_PROGRESS: "EN PROGRESO",
		RESOLVED: "RESUELTO",
		REJECTED: "RECHAZADO"
	};

	public openModal(): void {
		this.selectedTicket.set(null);
		this.isViewOnly.set(false);
		this.showModal.set(true);
	}

	public onView(ticket: Ticket): void {
		this.selectedTicket.set(ticket);
		this.isViewOnly.set(true);
		this.showModal.set(true);
	}

	public onApprove(ticket: Ticket): void {
		this.updateStatus(ticket, "RESOLVED", "Ticket aprobado");
	}

	public onReject(ticket: Ticket): void {
		this.updateStatus(ticket, "REJECTED", "Ticket rechazado");
	}

	private updateStatus(ticket: Ticket, status: TicketStatus, successMessage: string): void {
		const updatedTicket = { ...ticket, status };
		this.ticketService.update(updatedTicket).subscribe({
			next: (response) => {
				if (response.status === "success") {
					this.toastService.show(successMessage);
					location.reload();
				} else {
					this.toastService.show(response.status);
				}
			},
			error: () => this.toastService.show("Error: No se pudo actualizar el ticket")
		});
	}

	public onModalClosed(success: boolean): void {
		this.showModal.set(false);
		this.selectedTicket.set(null);
		if (success) {
			location.reload();
		}
	}
}
