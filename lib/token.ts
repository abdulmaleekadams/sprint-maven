import { auth } from "@/auth";
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
  const expires = new Date(new Date().getTime() + 6400 * 1000); // Set an expiration date one hour from the current time

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

export const verifyInvitationToken = async (token: string) => {
  // Get session
  const session = await auth();

  // Find the invitation by token
  const invitation = await db.invitation.findUnique({
    where: {
      token,
    },
    include: {
      workspace: {
        select: {
          name: true,
          description: true,
          owner: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  // Check if the token exists
  if (!invitation) {
    return { success: false, message: "Invalid invitation token." };
  }

  // Check if the token has expired
  const currentTime = new Date();
  if (invitation.expires < currentTime) {
    return {
      success: false,
      message:
        "Invitation expired. Reach out to your admin for a new invitation",
    };
  }

  if (session) {
    const { expires, user } = session;
    console.log(user);

    if (user.email !== invitation.email) {
      return {
        success: false,
        message: "Invitation can only be accepted by the email attached",
      };
    }
  }

  // If the token is valid and not expired, return the invitation details
  return {
    success: true,
    data: invitation,
    auth: session?.user.id ? true : false,
  };
};
