import { Profile } from "../../app/types";
import { options } from "./option.db";
import { loadFromStorage } from "./persistence.utils";

const initialData: Profile[] = [
	{
		id: 1,
		name: "Admin",
		description: "Acceso total al sistema",
		createdAt: new Date(),
		updatedAt: new Date(),
		options: [...options]
	},
	{
		id: 2,
		name: "Support",
		description: "Atención de tickets y usuarios",
		createdAt: new Date(),
		updatedAt: new Date(),
		options: [options[3], options[4]]
	},
	{
		id: 3,
		name: "Cliente",
		description: "Acceso solo a tickets",
		createdAt: new Date(),
		updatedAt: new Date(),
		options: [options[3]]
	}
];

export let profiles: Profile[] = loadFromStorage("profiles", initialData);
