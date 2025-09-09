import { z } from "zod";

export const CreateCardFormSchema = z.object({
  title: z
    .string({
      required_error: "Card title is required",
      invalid_type_error: "Card title is required",
    })
    .min(3, { message: "Card title should be a minimum of 3 characters" }),
  listId: z.string(),
  boardId: z.string(),
});

export type CreateCardDto = z.infer<typeof CreateCardFormSchema>;
