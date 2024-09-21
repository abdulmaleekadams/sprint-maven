import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateBoardFormSchema } from "../schema";

export type InputType = z.infer<typeof UpdateBoardFormSchema>
export type ReturnType = ActionState<InputType, Board>