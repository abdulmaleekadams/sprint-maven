import { z } from "zod";
import {  Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { CreateCardFormSchema } from "../schema";

export type InputType = z.infer<typeof CreateCardFormSchema>;
export type ReturnType = ActionState<InputType, Card>;
