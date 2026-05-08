import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { Module, ModuleCreate, ModuleUpdate, ApiResponse } from "../../app/types";
import { modules } from "../db";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.module}`;

export const moduleHandlers = [
	// GetAll
	http.get(url, () => {
		const response: ApiResponse<Module[]> = {
			status: "success",
			data: modules
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// GetById
	http.get(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);

		const module = modules.find((m) => m.id === id);

		if (!module) {
			const response: ApiResponse<null> = {
				status: "Error: Módulo no encontrado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		const response: ApiResponse<Module> = {
			status: "success",
			data: module
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// Create
	http.post(url, async ({ request }) => {
		const newModuleData = (await request.json()) as ModuleCreate;

		const exists = modules.some((m) => m.name.toLowerCase() === newModuleData.name.toLowerCase());
		if (exists) {
			const response: ApiResponse<null> = {
				status: "Error: Nombre duplicado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 400
			});
		}

		const newModule: Module = {
			...newModuleData,
			id: modules.length > 0
				? Math.max(...modules.map((m) => m.id)) + 1
				: 1,
			active: true
		};

		modules.push(newModule);

		const response: ApiResponse<Module> = {
			status: "success",
			data: newModule
		};

		return HttpResponse.json(response, {
			status: 201
		});
	}),

	// Update
	http.put(`${url}/:id`, async ({ request, params }) => {
		const id = Number(params["id"]);

		const updatedModuleData = (await request.json()) as ModuleUpdate;

		const index = modules.findIndex((m) => m.id === id);
		if (index === -1) {
			const response: ApiResponse<null> = {
				status: "Error: Módulo no encontrado",
				data: null
			};
			return HttpResponse.json(response, {
				status: 404
			});
		}

		const nameExists = modules.some((m) => m.id !== id && m.name.toLowerCase() === updatedModuleData.name.toLowerCase());
		if (nameExists) {
			const response: ApiResponse<null> = {
				status: "Error: Nombre duplicado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 400
			});
		}

		modules[index] = { ...updatedModuleData, id };

		const response: ApiResponse<Module> = {
			status: "success",
			data: modules[index]
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// Delete
	http.delete(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);

		const index = modules.findIndex((m) => m.id === id);

		if (index === -1) {
			const response: ApiResponse<null> = {
				status: "Error: Módulo no encontrado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		modules.splice(index, 1);

		const response: ApiResponse<boolean> = {
			status: "success",
			data: true
		};

		return HttpResponse.json(response, {
			status: 200
		});
	})
];