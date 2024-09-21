import { z } from "zod";
import {  List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateListFormSchema } from "../schema";

export type InputType = z.infer<typeof UpdateListFormSchema>
export type ReturnType = ActionState<InputType, List>