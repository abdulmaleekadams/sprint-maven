"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { UpdateUserFormSchema } from "../schema";
import { getUserById } from "../user/user-data";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      error: "Unauthorized",
    };
  }

  const { email, username, name } = data;
  let updatedUser;
  try {
    const userExist = await getUserById(session.user.id);

    if (userExist) {
      updatedUser = await db.user.update({
        where: {
          id: userExist.id,
        },
        data: {
          username: username ? username : userExist.username,
        },
      });
    }
  } catch (error) {
    return {
      error: "Failed to reorder",
    };
    console.log(error);
  }

  return { data: updatedUser };
};

export const updateUser = createSafeAction(UpdateUserFormSchema, handler);
