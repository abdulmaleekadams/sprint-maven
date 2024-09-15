"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CopyListFormSchema } from "../schema";
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

  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          workspaceId,
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
