"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteChecklistSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId || !session) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, cardId, boardId } = data;

  let checklist;
  try {
    checklist = await db.checklist.delete({
      where: {
        id,
        cardId,
      },
    });
    if (!checklist) {
      return {
        error: "Checklist not found",
      };
    }
  } catch (error) {
    return {
      error: "Failed to delete checklist",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: checklist };
};

export const deleteChecklist = createSafeAction(DeleteChecklistSchema, handler);
