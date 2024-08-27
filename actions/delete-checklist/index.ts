"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteChecklistSchema } from "../schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, cardId } = data;

  let checklist;
  try {
    checklist = await db.checklist.delete({
      where: {
        id,
        cardId
       
      },
    });
    if (!checklist) {
      return {
        error: "Checklist not found",
      };
    }
  } catch (error) {
    return {
      error: "Failed to delete checklist",
    };
  }

  return { data: checklist };
};

export const deleteChecklist = createSafeAction(DeleteChecklistSchema, handler);
