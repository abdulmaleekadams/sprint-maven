import { z } from "zod";

export const CreateBoardFormSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Board title should be a minimum of 3 characters" }),
  });