import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { Module, ModuleCreate, ModuleUpdate, ApiResponse } from "../../app/types";
import { modules } from "../db";
import { saveToStorage } from "../db/persistence.utils";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.module}`;

export const moduleHandlers = [
	// ... GetAll and GetById ...
	http.get(url, () => {
		const response: ApiResponse<Module[]> = {
			status: "success",
			data: modules
		};

		return HttpResponse.json(response, { status: 200 });
	}),

	http.get(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const module = modules.find((m) => m.id === id);

		if (!module) {
			return HttpResponse.json({ status: "Error: Módulo no encontrado", data: null }, { status: 404 });
		}

		return HttpResponse.json({ status: "success", data: module }, { status: 200 });
	}),

	// Create
	http.post(url, async ({ request }) => {
		const newModuleData = (await request.json()) as ModuleCreate;

		const exists = modules.some((m) => m.name.toLowerCase() === newModuleData.name.toLowerCase());
		if (exists) {
			return HttpResponse.json({ status: "Error: Nombre duplicado", data: null }, { status: 400 });
		}

		const newModule: Module = {
			...newModuleData,
			id: modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1,
			active: true
		};

		modules.push(newModule);
		saveToStorage("modules", modules);

		return HttpResponse.json({ status: "success", data: newModule }, { status: 201 });
	}),

	// Update
	http.put(`${url}/:id`, async ({ request, params }) => {
		const id = Number(params["id"]);
		const updatedModuleData = (await request.json()) as ModuleUpdate;

		const index = modules.findIndex((m) => m.id === id);
		if (index === -1) {
			return HttpResponse.json({ status: "Error: Módulo no encontrado", data: null }, { status: 404 });
		}

		const nameExists = modules.some((m) => m.id !== id && m.name.toLowerCase() === updatedModuleData.name.toLowerCase());
		if (nameExists) {
			return HttpResponse.json({ status: "Error: Nombre duplicado", data: null }, { status: 400 });
		}

		modules[index] = { ...updatedModuleData, id };
		saveToStorage("modules", modules);

		return HttpResponse.json({ status: "success", data: modules[index] }, { status: 200 });
	}),

	// Delete
	http.delete(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);
		const index = modules.findIndex((m) => m.id === id);

		if (index === -1) {
			return HttpResponse.json({ status: "Error: Módulo no encontrado", data: null }, { status: 404 });
		}

		modules.splice(index, 1);
		saveToStorage("modules", modules);

		return HttpResponse.json({ status: "success", data: true }, { status: 200 });
	})
];