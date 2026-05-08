import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TicketComponent } from "./ticket.component";
import { TicketService } from "../../../../services/ticket.service";
import { AuthService } from "../../../../services/auth.service";
import { ToastService } from "../../../../services/toast.service";
import { of } from "rxjs";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Ticket, ApiResponse } from "../../../../types";

describe("TicketComponent", () => {
	let component: TicketComponent;
	let fixture: ComponentFixture<TicketComponent>;
	let ticketServiceMock: any;
	let authServiceMock: any;
	let toastServiceMock: any;

	const mockUser = { id: 1, name: "Admin", email: "admin@test.com", profile: { name: "Admin" } };
	const mockTicket: Ticket = {
		id: 1,
		title: "Test",
		description: "Test Desc",
		status: "OPEN",
		priority: "Medium",
		createdAt: new Date(),
		updatedAt: new Date(),
		user: mockUser as any,
		assignedTo: mockUser as any
	};

	beforeEach(async () => {
		ticketServiceMock = {
			getAll: vi.fn().mockReturnValue(of({ status: "success", data: [mockTicket] })),
			update: vi.fn().mockReturnValue(of({ status: "success", data: mockTicket }))
		};

		authServiceMock = {
			currentUser: vi.fn().mockReturnValue(mockUser)
		};

		toastServiceMock = {
			show: vi.fn()
		};

		await TestBed.configureTestingModule({
			declarations: [TicketComponent],
			providers: [
				{ provide: TicketService, useValue: ticketServiceMock },
				{ provide: AuthService, useValue: authServiceMock },
				{ provide: ToastService, useValue: toastServiceMock }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(TicketComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should open modal for new ticket", () => {
		component.openModal();
		expect(component.showModal()).toBe(true);
		expect(component.selectedTicket()).toBeNull();
		expect(component.isViewOnly()).toBe(false);
	});

	it("should open modal in view mode", () => {
		component.onView(mockTicket);
		expect(component.showModal()).toBe(true);
		expect(component.selectedTicket()).toEqual(mockTicket);
		expect(component.isViewOnly()).toBe(true);
	});

	it("should approve a ticket", () => {
		// Mock location.reload
		const reloadSpy = vi.spyOn(window.location, "reload").mockImplementation(() => {});
		
		component.onApprove(mockTicket);
		
		expect(ticketServiceMock.update).toHaveBeenCalled();
		expect(toastServiceMock.show).toHaveBeenCalledWith("Ticket aprobado");
		
		reloadSpy.mockRestore();
	});

	it("should reject a ticket", () => {
		const reloadSpy = vi.spyOn(window.location, "reload").mockImplementation(() => {});
		
		component.onReject(mockTicket);
		
		expect(ticketServiceMock.update).toHaveBeenCalled();
		expect(toastServiceMock.show).toHaveBeenCalledWith("Ticket rechazado");
		
		reloadSpy.mockRestore();
	});

	it("should handle modal closure", () => {
		const reloadSpy = vi.spyOn(window.location, "reload").mockImplementation(() => {});
		
		component.onModalClosed(true);
		
		expect(component.showModal()).toBe(false);
		expect(component.selectedTicket()).toBeNull();
		
		reloadSpy.mockRestore();
	});
});
