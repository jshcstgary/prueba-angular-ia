import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { Profile, ProfileCreate, ProfileUpdate, ApiResponse } from "../../app/types";
import { profiles, options } from "../db";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.profile}`;

export const profileHandlers = [
	// GetAll
	http.get(url, () => {
		const response: ApiResponse<Profile[]> = {
			status: "success",
			data: profiles
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// GetById
	http.get(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);

		const profile = profiles.find((p) => p.id === id);

		if (!profile) {
			const response: ApiResponse<null> = {
				status: "Error: Perfil no encontrado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		const response: ApiResponse<Profile> = {
			status: "success",
			data: profile
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// Create
	http.post(url, async ({ request }) => {
		const newProfileData = (await request.json()) as ProfileCreate;

		// Validate options
		const requestedOptions = options.filter((o) => newProfileData.optionIds.includes(o.id));
		if (requestedOptions.length !== newProfileData.optionIds.length) {
			const response: ApiResponse<null> = {
				status: "Error: Una de las opciones no existe",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		// Validate Name
		const exists = profiles.some((p) => p.name.toLowerCase() === newProfileData.name.toLowerCase());
		if (exists) {
			const response: ApiResponse<null> = {
				status: "Error: Nombre duplicado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 400
			});
		}

		const newProfile: Profile = {
			...newProfileData,
			id: profiles.length > 0
				? Math.max(...profiles.map((p) => p.id)) + 1
				: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
			options: requestedOptions
		};

		profiles.push(newProfile);

		const response: ApiResponse<Profile> = {
			status: "success",
			data: newProfile
		};

		return HttpResponse.json(response, {
			status: 201
		});
	}),

	// Update
	http.put(`${url}/:id`, async ({ request, params }) => {
		const id = Number(params["id"]);

		const updatedProfileData = (await request.json()) as ProfileUpdate;

		const index = profiles.findIndex((p) => p.id === id);
		if (index === -1) {
			const response: ApiResponse<null> = {
				status: "Error: Perfil no encontrado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		// Validate options
		const requestedOptions = options.filter((o) => updatedProfileData.optionIds.includes(o.id));
		if (requestedOptions.length !== updatedProfileData.optionIds.length) {
			const response: ApiResponse<null> = {
				status: "Error: Una de las opciones no existe",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		// Validate Name
		const nameExists = profiles.some((p) => p.id !== id && p.name.toLowerCase() === updatedProfileData.name.toLowerCase());
		if (nameExists) {
			const response: ApiResponse<null> = {
				status: "Error: Nombre duplicado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 400
			});
		}

		profiles[index] = {
			...updatedProfileData,
			id,
			createdAt: updatedProfileData.createdAt,
			updatedAt: new Date(),
			options: requestedOptions
		};

		const response: ApiResponse<Profile> = {
			status: "success",
			data: profiles[index]
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// Delete
	http.delete(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);

		const index = profiles.findIndex((p) => p.id === id);

		if (index === -1) {
			const response: ApiResponse<null> = {
				status: "Error: Perfil no encontrado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		profiles.splice(index, 1);

		const response: ApiResponse<boolean> = {
			status: "success",
			data: true
		};

		return HttpResponse.json(response, {
			status: 200
		});
	})
];