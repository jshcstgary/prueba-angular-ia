import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse, Module, ModuleCreate, ModuleUpdate } from "../types";

@Injectable({
	providedIn: "root"
})
export class ModuleService {
	private readonly apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.module}`;

	constructor(private readonly http: HttpClient) {}

	getAll(): Observable<ApiResponse<Module[]>> {
		return this.http.get<ApiResponse<Module[]>>(this.apiUrl);
	}

	getById(id: number): Observable<ApiResponse<Module>> {
		return this.http.get<ApiResponse<Module>>(`${this.apiUrl}/${id}`);
	}

	create(data: ModuleCreate): Observable<ApiResponse<Module>> {
		return this.http.post<ApiResponse<Module>>(this.apiUrl, data);
	}

	update(data: ModuleUpdate): Observable<ApiResponse<Module>> {
		return this.http.put<ApiResponse<Module>>(`${this.apiUrl}/${data.id}`, data);
	}

	delete(id: number): Observable<ApiResponse<boolean>> {
		return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
	}
}
