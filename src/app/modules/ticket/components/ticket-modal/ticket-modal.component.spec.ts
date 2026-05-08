import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { TicketModalComponent } from "./ticket-modal.component";
import { TicketService } from "../../../../services/ticket.service";
import { UserService } from "../../../../services/user.service";
import { AuthService } from "../../../../services/auth.service";
import { ToastService } from "../../../../services/toast.service";
import { of } from "rxjs";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("TicketModalComponent", () => {
	let component: TicketModalComponent;
	let fixture: ComponentFixture<TicketModalComponent>;
	let ticketServiceMock: any;
	let userServiceMock: any;
	let authServiceMock: any;
	let toastServiceMock: any;

	beforeEach(async () => {
		ticketServiceMock = {
			create: vi.fn().mockReturnValue(of({ status: "success", data: {} }))
		};

		userServiceMock = {
			getSupportUsers: vi.fn().mockReturnValue(of({ status: "success", data: [] }))
		};

		authServiceMock = {
			currentUser: vi.fn().mockReturnValue({ id: 1, name: "User" })
		};

		toastServiceMock = {
			show: vi.fn()
		};

		await TestBed.configureTestingModule({
			declarations: [TicketModalComponent],
			imports: [ReactiveFormsModule],
			providers: [
				{ provide: TicketService, useValue: ticketServiceMock },
				{ provide: UserService, useValue: userServiceMock },
				{ provide: AuthService, useValue: authServiceMock },
				{ provide: ToastService, useValue: toastServiceMock }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(TicketModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should initialize form with ticket data if provided", () => {
		const mockTicket = {
			id: 1,
			title: "T",
			description: "D",
			priority: "High",
			assignedTo: { id: 2 }
		} as any;
		
		component.ticket = mockTicket;
		component.ngOnInit();
		
		expect(component.ticketForm.value.title).toBe("T");
		expect(component.ticketForm.value.priority).toBe("High");
	});

	it("should disable form if isViewOnly is true", () => {
		component.ticket = { id: 1, title: "T", assignedTo: { id: 2 } } as any;
		component.isViewOnly = true;
		component.ngOnInit();
		
		expect(component.ticketForm.disabled).toBe(true);
	});

	it("should call create on onSave if valid", () => {
		component.ticketForm.patchValue({
			title: "New",
			description: "Desc",
			priority: "Low",
			assignedToId: 2
		});
		
		component.onSave();
		
		expect(ticketServiceMock.create).toHaveBeenCalled();
		expect(toastServiceMock.show).toHaveBeenCalledWith("Ticket creado correctamente");
	});

	it("should emit closed on onCancel", () => {
		const emitSpy = vi.spyOn(component.closed, "emit");
		component.onCancel();
		expect(emitSpy).toHaveBeenCalledWith(false);
	});
});
