import { User } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateUserFormSchema } from "../schema";

export type InputType = z.infer<typeof UpdateUserFormSchema>;
export type ReturnType = ActionState<InputType, User>;
