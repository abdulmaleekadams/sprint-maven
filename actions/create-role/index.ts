"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateRoleFormSchema } from "../schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      error: "Unauthorized",
    };
  }

  const { role, workspaceId } = data;

  let newRole;
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

    const roleExist = await db.role.findUnique({
      where: {
        title: role.toUpperCase(),
        workspaceId,
      },
    });

    if (roleExist) {
      return {
        error: "Role already created",
      };
    }

    newRole = await db.role.create({
      data: {
        title: role.toUpperCase(),
        workspaceId: workspace.id,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to Create",
    };
  }

  revalidatePath(`/board/${workspaceId}`);
  return { data: newRole };
};

export const createRole = createSafeAction(CreateRoleFormSchema, handler);
