import { Profile } from "./profile.type";

export type User = {
	id: number;
	name: string;
	email: string;
	jwt: string;
	profile: Profile;
};

export type UserCreate = Omit<User, "id" | "jwt" | "profile"> & {
	password: string;
};

export type UserUpdate = Omit<User, "jwt" | "profile"> & {
	profileId: number;
};

export type UserCredentials = {
	email: string;
	password: string;
};
