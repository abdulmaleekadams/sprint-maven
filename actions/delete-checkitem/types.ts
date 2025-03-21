import { CheckItems } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { DeleteCheckitemSchema } from "../schema";

export type InputType = z.infer<typeof DeleteCheckitemSchema>;
export type ReturnType = ActionState<InputType, CheckItems>;
