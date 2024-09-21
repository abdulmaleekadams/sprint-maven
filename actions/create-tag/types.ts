import { z } from "zod";
import {   Label } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import {  CreateTagFormSchema } from "../schema";

export type InputType = z.infer<typeof CreateTagFormSchema>;
export type ReturnType = ActionState<InputType, Label>;
