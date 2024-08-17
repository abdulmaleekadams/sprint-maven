import { z } from "zod";
import { CheckItems } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateChecklistItemFormSchema } from "../schema";

export type InputType = z.infer<typeof CreateChecklistItemFormSchema>;
export type ReturnType = ActionState<InputType, CheckItems>;
