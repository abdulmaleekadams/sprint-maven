import { Card } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateCardFormSchema } from "../schema";

export type InputType = z.infer<typeof UpdateCardFormSchema>;
export type ReturnType = ActionState<InputType, Card>;
