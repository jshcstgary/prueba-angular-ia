import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { OptionService } from "./option.service";
import { ApiResponse, Option, OptionCreate, OptionUpdate } from "../types";
import { environment } from "../../environments/environment";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("OptionService", () => {
	let service: OptionService;
	let httpMock: HttpTestingController;
	const apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.option}`;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [OptionService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(OptionService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getAll", () => {
		it("should return a list of options on success", () => {
			const mockResponse: ApiResponse<Option[]> = {
				status: "success",
				data: [{ id: 1, name: "Opt", path: "/opt", icon: "home", module: { id: 1, name: "Mod", description: "D", active: true } }]
			};

			service.getAll().subscribe((response) => {
				expect(response).toEqual(mockResponse);
			});

			const req = httpMock.expectOne(apiUrl);
			expect(req.request.method).toBe("GET");
			req.flush(mockResponse);
		});
	});

	describe("create", () => {
		it("should create a new option", () => {
			const newOption: OptionCreate = { name: "New", path: "/new", icon: "add", moduleId: 1 };
			const mockResponse: ApiResponse<Option> = {
				status: "success",
				data: { id: 2, name: "New", path: "/new", icon: "add", module: { id: 1, name: "Mod", description: "D", active: true } }
			};

			service.create(newOption).subscribe((response) => {
				expect(response).toEqual(mockResponse);
			});

			const req = httpMock.expectOne(apiUrl);
			expect(req.request.method).toBe("POST");
			req.flush(mockResponse);
		});
	});

	describe("update", () => {
		it("should update an existing option", () => {
			const updateData: OptionUpdate = { id: 1, name: "Upd", path: "/upd", icon: "edit", moduleId: 1 };
			const mockResponse: ApiResponse<Option> = {
				status: "success",
				data: { id: 1, name: "Upd", path: "/upd", icon: "edit", module: { id: 1, name: "Mod", description: "D", active: true } }
			};

			service.update(updateData).subscribe((response) => {
				expect(response).toEqual(mockResponse);
			});

			const req = httpMock.expectOne(`${apiUrl}/1`);
			expect(req.request.method).toBe("PUT");
			req.flush(mockResponse);
		});
	});

	describe("delete", () => {
		it("should delete an option", () => {
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
