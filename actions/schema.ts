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
