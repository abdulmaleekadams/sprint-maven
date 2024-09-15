"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeleteBoardFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;
  const { id } = data;

  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        workspaceId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete board",
    };
  }

  revalidatePath(`/organization/${session.user.workspaceId}`);
  redirect(`/organization/${session.user.workspaceId}`);
};

export const deleteBoard = createSafeAction(DeleteBoardFormSchema, handler);
