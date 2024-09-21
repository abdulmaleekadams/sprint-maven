"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteCheckitemSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId || !session) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, checklistId, boardId } = data;

  let checkItem;
  try {
    checkItem = await db.checkItems.delete({
      where: {
        id,
        checklistId,
      },
    });
    if (!checkItem) {
      return {
        error: "CheckItem not found",
      };
    }
  } catch (error) {
    return {
      error: "Failed to delete checkItem",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: checkItem };
};

export const deleteCheckitem = createSafeAction(DeleteCheckitemSchema, handler);
