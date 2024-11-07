"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { Label } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { UpdateCardFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;
  const { boardId, id, ...values } = data;

  let currentLabels: Label[] | undefined = [];

  if (values.labels) {
    currentLabels = await db.label.findMany({
      where: {
        cards: {
          some: {
            id,
          },
        },
      },
    });
  }

  let card;
  try {
    card = await db.card.update({
      where: {
        id,
        List: {
          board: {
            workspaceId,
          },
        },
      },
      data: {
        ...values,
        labels: {
          connect: values.labels?.map((labelId) => ({ id: labelId })),
          disconnect:
            currentLabels &&
            currentLabels?.filter(
              ({ id: labelId }) => !values?.labels?.includes(labelId)
            ),
        },
        point: data.point === null ? null : data.point,
        priority: data.priority === null ? null : data.priority,
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
