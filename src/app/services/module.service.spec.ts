import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { ModuleService } from "./module.service";
import { ApiResponse, Module, ModuleCreate, ModuleUpdate } from "../types";
import { environment } from "../../environments/environment";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("ModuleService", () => {
	let service: ModuleService;
	let httpMock: HttpTestingController;
	const apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.module}`;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ModuleService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(ModuleService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getAll", () => {
		it("should return a list of modules on success", () => {
			const mockResponse: ApiResponse<Module[]> = {
				status: "success",
				data: [{ id: 1, name: "Test", description: "Desc", active: true }]
			};

			service.getAll().subscribe((response) => {
				expect(response).toEqual(mockResponse);
			});

			const req = httpMock.expectOne(apiUrl);
			expect(req.request.method).toBe("GET");
			req.flush(mockResponse);
		});

		it("should handle error on failure", () => {
			service.getAll().subscribe({
				error: (error) => {
					expect(error.status).toBe(500);
				}
			});

			const req = httpMock.expectOne(apiUrl);
			req.flush("Error", { status: 500, statusText: "Server Error" });
		});
	});

	describe("getById", () => {
		it("should return a module by id", () => {
			const mockResponse: ApiResponse<Module> = {
				status: "success",
				data: { id: 1, name: "Test", description: "Desc", active: true }
			};

			service.getById(1).subscribe((response) => {
				expect(response).toEqual(mockResponse);
			});

			const req = httpMock.expectOne(`${apiUrl}/1`);
			expect(req.request.method).toBe("GET");
			req.flush(mockResponse);
		});
	});

	describe("create", () => {
		it("should create a new module", () => {
			const newModule: ModuleCreate = { name: "New", description: "New Desc" };
			const mockResponse: ApiResponse<Module> = {
				status: "success",
				data: { id: 2, ...newModule, active: true }
			};

			service.create(newModule).subscribe((response) => {
				expect(response).toEqual(mockResponse);
			});

			const req = httpMock.expectOne(apiUrl);
			expect(req.request.method).toBe("POST");
			expect(req.request.body).toEqual(newModule);
			req.flush(mockResponse);
		});
	});

	describe("update", () => {
		it("should update an existing module", () => {
			const updateData: ModuleUpdate = { id: 1, name: "Updated", description: "Updated Desc", active: false };
			const mockResponse: ApiResponse<Module> = {
				status: "success",
				data: updateData
			};

			service.update(updateData).subscribe((response) => {
				expect(response).toEqual(mockResponse);
			});

			const req = httpMock.expectOne(`${apiUrl}/1`);
			expect(req.request.method).toBe("PUT");
			expect(req.request.body).toEqual(updateData);
			req.flush(mockResponse);
		});
	});

	describe("delete", () => {
		it("should delete a module", () => {
			const mockResponse: ApiResponse<boolean> = {
				status: "success",
				data: true
			};

			service.delete(1).subscribe((response) => {
				expect(response).toEqual(mockResponse);
			});

			const req = httpMock.expectOne(`${apiUrl}/1`);
			expect(req.request.method).toBe("DELETE");
			req.flush(mockResponse);
		});
	});
});
