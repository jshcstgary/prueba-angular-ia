import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ModuleComponent } from "./module.component";
import { ModuleService } from "../../../../services/module.service";
import { of } from "rxjs";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("ModuleComponent", () => {
	let component: ModuleComponent;
	let fixture: ComponentFixture<ModuleComponent>;
	let moduleServiceMock: any;

	beforeEach(async () => {
		moduleServiceMock = {
			getAll: vi.fn().mockReturnValue(of({ status: "success", data: [] }))
		};

		await TestBed.configureTestingModule({
			declarations: [ModuleComponent],
			providers: [
				{ provide: ModuleService, useValue: moduleServiceMock }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ModuleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should open modal", () => {
		component.openModal();
		expect(component.showModal()).toBe(true);
		expect(component.selectedModule()).toBeNull();
	});

	it("should open modal with module for editing", () => {
		const mockModule = { id: 1, name: "Mod" } as any;
		component.openModal(mockModule);
		expect(component.showModal()).toBe(true);
		expect(component.selectedModule()).toEqual(mockModule);
	});

	it("should handle modal closure", () => {
		const reloadSpy = vi.spyOn(window.location, "reload").mockImplementation(() => {});
		
		component.onModalClosed(true);
		
		expect(component.showModal()).toBe(false);
		expect(reloadSpy).toHaveBeenCalled();
		
		reloadSpy.mockRestore();
	});
});
