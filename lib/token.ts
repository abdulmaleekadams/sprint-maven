import { v4 as uuidv4 } from "uuid";
import { getInvitationTokenByEmail } from "./data";
import { db } from "./db";

export const generateInvitationToken = async ({
  email,
  roleId,
  workspaceId,
}: {
  email: string;
  roleId: string;
  workspaceId: string;
}) => {
  const token = uuidv4(); // Generate a unique token using uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Set an expiration date one hour from the current time

  const existingToken = await getInvitationTokenByEmail(email); // Get an existing verification token for the given email

  if (existingToken) {
    await db.invitation.delete({
      // If there is an existing token, delete it from the database
      where: {
        id: existingToken.id,
      },
    });
  }

  const invitationToken = await db.invitation.create({
    // Create a new verification token in the database
    data: {
      email,
      token,
      expires,
      roleId,
      workspaceId,
    },
  });

  return invitationToken; // Return the created verification token
};
