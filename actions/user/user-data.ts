"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: { id },
  });

  return user;
};
