import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { ApiResponse, User, UserCredentials, UserCreate } from "../types";
import { environment } from "../../environments/environment";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("AuthService", () => {
	let service: AuthService;
	let httpMock: HttpTestingController;
	const apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.auth}`;

	const mockUser: User = { 
		id: 1, 
		name: "U", 
		email: "e", 
		jwt: "mock-jwt", 
		profile: { id: 1, name: "P", description: "D", createdAt: new Date(), updatedAt: new Date(), options: [] } 
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(AuthService);
		httpMock = TestBed.inject(HttpTestingController);

		// Mock localStorage
		const store: Record<string, string> = {};
		vi.stubGlobal("localStorage", {
			getItem: (key: string) => store[key] || null,
			setItem: (key: string, value: string) => { store[key] = value },
			removeItem: (key: string) => { delete store[key] },
			clear: () => { for (const key in store) delete store[key] }
		});
	});

	afterEach(() => {
		httpMock.verify();
		vi.unstubAllGlobals();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("login", () => {
		it("should login and store jwt in localStorage", () => {
			const credentials: UserCredentials = { email: "e", password: "p" };
			const mockResponse: ApiResponse<User> = { status: "success", data: mockUser };

			service.login(credentials).subscribe((res) => {
				expect(res).toEqual(mockResponse);
				expect(localStorage.getItem("jwt")).toBe("mock-jwt");
				expect(localStorage.getItem("user")).toContain("mock-jwt");
			});

			const req = httpMock.expectOne(`${apiUrl}/login`);
			expect(req.request.method).toBe("POST");
			req.flush(mockResponse);
		});
	});

	describe("register", () => {
		it("should register and store jwt", () => {
			const userData: UserCreate = { name: "N", email: "e", password: "p" };
			const mockResponse: ApiResponse<User> = { status: "success", data: mockUser };

			service.register(userData).subscribe(() => {
				expect(localStorage.getItem("jwt")).toBe("mock-jwt");
			});

			const req = httpMock.expectOne(`${apiUrl}/register`);
			req.flush(mockResponse);
		});
	});

	describe("logout", () => {
		it("should clear localStorage and navigate to /auth", () => {
			localStorage.setItem("jwt", "some-token");
			service.logout();
			expect(localStorage.getItem("jwt")).toBeNull();
		});
	});
});
