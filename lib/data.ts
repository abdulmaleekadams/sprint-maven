"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
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

  if (!session) redirect("/");

  return session?.user;
};

export const getUserByEmail = async (email: string) => {
  const userExist = await db.user.findUnique({
    where: {
      email,
    },
  });

  return userExist;
};

export const getInvitationTokenByEmail = async (email: string) => {
  try {
    const invitationToken = await db.invitation.findFirst({
      where: { email },
    });

    return invitationToken;
  } catch (error) {
    return null;
  }
};
