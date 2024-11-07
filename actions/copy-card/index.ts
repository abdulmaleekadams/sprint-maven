"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CopyCardSchema } from "../schema";
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
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        List: {
          board: {
            workspaceId,
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
        authorId: session.user?.id,
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
