"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCheckitemSchema } from "../schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, checklistId } = data;

  let checkItem;
  try {
    checkItem = await db.checkItems.delete({
      where: {
        id,
       checklistId
      },
    });
    if (!checkItem) {
      return {
        error: "CheckItem not found",
      };
    }
  } catch (error) {
    return {
      error: "Failed to delete checkItem",
    };
  }

  return { data: checkItem };
};

export const deleteCheckitem = createSafeAction(DeleteCheckitemSchema, handler);
