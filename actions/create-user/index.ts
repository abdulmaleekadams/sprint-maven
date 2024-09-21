"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { User } from "@prisma/client";
import { UserFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;
  const { image } = data;

  let user: User;
  try {
  } catch (error) {
    return {
      error: "Failed to delete board",
    };
  }

  return { data: user! };
};

export const deleteBoard = createSafeAction(UserFormSchema, handler);
