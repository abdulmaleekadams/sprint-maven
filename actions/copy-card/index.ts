"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCardSchema } from "../schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;

  let card;
  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        List: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) {
      return {
        error: "Card not found",
      };
    }

    const lastCardInList = await db.card.findFirst({
      where: {
        listdId: cardToCopy.listdId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCardInList ? lastCardInList.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        listdId: cardToCopy.listdId,
        order: newOrder,
      },
    });
  } catch (error) {
    return {
      error: "Failed to copy card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCardSchema, handler);
