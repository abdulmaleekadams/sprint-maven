"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateChecklistItemFormSchema } from "../schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
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
