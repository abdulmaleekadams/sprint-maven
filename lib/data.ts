"use server";

import { auth } from "@clerk/nextjs";
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
