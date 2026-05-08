import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse, Profile, ProfileCreate, ProfileUpdate } from "../types";

@Injectable({
	providedIn: "root"
})
export class ProfileService {
	private readonly apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.profile}`;

	constructor(private readonly http: HttpClient) {}

	getAll(): Observable<ApiResponse<Profile[]>> {
		return this.http.get<ApiResponse<Profile[]>>(this.apiUrl);
	}

	getById(id: number): Observable<ApiResponse<Profile>> {
		return this.http.get<ApiResponse<Profile>>(`${this.apiUrl}/${id}`);
	}

	create(data: ProfileCreate): Observable<ApiResponse<Profile>> {
		return this.http.post<ApiResponse<Profile>>(this.apiUrl, data);
	}

	update(data: ProfileUpdate): Observable<ApiResponse<Profile>> {
		return this.http.put<ApiResponse<Profile>>(`${this.apiUrl}/${data.id}`, data);
	}

	delete(id: number): Observable<ApiResponse<boolean>> {
		return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
	}
}
