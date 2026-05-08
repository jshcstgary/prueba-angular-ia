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
		name: "Admin User",
		email: "admin@angular.com",
		password: "admin123",
		profile: profiles[0]
	},
	{
		id: 2,
		name: "Support User",
		email: "soporte@angular.com",
		password: "soporte123",
		profile: profiles[1]
	},
	{
		id: 3,
		name: "Client User",
		email: "cliente@angular.com",
		password: "cliente123",
		profile: profiles[2]
	},
	{
		id: 4,
		name: "Support User 2",
		email: "soporte2@angular.com",
		password: "soporte123",
		profile: profiles[1]
	}
];
