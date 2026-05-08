export type Module = {
	id: number;
	name: string;
	description: string;
	active: boolean;
};

export type ModuleCreate = Omit<Module, "id" | "active">;

export type ModuleUpdate = Module;
