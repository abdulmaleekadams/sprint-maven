import { Invitation } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { InviteMembersSchema } from "../schema";

export type InputType = z.infer<typeof InviteMembersSchema>;
export type ReturnType = ActionState<InputType, Invitation[]>;
