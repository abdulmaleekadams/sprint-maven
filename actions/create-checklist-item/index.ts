"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateChecklistItemFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;
  const { title, boardId, cardId, checklistId } = data;

  let checklistItem;
  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        List: {
          board: {
            id: boardId,
            workspaceId,
          },
        },
      },
    });

    if (!card) {
      return {
        error: "Card not found",
      };
    }

    checklistItem = await db.checkItems.create({
      data: {
        title,
        checklistId,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to add checklist",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: checklistItem };
};

export const createChecklistItem = createSafeAction(
  CreateChecklistItemFormSchema,
  handler
);
