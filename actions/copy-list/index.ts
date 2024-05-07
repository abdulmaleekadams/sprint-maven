"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyListFormSchema } from "../schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;

  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });
    if (!listToCopy) {
      return {
        error: "Failed to update",
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId: id },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        boardId: listToCopy.boardId,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              order: card.order,
              description: card.description,
            })),
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to copy list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyListFormSchema, handler);
