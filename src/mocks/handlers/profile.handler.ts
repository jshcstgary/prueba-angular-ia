import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { Profile, ProfileCreate, ProfileUpdate, ApiResponse } from "../../app/types";
import { profiles, options } from "../db";
import { saveToStorage } from "../db/persistence.utils";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.profile}`;

export const profileHandlers = [
	// GetAll
	http.get(url, () => {
		return HttpResponse.json({ status: "success", data: profiles }, { status: 200 });
	}),

	// GetById
	http.get(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const profile = profiles.find((p) => p.id === id);

		if (!profile) {
			return HttpResponse.json({ status: "Error: Perfil no encontrado", data: null }, { status: 404 });
		}

		return HttpResponse.json({ status: "success", data: profile }, { status: 200 });
	}),

	// Create
	http.post(url, async ({ request }) => {
		const newProfileData = (await request.json()) as ProfileCreate;

		const requestedOptions = options.filter((o) => newProfileData.optionIds.includes(o.id));
		if (requestedOptions.length !== newProfileData.optionIds.length) {
			return HttpResponse.json({ status: "Error: Una de las opciones no existe", data: null }, { status: 404 });
		}

		const exists = profiles.some((p) => p.name.toLowerCase() === newProfileData.name.toLowerCase());
		if (exists) {
			return HttpResponse.json({ status: "Error: Nombre duplicado", data: null }, { status: 400 });
		}

		const newProfile: Profile = {
			...newProfileData,
			id: profiles.length > 0 ? Math.max(...profiles.map((p) => p.id)) + 1 : 1,
			createdAt: new Date(),
			updatedAt: new Date(),
			options: requestedOptions
		};

		profiles.push(newProfile);
		saveToStorage("profiles", profiles);

		return HttpResponse.json({ status: "success", data: newProfile }, { status: 201 });
	}),

	// Update
	http.put(`${url}/:id`, async ({ request, params }) => {
		const id = Number(params["id"]);
		const updatedProfileData = (await request.json()) as ProfileUpdate;

		const index = profiles.findIndex((p) => p.id === id);
		if (index === -1) {
			return HttpResponse.json({ status: "Error: Perfil no encontrado", data: null }, { status: 404 });
		}

		const requestedOptions = options.filter((o) => updatedProfileData.optionIds.includes(o.id));
		if (requestedOptions.length !== updatedProfileData.optionIds.length) {
			return HttpResponse.json({ status: "Error: Una de las opciones no existe", data: null }, { status: 404 });
		}

		const nameExists = profiles.some((p) => p.id !== id && p.name.toLowerCase() === updatedProfileData.name.toLowerCase());
		if (nameExists) {
			return HttpResponse.json({ status: "Error: Nombre duplicado", data: null }, { status: 400 });
		}

		profiles[index] = {
			...updatedProfileData,
			id,
			updatedAt: new Date(),
			options: requestedOptions
		};
		saveToStorage("profiles", profiles);

		return HttpResponse.json({ status: "success", data: profiles[index] }, { status: 200 });
	}),

	// Delete
	http.delete(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const index = profiles.findIndex((p) => p.id === id);

		if (index === -1) {
			return HttpResponse.json({ status: "Error: Perfil no encontrado", data: null }, { status: 404 });
		}

		profiles.splice(index, 1);
		saveToStorage("profiles", profiles);

		return HttpResponse.json({ status: "success", data: true }, { status: 200 });
	})
];