"use server";

import { auth } from "@/auth";
import { db } from "./db";

export const getLabels = async (boardId: string) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const labels = db.label.findMany({
      where: {
        board: {
          id: boardId,
          orgId,
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
