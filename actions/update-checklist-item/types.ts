import { z } from "zod";
import { CheckItems } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateChecklistItemFormSchema } from "../schema";

export type InputType = z.infer<typeof UpdateChecklistItemFormSchema>;
export type ReturnType = ActionState<InputType, CheckItems>;
