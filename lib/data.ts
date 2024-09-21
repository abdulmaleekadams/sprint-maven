"use server";

import { auth } from "@/auth";
import { db } from "./db";

export const getLabels = async (boardId: string) => {
  const session = await auth();

  if (!session || !session.user.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const workspaceId = session.user.workspaceId;

  try {
    const labels = db.label.findMany({
      where: {
        board: {
          id: boardId,
          workspaceId,
        },
      },
    });

    return labels;
  } catch (err) {
    return {
      error: "Failed to fetch labels",
    };
  }
};

export const getCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};
