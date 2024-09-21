"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateTagFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;

  const { title, boardId, cardId, color } = data;

  let label;
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

    const labelExist = await db.label.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
    });

    label = labelExist
      ? await db.label.update({
          where: {
            id: labelExist?.id,
          },
          data: {
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
        })
      : await db.label.create({
          data: {
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
