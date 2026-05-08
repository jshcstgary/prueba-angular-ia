import { Option } from "../../app/types";
import { modules } from "./module.db";

export let options: Option[] = [
	{
		id: 1,
		name: "Módulos",
		path: "/modules",
		icon: "view_module",
		module: modules[0]
	},
	{
		id: 2,
		name: "Perfiles",
		path: "/profiles",
		icon: "admin_panel_settings",
		module: modules[0]
	},
	{
		id: 3,
		name: "Opciones",
		path: "/options",
		icon: "settings",
		module: modules[0]
	},
	{
		id: 4,
		name: "Listado de Tickets",
		path: "/tickets",
		icon: "confirmation_number",
		module: modules[1]
	},
	{
		id: 5,
		name: "Gestión de Usuarios",
		path: "/users",
		icon: "people",
		module: modules[2]
	}
];
