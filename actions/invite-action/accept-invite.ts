"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/data";
import { db } from "@/lib/db";
import { Invitation, WorkspaceUser } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const acceptInvite = async (invitation: Invitation) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const { createdAt, workspaceId, email } = invitation;

  let member: WorkspaceUser;
  try {
    const workspace = await db.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    const user = await getUserByEmail(email);

    if (!workspace) {
      return {
        success: false,
        message: "Workspace not found",
      };
    }

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Generate invitation tokens for all emails concurrently and wait for all to complete
    member = await db.workspaceUser.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        roleId: invitation.roleId,
      },
    });

    if (member) {
      await db.invitation.delete({
        where: {
          token: invitation.token,
        },
      });
    }

    console.log(member);
    // TODO: send emails
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to add to workspace",
    };
  }

  revalidatePath(`/`);
  return {
    success: member ? true : false,
    data: member,
    message: "Successfully added",
  };
};
