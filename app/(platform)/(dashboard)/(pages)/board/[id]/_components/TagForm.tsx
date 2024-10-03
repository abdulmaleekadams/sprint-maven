import FormInput from "@/components/form-input";
import FormSubmit from "@/components/form-submit";
import React, { useRef, useState } from "react";
import Circle from "@uiw/react-color-circle";
import { useAction } from "@/hoooks/use-action";
import { createTag } from "@/actions/create-tag";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const colors = [
  "#FF5722", // Deep Orange
  "#E91E63", // Pink
  "#9C27B0", // Purple
  "#3F51B5", // Indigo
  "#03A9F4", // Light Blue
  "#00BCD4", // Cyan
  "#4CAF50", // Green
  "#8BC34A", // Light Green
  "#FFC107", // Amber
  "#FF9800", // Orange
  "#1E1E1E", // Dark Gray
  "#424242", // Gray
  "#607D8B", // Blue Gray
  "#37474F", // Charcoal
  "#263238", // Dark Blue Gray
  "#795548", // Brown
  "#D32F2F", // Red
  "#1976D2", // Blue
  "#388E3C", // Dark Green
  "#7B1FA2", // Dark Purple
  "#F57C00", // Dark Orange
  "#C2185B", // Crimson
  "#512DA8", // Deep Purple
  "#546E7A", // Slate Blue
  "#6D4C41", // Brown
  "#000000", // Black
];
const TagForm = ({ cardId }: { cardId: string }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const formRef = useRef<HTMLFormElement>(null);

  const [color, setColor] = useState("#000000");

  const { execute, fieldErrors } = useAction(createTag, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
      toast.success(`Tag "${data.title}" added`);
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.id as string;

    execute({ cardId, boardId, title, color });
  };
  return (
    <form ref={formRef} action={onSubmit} className="space-y-4">
      <FormInput id="title" name="title" errors={fieldErrors} />
      <Circle
        color={color}
        colors={colors}
        onChange={(color) => {
          setColor(color.hex);
        }}
      />

      <FormSubmit>Add Tag</FormSubmit>
    </form>
  );
};

export default TagForm;
