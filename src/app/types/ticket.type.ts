import { User } from ".";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "REJECTED";
export type TicketPriority = "High" | "Medium" | "Low";

export type Ticket = {
	id: number;
	title: string;
	description: string;
	status: TicketStatus;
	priority: TicketPriority;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	assignedTo: User;
};

export type TicketCreate = Omit<Ticket, "id" | "user" | "assignedTo" | "createdAt" | "updatedAt" | "status"> & {
	userId: number;
	assignedToId: number;
};

export type TicketUpdate = Ticket;
