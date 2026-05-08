import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { Ticket, TicketCreate, TicketUpdate, ApiResponse, User } from "../../app/types";
import { tickets, users } from "../db";
import { saveToStorage } from "../db/persistence.utils";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.ticket}`;

export const ticketHandlers = [
	// GetAll
	http.get(url, ({ request }) => {
		const urlObj = new URL(request.url);
		const assignedToId = urlObj.searchParams.get("assignedToId");

		let filteredTickets = tickets;

		if (assignedToId) {
			filteredTickets = tickets.filter((t) => t.assignedTo.id === Number(assignedToId));
		}

		return HttpResponse.json({ status: "success", data: filteredTickets }, { status: 200 });
	}),

	// GetById
	http.get(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const ticket = tickets.find((t) => t.id === id);

		if (!ticket) {
			return HttpResponse.json({ status: "Error: Ticket no encontrado", data: null }, { status: 404 });
		}

		return HttpResponse.json({ status: "success", data: ticket }, { status: 200 });
	}),

	// Create
	http.post(url, async ({ request }) => {
		try {
			const body = (await request.json()) as TicketCreate;

			const creatorDb = users.find((u) => u.id === body.userId);
			if (!creatorDb) {
				return HttpResponse.json({ status: "Error: El usuario creador no existe", data: null }, { status: 404 });
			}

			const assignedDb = users.find((u) => u.id === body.assignedToId);
			if (!assignedDb) {
				return HttpResponse.json({ status: "Error: El usuario asignado no existe", data: null }, { status: 404 });
			}

			const { password: _, ...creatorRest } = creatorDb;
			const creator: User = { ...creatorRest, jwt: "mock-jwt" };

			const { password: __, ...assignedRest } = assignedDb;
			const assigned: User = { ...assignedRest, jwt: "mock-jwt" };

			const newTicket: Ticket = {
				id: tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1,
				title: body.title,
				description: body.description,
				priority: body.priority,
				status: "OPEN",
				createdAt: new Date(),
				updatedAt: new Date(),
				user: creator,
				assignedTo: assigned
			};

			tickets.push(newTicket);
			saveToStorage("tickets", tickets);

			return HttpResponse.json({ status: "success", data: newTicket }, { status: 201 });
		} catch (error) {
			return HttpResponse.json({ status: "Error: Datos inválidos", data: null }, { status: 400 });
		}
	}),

	// Update
	http.put(`${url}/:id`, async ({ params, request }) => {
		try {
			const id = Number(params["id"]);
			const body = (await request.json()) as TicketUpdate;
			const index = tickets.findIndex((t) => t.id === id);

			if (index === -1) {
				return HttpResponse.json({ status: "Error: Ticket no existe", data: null }, { status: 404 });
			}

			tickets[index] = { ...body, id, updatedAt: new Date() };
			saveToStorage("tickets", tickets);

			return HttpResponse.json({ status: "success", data: tickets[index] }, { status: 200 });
		} catch (error) {
			return HttpResponse.json({ status: "Error: Datos inválidos", data: null }, { status: 400 });
		}
	}),

	// Delete
	http.delete(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const index = tickets.findIndex((t) => t.id === id);

		if (index === -1) {
			return HttpResponse.json({ status: "Error: Ticket no existe", data: null }, { status: 404 });
		}

		tickets.splice(index, 1);
		saveToStorage("tickets", tickets);

		return HttpResponse.json({ status: "success", data: true }, { status: 200 });
	})
];

