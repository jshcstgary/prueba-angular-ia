import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { Option, OptionCreate, OptionUpdate, ApiResponse } from "../../app/types";
import { options, modules } from "../db";
import { saveToStorage } from "../db/persistence.utils";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.option}`;

export const optionHandlers = [
	// GetAll
	http.get(url, () => {
		return HttpResponse.json({ status: "success", data: options }, { status: 200 });
	}),

	// GetById
	http.get(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const option = options.find((o) => o.id === id);

		if (!option) {
			return HttpResponse.json({ status: "Error: Opción no encontrada", data: null }, { status: 404 });
		}

		return HttpResponse.json({ status: "success", data: option }, { status: 200 });
	}),

	// Create
	http.post(url, async ({ request }) => {
		const newOptionData = (await request.json()) as OptionCreate;

		const module = modules.find((m) => m.id === Number(newOptionData.moduleId));
		if (!module) {
			return HttpResponse.json({ status: "Error: Módulo no encontrado", data: null }, { status: 404 });
		}

		const exists = options.some((o) => o.name.toLowerCase() === newOptionData.name.toLowerCase());
		if (exists) {
			return HttpResponse.json({ status: "Error: Nombre duplicado", data: null }, { status: 400 });
		}

		const newOption: Option = {
			...newOptionData,
			id: options.length > 0 ? Math.max(...options.map((o) => o.id)) + 1 : 1,
			module
		};

		options.push(newOption);
		saveToStorage("options", options);

		return HttpResponse.json({ status: "success", data: newOption }, { status: 201 });
	}),

	// Update
	http.put(`${url}/:id`, async ({ request, params }) => {
		const id = Number(params["id"]);
		const updatedOptionData = (await request.json()) as OptionUpdate;

		const index = options.findIndex((o) => o.id === id);
		if (index === -1) {
			return HttpResponse.json({ status: "Error: Opción no encontrada", data: null }, { status: 404 });
		}

		const module = modules.find((m) => m.id === Number(updatedOptionData.moduleId));
		if (!module) {
			return HttpResponse.json({ status: "Error: Módulo no encontrado", data: null }, { status: 404 });
		}

		const nameExists = options.some((o) => o.id !== id && o.name.toLowerCase() === updatedOptionData.name.toLowerCase());
		if (nameExists) {
			return HttpResponse.json({ status: "Error: Nombre duplicado", data: null }, { status: 400 });
		}

		options[index] = { ...updatedOptionData, id, module };
		saveToStorage("options", options);

		return HttpResponse.json({ status: "success", data: options[index] }, { status: 200 });
	}),

	// Delete
	http.delete(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const index = options.findIndex((o) => o.id === id);

		if (index === -1) {
			return HttpResponse.json({ status: "Error: Opción no encontrada", data: null }, { status: 404 });
		}

		options.splice(index, 1);
		saveToStorage("options", options);

		return HttpResponse.json({ status: "success", data: true }, { status: 200 });
	})
];