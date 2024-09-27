import { Role } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { CreateRoleFormSchema } from "../schema";

export type InputType = z.infer<typeof CreateRoleFormSchema>;
export type ReturnType = ActionState<InputType, Role>;
