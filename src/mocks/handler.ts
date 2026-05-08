import { moduleHandlers } from "./handlers/module.handler";
import { optionHandlers } from "./handlers/option.handler";
import { profileHandlers } from "./handlers/profile.handler";
import { userHandlers } from "./handlers/user.handler";
import { authHandlers } from "./handlers/auth.handler";
import { ticketHandlers } from "./handlers/ticket.handler";

export const handlers = [
	...moduleHandlers,
	...optionHandlers,
	...profileHandlers,
	...userHandlers,
	...authHandlers,
	...ticketHandlers
];
