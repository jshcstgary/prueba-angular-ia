import { moduleHandlers } from "./handlers/module.handler";
import { optionHandlers } from "./handlers/option.handler";
import { profileHandlers } from "./handlers/profile.handler";

export const handlers = [...moduleHandlers, ...optionHandlers, ...profileHandlers];
