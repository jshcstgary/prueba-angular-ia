import { Component, inject, signal } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { ToastService } from "../../../../services/toast.service";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
	standalone: false
})
export class AuthComponent {
	private readonly fb = inject(FormBuilder);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);
	private readonly toastService = inject(ToastService);

	public activeTab = signal<"signin" | "signup">("signin");

	public loginForm = this.fb.nonNullable.group({
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(6)]]
	});

	public registerForm = this.fb.nonNullable.group({
		name: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(6)]]
	});

	public setTab(tab: "signin" | "signup"): void {
		this.activeTab.set(tab);
	}

	public onLogin(): void {
		if (this.loginForm.valid) {
			this.authService.login(this.loginForm.getRawValue()).subscribe({
				next: (response) => {
					if (response.status === "success") {
						this.toastService.show("Bienvenido de nuevo");
						this.router.navigate(["/modules"]);
					} else {
						this.toastService.show(response.status);
					}
				},
				error: (err) => {
					this.toastService.show("Error: Credenciales inválidas");
				}
			});
		}
	}

	public onRegister(): void {
		if (this.registerForm.valid) {
			this.authService.register(this.registerForm.getRawValue()).subscribe({
				next: (response) => {
					if (response.status === "success") {
						this.toastService.show("Registro exitoso");
						this.router.navigate(["/modules"]);
					} else {
						this.toastService.show(response.status);
					}
				},
				error: (err) => {
					this.toastService.show("Error: No se pudo completar el registro");
				}
			});
		}
	}
}
