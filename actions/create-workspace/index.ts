"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { CreateWorkSpaceFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return {
      error: "Unauthorized",
    };
  }
  const { name, description } = data;

  let workspace;
  try {
    const workSpaceExist = await db.workspace.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        ownerId: session.user.id,
      },
    });

    if (workSpaceExist) {
      return {
        error: `Workspace "${workSpaceExist.name}" already exist`,
      };
    }

    workspace = await db.workspace.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to Create",
    };
  }

  return { data: workspace };
};

export const createWorkspace = createSafeAction(
  CreateWorkSpaceFormSchema,
  handler
);
