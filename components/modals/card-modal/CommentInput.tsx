"use client";
import { updateComment } from "@/actions/update-comment";
import FormSubmit from "@/components/form-submit";
import FormTextarea from "@/components/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hoooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { RefObject, useRef } from "react";
import { toast } from "sonner";

const CommentInput = ({
  cardId,
  content: initialContent,
  textareaRef,
  id,
  isEditing, // Accept isEditing prop
  setCurrentEditingId,
}: {
  cardId: string;
  content: string;
  id: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  isEditing: boolean; // New prop for controlling the submit button
  setCurrentEditingId: (id: string | null) => void;
}) => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const { execute, fieldErrors, isLoading } = useAction(updateComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", cardId],
      });
      toast.success(`Comment updated`);
      if (data.id) {
        setCurrentEditingId(null);
      }
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const content = formData.get("content") as string;
    execute({ id, content });
  };

  return (
    <div className="flex items-start gap-x-3 w-full flex-1">
      <form action={handleSubmit} ref={formRef} className="space-y-3 w-full">
        <FormTextarea
          defaultValue={initialContent}
          disabled={isLoading}
          id="content"
          name="content"
          ref={textareaRef}
        />
        <div className="flex gap-2">
          <FormSubmit
            disabled={isLoading || !isEditing}
            className="py-2 h-auto"
          >
            Save
          </FormSubmit>
          <Button
            onClick={() => setCurrentEditingId(null)}
            variant="secondary"
            size="sm"
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
