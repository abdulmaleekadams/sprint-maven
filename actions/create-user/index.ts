"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UserFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { image } = data;

  let board;
  try {
  } catch (error) {
    return {
      error: "Failed to delete board",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(UserFormSchema, handler);
