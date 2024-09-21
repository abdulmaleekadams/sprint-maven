import { Workspace } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { CreateWorkSpaceFormSchema } from "../schema";

export type InputType = z.infer<typeof CreateWorkSpaceFormSchema>;
export type ReturnType = ActionState<InputType, Workspace>;
