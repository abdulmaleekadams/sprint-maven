"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateChecklistItemFormSchema } from "../schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, boardId, cardId, checklistId } = data;

  let checklistItem;
  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        List: {
          board: {
            id: boardId,
            orgId,
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
