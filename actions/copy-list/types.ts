import { z } from "zod";
import {  List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CopyListFormSchema } from "../schema";

export type InputType = z.infer<typeof CopyListFormSchema>
export type ReturnType = ActionState<InputType, List>