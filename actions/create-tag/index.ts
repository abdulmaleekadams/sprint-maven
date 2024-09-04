"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateTagFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, boardId, cardId, color } = data;

  let label;
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

    const labelExist = await db.label.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
    });

    label = await db.label.upsert({
      where: {
        title: labelExist?.title,
      },
      update: {
        title,
        color,
        board: {
          connect: {
            id: boardId,
          },
        },
        cards: {
          connect: {
            id: cardId,
          },
        },
      },
      create: {
        title,
        color,
        board: {
          connect: {
            id: boardId,
          },
        },
        cards: {
          connect: {
            id: cardId,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to Create",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: label };
};

export const createTag = createSafeAction(CreateTagFormSchema, handler);
