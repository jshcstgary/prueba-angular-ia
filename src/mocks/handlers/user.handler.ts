import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { User, UserCreate, UserUpdate, ApiResponse } from "../../app/types";
import { users, profiles } from "../db";
import { saveToStorage } from "../db/persistence.utils";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.user}`;

export const userHandlers = [
	// GetAll
	http.get(url, ({ request }) => {
		const urlObj = new URL(request.url);
		const profileId = urlObj.searchParams.get("profileId");

		let filteredUsers = users;

		if (profileId) {
			filteredUsers = users.filter((u) => u.profile.id === Number(profileId));
		}

		const responseData: User[] = filteredUsers.map(({ password, ...rest }) => ({
			...rest,
			jwt: "mock-jwt"
		}));

		return HttpResponse.json({ status: "success", data: responseData }, { status: 200 });
	}),

	// GetById
	http.get(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const user = users.find((u) => u.id === id);

		if (!user) {
			return HttpResponse.json({ status: "Error: no existe", data: null }, { status: 404 });
		}

		const { password, ...rest } = user;
		const responseData: User = { ...rest, jwt: "mock-jwt" };

		return HttpResponse.json({ status: "success", data: responseData }, { status: 200 });
	}),

	// Update
	http.put(`${url}/:id`, async ({ params, request }) => {
		try {
			const id = Number(params["id"]);
			const body = (await request.json()) as UserUpdate;
			const index = users.findIndex((u) => u.id === id);

			if (index === -1) {
				return HttpResponse.json({ status: "Error: no existe", data: null }, { status: 404 });
			}

			const profile = profiles.find((p) => p.id === body.profileId);
			if (!profile) {
				return HttpResponse.json({ status: "Error: Perfil no existe", data: null }, { status: 404 });
			}

			const exists = users.some((u) => u.email.toLowerCase() === body.email.toLowerCase() && u.id !== id);
			if (exists) {
				return HttpResponse.json({ status: "Error: Email ya existe", data: null }, { status: 400 });
			}

			const { profileId, ...rest } = body;
			users[index] = { ...users[index], ...rest, profile, id };
			saveToStorage("users", users);

			const { password, ...userRest } = users[index];
			const responseData: User = { ...userRest, jwt: "mock-jwt" };

			return HttpResponse.json({ status: "success", data: responseData }, { status: 200 });
		} catch (error) {
			return HttpResponse.json({ status: "Error: Datos inválidos", data: null }, { status: 400 });
		}
	}),

	// Delete
	http.delete(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const index = users.findIndex((u) => u.id === id);

		if (index === -1) {
			return HttpResponse.json({ status: "Error: no existe", data: null }, { status: 404 });
		}

		const deletedUser = users.splice(index, 1)[0];
		saveToStorage("users", users);

		const { password, ...rest } = deletedUser;
		const responseData: User = { ...rest, jwt: "mock-jwt" };

		return HttpResponse.json({ status: "success", data: responseData }, { status: 200 });
	})
];

