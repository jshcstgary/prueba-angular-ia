import { Option } from "./option.type";

export type Profile = {
	id: number;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	options: Option[];
};

export type ProfileCreate = Omit<Profile, "id" | "createdAt" | "updatedAt" | "options"> & {
	optionIds: number[];
};

export type ProfileUpdate = Omit<Profile, "options"> & { optionIds: number[] };
