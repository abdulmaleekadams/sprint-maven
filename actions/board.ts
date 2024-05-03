"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CreateBoardFormSchema } from "./schema";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string| null;
};

export async function getAllBoards() {
  "use server";

  const boards = await db.board.findMany();

  return boards;
}

export async function deleteBoard(id: string) {
  "use server";

  const board = await db.board.delete({ where: { id } });

  revalidatePath("/organization/:id");
}
