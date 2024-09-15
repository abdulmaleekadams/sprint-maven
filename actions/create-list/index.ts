"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateListFormSchema } from "../schema";
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

  let list;
  try {
    const board = await db.board.findUnique({
      where: {
        id,
        workspaceId,
      },
    });

    if (!board) {
      return {
        error: "Board not found",
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
        boardId: id,
        title,
        order: newOrder,
      },
    });
  } catch (error) {
    return {
      error: "Failed to Create",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: list };
};

export const createList = createSafeAction(CreateListFormSchema, handler);
