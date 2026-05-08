import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { TicketService } from "./ticket.service";
import { ApiResponse, Ticket, TicketCreate, TicketUpdate, User } from "../types";
import { environment } from "../../environments/environment";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("TicketService", () => {
	let service: TicketService;
	let httpMock: HttpTestingController;
	const apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.ticket}`;

	const mockUser: User = { id: 1, name: "U", email: "e", jwt: "j", profile: { id: 1, name: "P", description: "D", createdAt: new Date(), updatedAt: new Date(), options: [] } };

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TicketService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(TicketService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getAll", () => {
		it("should return tickets", () => {
			const mockResponse: ApiResponse<Ticket[]> = {
				status: "success",
				data: [{ id: 1, title: "T", description: "D", status: "OPEN", priority: "High", createdAt: new Date(), updatedAt: new Date(), user: mockUser, assignedTo: mockUser }]
			};

			service.getAll().subscribe((res) => expect(res).toEqual(mockResponse));

			const req = httpMock.expectOne(apiUrl);
			expect(req.request.method).toBe("GET");
			req.flush(mockResponse);
		});

		it("should filter by assignedToId", () => {
			service.getAll(1).subscribe();
			const req = httpMock.expectOne(`${apiUrl}?assignedToId=1`);
			expect(req.request.method).toBe("GET");
			req.flush({ status: "success", data: [] });
		});
	});

	describe("create", () => {
		it("should create a ticket", () => {
			const newTicket: TicketCreate = { title: "T", description: "D", priority: "High", userId: 1, assignedToId: 2 };
			service.create(newTicket).subscribe();
			const req = httpMock.expectOne(apiUrl);
			expect(req.request.method).toBe("POST");
			req.flush({ status: "success", data: {} });
		});
	});

	describe("update", () => {
		it("should update a ticket", () => {
			const ticket: TicketUpdate = { id: 1, title: "T", description: "D", status: "OPEN", priority: "High", createdAt: new Date(), updatedAt: new Date(), user: mockUser, assignedTo: mockUser };
			service.update(ticket).subscribe();
			const req = httpMock.expectOne(`${apiUrl}/1`);
			expect(req.request.method).toBe("PUT");
			req.flush({ status: "success", data: ticket });
		});
	});

	describe("delete", () => {
		it("should delete a ticket", () => {
			service.delete(1).subscribe();
			const req = httpMock.expectOne(`${apiUrl}/1`);
			expect(req.request.method).toBe("DELETE");
			req.flush({ status: "success", data: true });
		});
	});
});
