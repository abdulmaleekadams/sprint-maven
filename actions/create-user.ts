"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const CreateUser = async (user: User) => {
  const newUser = await db.user.create({
    data: {
      ...user,
    },
  });

  return newUser;
};
