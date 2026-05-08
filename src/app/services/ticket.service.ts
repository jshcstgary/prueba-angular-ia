import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ApiResponse, Ticket, TicketCreate, TicketUpdate } from "../types";

@Injectable({
	providedIn: "root"
})
export class TicketService {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = `${environment.baseUrl}${environment.urlPrefix}${environment.path.ticket}`;

	public getAll(assignedToId?: number): Observable<ApiResponse<Ticket[]>> {
		const url = assignedToId ? `${this.apiUrl}?assignedToId=${assignedToId}` : this.apiUrl;
		return this.http.get<ApiResponse<Ticket[]>>(url);
	}

	public getById(id: number): Observable<ApiResponse<Ticket>> {
		return this.http.get<ApiResponse<Ticket>>(`${this.apiUrl}/${id}`);
	}

	public create(data: TicketCreate): Observable<ApiResponse<Ticket>> {
		return this.http.post<ApiResponse<Ticket>>(this.apiUrl, data);
	}

	public update(data: TicketUpdate): Observable<ApiResponse<Ticket>> {
		return this.http.put<ApiResponse<Ticket>>(`${this.apiUrl}/${data.id}`, data);
	}

	public delete(id: number): Observable<ApiResponse<boolean>> {
		return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
	}
}
