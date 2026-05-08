import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse, User, UserCredentials, UserCreate } from "../types";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.auth}`;

	private readonly _user = signal<User | null>(this.getStoredUser());
	public readonly currentUser = this._user.asReadonly();

	public login(credentials: UserCredentials): Observable<ApiResponse<User>> {
		return this.http.post<ApiResponse<User>>(`${this.apiUrl}/login`, credentials).pipe(
			tap((response) => {
				if (response.status === "success" && response.data) {
					this.saveUser(response.data);
				}
			})
		);
	}

	public register(userData: UserCreate): Observable<ApiResponse<User>> {
		return this.http.post<ApiResponse<User>>(`${this.apiUrl}/register`, userData).pipe(
			tap((response) => {
				if (response.status === "success" && response.data) {
					this.saveUser(response.data);
				}
			})
		);
	}

	private readonly router = inject(Router);

	public logout(): void {
		localStorage.removeItem("jwt");
		this.router.navigate(["/auth"]);
	}

	public getToken(): string | null {
		return localStorage.getItem("jwt");
	}

	public isAuthenticated(): boolean {
		return !!this.getToken();
	}

	private saveUser(user: User): void {
		localStorage.setItem("jwt", user.jwt);
		localStorage.setItem("user", JSON.stringify(user));
		this._user.set(user);
	}

	private getStoredUser(): User | null {
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	}
}
