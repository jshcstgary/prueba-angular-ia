import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { ProfileService } from "./profile.service";
import { ApiResponse, Profile, ProfileCreate, ProfileUpdate } from "../types";
import { environment } from "../../environments/environment";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("ProfileService", () => {
	let service: ProfileService;
	let httpMock: HttpTestingController;
	const apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.profile}`;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ProfileService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(ProfileService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getAll", () => {
		it("should return a list of profiles", () => {
			const mockResponse: ApiResponse<Profile[]> = {
				status: "success",
				data: [{ id: 1, name: "Admin", description: "D", createdAt: new Date(), updatedAt: new Date(), options: [] }]
			};

			service.getAll().subscribe((response) => {
				// We expect the dates to be strings after JSON serialization
				expect(response.status).toBe(mockResponse.status);
				expect(response.data[0].id).toBe(mockResponse.data[0].id);
				expect(response.data[0].name).toBe(mockResponse.data[0].name);
			});

			const req = httpMock.expectOne(apiUrl);
			expect(req.request.method).toBe("GET");
			req.flush(mockResponse);
		});
	});

	describe("create", () => {
		it("should create a profile", () => {
			const newProfile: ProfileCreate = { name: "New", description: "D", optionIds: [1] };
			const mockResponse: ApiResponse<Profile> = {
				status: "success",
				data: { id: 2, name: "New", description: "D", createdAt: new Date(), updatedAt: new Date(), options: [] }
			};

			service.create(newProfile).subscribe((response) => {
				expect(response.status).toBe("success");
				expect(response.data.id).toBe(2);
			});

			const req = httpMock.expectOne(apiUrl);
			expect(req.request.method).toBe("POST");
			req.flush(mockResponse);
		});
	});

	describe("update", () => {
		it("should update a profile", () => {
			const updateData: ProfileUpdate = { id: 1, name: "Upd", description: "D", createdAt: new Date(), updatedAt: new Date(), optionIds: [1] };
			const mockResponse: ApiResponse<Profile> = {
				status: "success",
				data: { id: 1, name: "Upd", description: "D", createdAt: new Date(), updatedAt: new Date(), options: [] }
			};

			service.update(updateData).subscribe((response) => {
				expect(response.status).toBe("success");
				expect(response.data.name).toBe("Upd");
			});

			const req = httpMock.expectOne(`${apiUrl}/1`);
			expect(req.request.method).toBe("PUT");
			req.flush(mockResponse);
		});
	});

	describe("delete", () => {
		it("should delete a profile", () => {
			const mockResponse: ApiResponse<boolean> = { status: "success", data: true };

			service.delete(1).subscribe((res) => expect(res.data).toBe(true));

			const req = httpMock.expectOne(`${apiUrl}/1`);
			expect(req.request.method).toBe("DELETE");
			req.flush(mockResponse);
		});
	});
});
