"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateBoardFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;
  const { title, id } = data;

  let board;
  try {
    board = await db.board.update({
      where: {
        id,
        workspaceId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoardFormSchema, handler);
