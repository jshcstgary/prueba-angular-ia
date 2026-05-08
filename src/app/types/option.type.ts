import { Module } from "./module.type";

export type Option = {
	id: number;
	name: string;
	path: string;
	icon: string;
	module: Module;
};

export type OptionCreate = Omit<Option, "id" | "module"> & { moduleId: number };

export type OptionUpdate = Omit<Option, "module"> & { moduleId: number };
