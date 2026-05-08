import { Profile } from "../../app/types";
import { profiles } from "./profile.db";

export type UserDb = {
	id: number;
	name: string;
	email: string;
	password: string;
	profile: Profile;
};

export let users: UserDb[] = [
	{
		id: 1,
		name: "Administrador Sistema",
		email: "admin@angular.com",
		password: "admin123",
		profile: profiles[0]
	},
	{
		id: 2,
		name: "Soporte Técnico",
		email: "soporte@angular.com",
		password: "soporte123",
		profile: profiles[1]
	},
	{
		id: 3,
		name: "Cliente Final",
		email: "cliente@angular.com",
		password: "cliente123",
		profile: profiles[2]
	}
];
