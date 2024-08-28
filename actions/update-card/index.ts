"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpdateCardFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { boardId, id, ...values } = data;

  let card;
  try {
    card = await db.card.update({
      where: {
        id,
        List: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
        labels: {
          connect: values.labels?.map((labelId) => ({ id: labelId })),
        },
        point: data.point === null ? null : data.point,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCardFormSchema, handler);
