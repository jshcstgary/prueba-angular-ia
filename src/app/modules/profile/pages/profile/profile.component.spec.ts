import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProfileComponent } from "./profile.component";
import { ProfileService } from "../../../../services/profile.service";
import { of } from "rxjs";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("ProfileComponent", () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;
	let profileServiceMock: any;

	beforeEach(async () => {
		profileServiceMock = {
			getAll: vi.fn().mockReturnValue(of({ status: "success", data: [] }))
		};

		await TestBed.configureTestingModule({
			declarations: [ProfileComponent],
			providers: [
				{ provide: ProfileService, useValue: profileServiceMock }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should open modal", () => {
		component.openModal();
		expect(component.showModal()).toBe(true);
		expect(component.selectedProfile()).toBeNull();
	});

	it("should handle modal closure", () => {
		const reloadSpy = vi.spyOn(window.location, "reload").mockImplementation(() => {});
		component.onModalClosed(true);
		expect(component.showModal()).toBe(false);
		expect(reloadSpy).toHaveBeenCalled();
		reloadSpy.mockRestore();
	});
});
