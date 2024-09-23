"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { DeleteCommentFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId || !session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let comment;
  try {
    const commentExist = await db.comment.findUnique({
      where: {
        id,
      },
    });

    if (!commentExist) {
      return {
        error: "Comment not found",
      };
    }

    comment = await db.comment.delete({
      where: {
        id: commentExist.id,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete comment",
    };
  }

  return { data: comment };
};

export const deleteComment = createSafeAction(DeleteCommentFormSchema, handler);
