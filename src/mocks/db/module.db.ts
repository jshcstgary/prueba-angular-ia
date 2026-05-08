import { Module } from "../../app/types";
import { loadFromStorage } from "./persistence.utils";

const initialData: Module[] = [
	{
		id: 1,
		name: "Mantenedores",
		description: "Configuración y mantenimiento del sistema",
		active: true
	},
	{
		id: 2,
		name: "Tickets",
		description: "Gestión de tickets de soporte",
		active: true
	},
	{
		id: 3,
		name: "Usuarios",
		description: "Administración de usuarios del sistema",
		active: true
	}
];

export let modules: Module[] = loadFromStorage("modules", initialData);
