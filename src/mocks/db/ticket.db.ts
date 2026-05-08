import { Ticket } from "../../app/types/ticket.type";
import { users } from "./user.db";
import { loadFromStorage } from "./persistence.utils";

// Map UserDb to User for mock data (removing password)
const getMockUser = (index: number) => {
	if (!users[index]) return null;
	const { password, ...rest } = users[index];
	return { ...rest, jwt: "mock-jwt" };
};

const initialData: Ticket[] = [
	{
		id: 1,
		title: "Error al cargar el perfil",
		description: "El sistema muestra un error 500 al intentar acceder a la configuración del perfil.",
		status: "OPEN",
		priority: "High",
		createdAt: new Date(),
		updatedAt: new Date(),
		user: getMockUser(0)!,
		assignedTo: getMockUser(1)!
	},
	{
		id: 2,
		title: "Actualización de dependencias",
		description: "Es necesario actualizar las dependencias de Angular a la última versión estable.",
		status: "IN_PROGRESS",
		priority: "Medium",
		createdAt: new Date(),
		updatedAt: new Date(),
		user: getMockUser(1)!,
		assignedTo: getMockUser(3)!
	}
];

export let tickets: Ticket[] = loadFromStorage("tickets", initialData);
