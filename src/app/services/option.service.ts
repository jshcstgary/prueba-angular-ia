import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse, Option, OptionCreate, OptionUpdate } from "../types";

@Injectable({
	providedIn: "root"
})
export class OptionService {
	private readonly apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.option}`;

	constructor(private readonly http: HttpClient) {}

	getAll(): Observable<ApiResponse<Option[]>> {
		return this.http.get<ApiResponse<Option[]>>(this.apiUrl);
	}

	getById(id: number): Observable<ApiResponse<Option>> {
		return this.http.get<ApiResponse<Option>>(`${this.apiUrl}/${id}`);
	}

	create(data: OptionCreate): Observable<ApiResponse<Option>> {
		return this.http.post<ApiResponse<Option>>(this.apiUrl, data);
	}

	update(data: OptionUpdate): Observable<ApiResponse<Option>> {
		return this.http.put<ApiResponse<Option>>(`${this.apiUrl}/${data.id}`, data);
	}

	delete(id: number): Observable<ApiResponse<boolean>> {
		return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
	}
}
