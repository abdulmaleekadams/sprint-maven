import { z } from "zod";
import { Checklist } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateChecklistFormSchema } from "../schema";

export type InputType = z.infer<typeof CreateChecklistFormSchema>;
export type ReturnType = ActionState<InputType, Checklist>;
