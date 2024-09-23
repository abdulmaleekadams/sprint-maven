"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateCommentFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId || !session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;
  const { cardId, content, boardId } = data;

  let comment;
  try {
    const cardExist = await db.card.findUnique({
      where: {
        id: cardId,
        List: {
          boardId,
        },
      },
    });

    if (!cardExist) {
      return {
        error: "Card not found",
      };
    }

    comment = await db.comment.create({
      data: {
        content,
        taskId: cardId,
        uploadedById: session.user.id,
      },
    });
  } catch (error) {
    return {
      error: "Failed to Create",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: comment };
};

export const createComment = createSafeAction(CreateCommentFormSchema, handler);
