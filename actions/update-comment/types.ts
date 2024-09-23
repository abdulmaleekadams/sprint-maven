import { Comment } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { UpdateCommentFormSchema } from "../schema";

export type InputType = z.infer<typeof UpdateCommentFormSchema>;
export type ReturnType = ActionState<InputType, Comment>;
