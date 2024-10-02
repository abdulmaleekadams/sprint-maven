"use server";

import { getCurrentUser } from "@/lib/data";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const fetchWorkspaces = async () => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/auth/signin");
  }

  try {
    const userWorkspaces = await db.workspace.findMany({
      where: {
        OR: [
          { ownerId: user.id }, // First condition: the user is the owner
          {
            workspaceUser: {
              some: {
                userId: user.id, // Second condition: the user is part of the workspaceUser relation
              },
            },
          },
        ],
      },
      include: {
        roles: true,
        workspaceUser: {
          include: {
            role: {
              select: {
                title: true,
                id: true,
              },
            },
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return { success: true, data: userWorkspaces };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
    };
  }
};
