"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteCardSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;

  const { id, boardId } = data;

  let card;
  try {
    card = await db.card.delete({
      where: {
        id,
        List: {
          board: {
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
  } catch (error) {
    return {
      error: "Failed to delete card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCardSchema, handler);
