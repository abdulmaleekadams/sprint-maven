import { Comment } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { CreateCommentFormSchema } from "../schema";

export type InputType = z.infer<typeof CreateCommentFormSchema>;
export type ReturnType = ActionState<InputType, Comment>;
