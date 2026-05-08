import { ComponentFixture, TestBed } from "@angular/core/testing";
import { OptionComponent } from "./option.component";
import { OptionService } from "../../../../services/option.service";
import { of } from "rxjs";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("OptionComponent", () => {
	let component: OptionComponent;
	let fixture: ComponentFixture<OptionComponent>;
	let optionServiceMock: any;

	beforeEach(async () => {
		optionServiceMock = {
			getAll: vi.fn().mockReturnValue(of({ status: "success", data: [] }))
		};

		await TestBed.configureTestingModule({
			declarations: [OptionComponent],
			providers: [
				{ provide: OptionService, useValue: optionServiceMock }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(OptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should open modal", () => {
		component.openModal();
		expect(component.showModal()).toBe(true);
		expect(component.selectedOption()).toBeNull();
	});

	it("should handle modal closure", () => {
		const reloadSpy = vi.spyOn(window.location, "reload").mockImplementation(() => {});
		component.onModalClosed(true);
		expect(component.showModal()).toBe(false);
		expect(reloadSpy).toHaveBeenCalled();
		reloadSpy.mockRestore();
	});
});
