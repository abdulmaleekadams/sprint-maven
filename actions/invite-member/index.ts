"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { generateInvitationToken } from "@/lib/token";
import { Invitation } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { InviteMembersSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const { emails, role, workspaceId } = data;

  let invitations;
  try {
    const workspace = await db.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      return {
        error: "Workspace not found",
      };
    }

    // Generate invitation tokens for all emails concurrently and wait for all to complete
    invitations = await Promise.all(
      emails.map(
        async (email): Promise<Invitation> =>
          await generateInvitationToken({
            email,
            roleId: role,
            workspaceId: workspace.id,
          })
      )
    );

    console.log(invitations);

    // TODO: send emails
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to Create",
    };
  }

  revalidatePath(`/organization/${workspaceId}`);
  return { data: invitations };
};

export const inviteMembers = createSafeAction(InviteMembersSchema, handler);
