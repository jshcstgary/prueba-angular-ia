import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { User, UserCredentials, UserCreate, ApiResponse } from "../../app/types";
import { users, profiles } from "../db";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.auth}`;

export const authHandlers = [
	// SignIn
	http.post(`${url}/login`, async ({ request }) => {
		try {
			const { email, password } = (await request.json()) as UserCredentials;

			const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

			if (!user) {
				const response: ApiResponse<null> = {
					status: "Error: Credenciales inválidas",
					data: null
				};
				return HttpResponse.json(response, { status: 401 });
			}

			const { password: _, ...userRest } = user;
			const responseData: User = { ...userRest, jwt: "mock-jwt-token-123" };

			const response: ApiResponse<User> = {
				status: "success",
				data: responseData
			};

			return HttpResponse.json(response, { status: 200 });
		} catch (error) {
			const response: ApiResponse<null> = {
				status: "Error: Datos inválidos",
				data: null
			};
			return HttpResponse.json(response, { status: 400 });
		}
	}),

	// SignUp
	http.post(`${url}/register`, async ({ request }) => {
		try {
			const body = (await request.json()) as UserCreate;

			// Assign CLIENTE profile (ID 3)
			const profile = profiles.find((p) => p.id === 3);
			if (!profile) {
				const response: ApiResponse<null> = {
					status: "Error: Perfil CLIENTE no encontrado",
					data: null
				};
				return HttpResponse.json(response, { status: 500 });
			}

			// Check if user exists
			if (users.some((u) => u.email.toLowerCase() === body.email.toLowerCase())) {
				const response: ApiResponse<null> = {
					status: "Error: El usuario ya existe",
					data: null
				};
				return HttpResponse.json(response, { status: 400 });
			}

			const newUser = {
				id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
				name: body.name,
				email: body.email,
				password: body.password || "defaultPassword",
				profile
			};
			users.push(newUser);

			const { password: _, ...userRest } = newUser;
			const responseData: User = { ...userRest, jwt: "mock-jwt-token-register" };

			const response: ApiResponse<User> = {
				status: "success",
				data: responseData
			};

			return HttpResponse.json(response, { status: 201 });
		} catch (error) {
			const response: ApiResponse<null> = {
				status: "Error: Datos inválidos",
				data: null
			};
			return HttpResponse.json(response, { status: 400 });
		}
	})
];
