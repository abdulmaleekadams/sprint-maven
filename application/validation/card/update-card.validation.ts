import { z } from "zod";

export const UpdateCardFormSchema = z.object({
  title: z
    .string({
      required_error: "Card title is required",
      invalid_type_error: "Card title is required",
    })
    .min(3, { message: "Card title should be a minimum of 3 characters" }),
  listId: z.string(),
  boardId: z.string(),
  cardId: z.string().min(1, "Required"),
});

export type UpdateCardDto = z.infer<typeof UpdateCardFormSchema>;
