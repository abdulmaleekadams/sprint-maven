"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateChecklistItemFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;
  const { title, checked, id, boardId } = data;

  let checklistItem;
  try {
    const checkItemExist = await db.checkItems.findUnique({
      where: {
        id,
      },
    });

    if (!checkItemExist) {
      return {
        error: "Card not found",
      };
    }
    if (
      title?.toLowerCase() === checkItemExist.title.toLowerCase() &&
      checked === checkItemExist.checked
    ) {
      return {
        error: "No changes made",
      };
    }

    checklistItem = await db.checkItems.update({
      where: {
        id,
      },
      data: {
        title: title ? title : checkItemExist.title,
        checked: checked,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update checklist",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: checklistItem };
};

export const updateChecklistItem = createSafeAction(
  UpdateChecklistItemFormSchema,
  handler
);
