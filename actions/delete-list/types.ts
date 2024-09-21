import { z } from "zod";
import {  List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { DeleteListFormSchema } from "../schema";

export type InputType = z.infer<typeof DeleteListFormSchema>
export type ReturnType = ActionState<InputType, List>