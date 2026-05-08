import { http, HttpResponse } from "msw";
import { environment } from "../../environments/environment";
import { Option, OptionCreate, OptionUpdate, ApiResponse } from "../../app/types";
import { options, modules } from "../db";

const url = `${environment.baseUrl}${environment.urlPrefix}${environment.path.option}`;

export const optionHandlers = [
	// GetAll
	http.get(url, () => {
		const response: ApiResponse<Option[]> = {
			status: "success",
			data: options
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// GetById
	http.get(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);

		const option = options.find((o) => o.id === id);

		if (!option) {
			const response: ApiResponse<null> = {
				status: "Error: Opción no encontrada",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		const response: ApiResponse<Option> = {
			status: "success",
			data: option
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// Create
	http.post(url, async ({ request }) => {
		const newOptionData = (await request.json()) as OptionCreate;

		// Validate Module
		const module = modules.find((m) => m.id === newOptionData.moduleId);
		if (!module) {
			const response: ApiResponse<null> = {
				status: "Error: Módulo no encontrado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		// Validate Name
		const exists = options.some((o) => o.name.toLowerCase() === newOptionData.name.toLowerCase());
		if (exists) {
			const response: ApiResponse<null> = {
				status: "Error: Nombre duplicado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 400
			});
		}

		const newOption: Option = {
			...newOptionData,
			id: options.length > 0
				? Math.max(...options.map((o) => o.id)) + 1
				: 1,
			module
		};

		options.push(newOption);

		const response: ApiResponse<Option> = {
			status: "success",
			data: newOption
		};

		return HttpResponse.json(response, {
			status: 201
		});
	}),

	// Update
	http.put(`${url}/:id`, async ({ request, params }) => {
		const id = Number(params["id"]);

		const updatedOptionData = (await request.json()) as OptionUpdate;

		const index = options.findIndex((o) => o.id === id);
		if (index === -1) {
			const response: ApiResponse<null> = {
				status: "Error: Opción no encontrada",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		// Validate Module
		const module = modules.find((m) => m.id === updatedOptionData.moduleId);
		if (!module) {
			const response: ApiResponse<null> = {
				status: "Error: Módulo no encontrado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		// Validate Name
		const nameExists = options.some((o) => o.id !== id && o.name.toLowerCase() === updatedOptionData.name.toLowerCase());
		if (nameExists) {
			const response: ApiResponse<null> = {
				status: "Error: Nombre duplicado",
				data: null
			};

			return HttpResponse.json(response, {
				status: 400
			});
		}

		options[index] = {
			...updatedOptionData,
			id,
			module
		};

		const response: ApiResponse<Option> = {
			status: "success",
			data: options[index]
		};

		return HttpResponse.json(response, {
			status: 200
		});
	}),

	// Delete
	http.delete(`${url}/:id`, ({ params }) => {
		const id = Number(params["id"]);

		const index = options.findIndex((o) => o.id === id);

		if (index === -1) {
			const response: ApiResponse<null> = {
				status: "Error: Opción no encontrada",
				data: null
			};

			return HttpResponse.json(response, {
				status: 404
			});
		}

		options.splice(index, 1);

		const response: ApiResponse<boolean> = {
			status: "success",
			data: true
		};

		return HttpResponse.json(response, {
			status: 200
		});
	})
];