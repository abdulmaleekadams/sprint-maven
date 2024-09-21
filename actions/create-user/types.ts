import { User } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { UserFormSchema } from "../schema";

export type InputType = z.infer<typeof UserFormSchema>;
export type ReturnType = ActionState<InputType, User>;
