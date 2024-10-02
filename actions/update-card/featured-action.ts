"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const assignTask = async ({
  cardId,
  userId,
  boardId,
}: {
  cardId: string;
  userId: string;
  boardId: string;
}) => {
  const assignedTask = await db.taskAssignment.upsert({
    where: {
      id: cardId,
    },
    create: {
      userId,
      taskId: cardId,
    },
    update: {
      userId,
    },
  });
  revalidatePath(`board/${boardId}`);
  return { data: assignedTask };
};

export const deassignTask = async ({
  taskAssignmentId,
  boardId,
}: {
  taskAssignmentId: string;
  boardId: string;
}) => {
  const assignedTask = await db.taskAssignment.delete({
    where: {
      id: taskAssignmentId,
    },
  });

  revalidatePath(`board/${boardId}`);
  return { data: assignedTask };
};
