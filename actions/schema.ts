import { z } from "zod";

export const CreateBoardFormSchema = z.object({
  title: z
    .string({
      required_error: "Board title is required",
      invalid_type_error: "Board title is required",
    })
    .min(3, { message: "Board title should be a minimum of 3 characters" }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
});

export const UpdateBoardFormSchema = z.object({
  title: z
    .string({
      required_error: "Board title is required",
      invalid_type_error: "Board title is required",
    })
    .min(3, { message: "Board title should be a minimum of 3 characters" }),
  id: z.string(),
});

export const DeleteBoardFormSchema = z.object({
  id: z.string(),
});

export const DeleteListFormSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});

export const CreateListFormSchema = z.object({
  title: z
    .string({
      required_error: "Board title is required",
      invalid_type_error: "Board title is required",
    })
    .min(3, { message: "Board title should be a minimum of 3 characters" }),
  id: z.string(),
});

export const UpdateListFormSchema = z.object({
  title: z
    .string({
      required_error: "List title is required",
      invalid_type_error: "List title is required",
    })
    .min(3, { message: "Board title should be a minimum of 3 characters" }),
  id: z.string(),
  boardId: z.string(),
});

export const CopyListFormSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});

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

export const UpdateListOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updateAt: z.date(),
    })
  ),
  boardId: z.string(),
});

export const CreateTagFormSchema = z.object({
  title: z
    .string({
      required_error: "Tag title is required",
      invalid_type_error: "Tag title is required",
    })
    .min(1, { message: "Tag title is required" }),
  color: z.string({
    required_error: "Tag color is required",
    invalid_type_error: "Tag color is required",
  }),
  cardId: z.string(),
  boardId: z.string(),
});

export const UpdateCardOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updateAt: z.date(),
      listdId: z.string(),
    })
  ),
  boardId: z.string(),
});

export const UpdateCardFormSchema = z.object({
  title: z
    .string({
      required_error: "Board title is required",
      invalid_type_error: "Board title is required",
    })
    .min(3, { message: "Board title should be a minimum of 3 characters" })
    .optional(),
  id: z.string(),
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, {
        message: "Description is too short",
      })
  ),
  labels: z.array(z.string()).optional(),
  point: z.number().min(1).nullable().optional(),
  priority: z.number().min(1).nullable().optional(),
  severity: z.string().nullable().optional(),
});

export const CopyCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});

export const DeleteCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
});

export const CreateChecklistFormSchema = z.object({
  title: z
    .string({
      required_error: "Checklist title is required",
      invalid_type_error: "Checklist title is required",
    })
    .min(1, { message: "Checklist title is required" }),
  cardId: z.string(),
  boardId: z.string(),
});

export const CreateChecklistItemFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, { message: "Title is required" }),
  cardId: z.string(),
  boardId: z.string(),
  checklistId: z.string(),
});

export const UpdateChecklistItemFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, { message: "Title is required" })
    .optional(),
  checked: z.boolean().optional(),
  boardId: z.string(),
  id: z.string(),
});

export const DeleteChecklistSchema = z.object({
  id: z.string(),
  cardId: z.string(),
});
export const DeleteCheckitemSchema = z.object({
  id: z.string(),
  checklistId: z.string(),
});
