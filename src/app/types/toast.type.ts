export type ToastType = "success" | "error";

export type Toast = {
	message: string;
	type: ToastType;
	id: number;
};
