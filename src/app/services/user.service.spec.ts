import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { ApiResponse, User } from "../types";
import { environment } from "../../environments/environment";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("UserService", () => {
	let service: UserService;
	let httpMock: HttpTestingController;
	const apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.user}`;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UserService, provideHttpClient(), provideHttpClientTesting()]
		});
		service = TestBed.inject(UserService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("getAll", () => {
		it("should return users", () => {
			const mockResponse: ApiResponse<User[]> = { status: "success", data: [] };
			service.getAll().subscribe((res) => expect(res).toEqual(mockResponse));
			const req = httpMock.expectOne(apiUrl);
			req.flush(mockResponse);
		});

		it("should filter by profileId", () => {
			service.getAll(2).subscribe();
			const req = httpMock.expectOne(`${apiUrl}?profileId=2`);
			req.flush({ status: "success", data: [] });
		});
	});

	describe("getSupportUsers", () => {
		it("should call getAll with profileId 2", () => {
			service.getSupportUsers().subscribe();
			const req = httpMock.expectOne(`${apiUrl}?profileId=2`);
			req.flush({ status: "success", data: [] });
		});
	});
});
