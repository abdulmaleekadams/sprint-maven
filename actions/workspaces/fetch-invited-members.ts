"use server";
import { getCurrentUser } from "@/lib/data";
import { db } from "@/lib/db";

export const fetchInvitedMembers = async () => {
  const session = await getCurrentUser();

  const { workspaceId } = session;

  console.log(workspaceId);

  const invitedMembers = await db.invitation.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return invitedMembers;
};
