"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateCardOrderSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;
  const { items, boardId } = data;

  let updatedCards;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          List: {
            board: {
              workspaceId,
            },
          },
        },
        data: {
          order: card.order,
          listdId: card.listdId,
        },
      })
    );
    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrderSchema, handler);
