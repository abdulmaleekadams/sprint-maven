"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCardFormSchema, CreateTagFormSchema } from "../schema";

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
    const lowerCaseTitle = title.toLowerCase();

    
    

    label = await db.label.upsert({
      where: {
        title,
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
