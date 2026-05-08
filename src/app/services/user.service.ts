import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse, User } from "../types";

@Injectable({
	providedIn: "root"
})
export class UserService {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.user}`;

	public getAll(profileId?: number): Observable<ApiResponse<User[]>> {
		const url = profileId ? `${this.apiUrl}?profileId=${profileId}` : this.apiUrl;
		return this.http.get<ApiResponse<User[]>>(url);
	}

	public getSupportUsers(): Observable<ApiResponse<User[]>> {
		// Supposing Profile Support ID is 2
		return this.getAll(2);
	}
}
