import { z } from "zod";
import {  Card, Checklist } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { DeleteChecklistSchema} from "../schema";

export type InputType = z.infer<typeof DeleteChecklistSchema>
export type ReturnType = ActionState<InputType, Checklist>