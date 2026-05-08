import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AuthService } from "../../../../services/auth.service";
import { ToastService } from "../../../../services/toast.service";
import { of, throwError } from "rxjs";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("AuthComponent", () => {
	let component: AuthComponent;
	let fixture: ComponentFixture<AuthComponent>;
	let authServiceMock: any;
	let routerMock: any;
	let toastServiceMock: any;

	beforeEach(async () => {
		authServiceMock = {
			login: vi.fn(),
			register: vi.fn()
		};

		routerMock = {
			navigate: vi.fn()
		};

		toastServiceMock = {
			show: vi.fn()
		};

		await TestBed.configureTestingModule({
			declarations: [AuthComponent],
			imports: [ReactiveFormsModule],
			providers: [
				{ provide: AuthService, useValue: authServiceMock },
				{ provide: Router, useValue: routerMock },
				{ provide: ToastService, useValue: toastServiceMock }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(AuthComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should switch tabs", () => {
		component.setTab("signup");
		expect(component.activeTab()).toBe("signup");
		component.setTab("signin");
		expect(component.activeTab()).toBe("signin");
	});

	it("should call login on onLogin if valid", () => {
		authServiceMock.login.mockReturnValue(of({ status: "success", data: {} }));
		component.loginForm.patchValue({ email: "test@test.com", password: "password123" });
		
		component.onLogin();
		
		expect(authServiceMock.login).toHaveBeenCalled();
		expect(toastServiceMock.show).toHaveBeenCalledWith("Bienvenido de nuevo");
		expect(routerMock.navigate).toHaveBeenCalledWith(["/tickets"]);
	});

	it("should show error toast on login failure", () => {
		authServiceMock.login.mockReturnValue(throwError(() => new Error("Error")));
		component.loginForm.patchValue({ email: "test@test.com", password: "password123" });
		
		component.onLogin();
		
		expect(toastServiceMock.show).toHaveBeenCalledWith("Error: Credenciales inválidas");
	});

	it("should call register on onRegister if valid", () => {
		authServiceMock.register.mockReturnValue(of({ status: "success", data: {} }));
		component.registerForm.patchValue({ name: "User", email: "test@test.com", password: "password123" });
		
		component.onRegister();
		
		expect(authServiceMock.register).toHaveBeenCalled();
		expect(toastServiceMock.show).toHaveBeenCalledWith("Registro exitoso");
		expect(routerMock.navigate).toHaveBeenCalledWith(["/tickets"]);
	});
});
