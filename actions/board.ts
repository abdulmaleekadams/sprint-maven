"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string| null;
};

const CreateBoardFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Board title should be a minimum of 3 characters" }),
});

export async function createBoard(prevState: State, formData: FormData) {
  "use server";

  const validatedFields = CreateBoardFormSchema.safeParse({
    title: formData.get("title") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields.",
    };
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    console.log("Internal server error ", error);
    return({message:"Internal server error "});
  }

  revalidatePath("/organization/org_2eH6h1DKPU5hb2qS8KN27hG1nfS");
  redirect("/organization/org_2eH6h1DKPU5hb2qS8KN27hG1nfS");
}

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
