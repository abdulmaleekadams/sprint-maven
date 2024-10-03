"use client";

import { createCard } from "@/actions/create-card";
import FormSubmit from "@/components/form-submit";
import FormTextarea from "@/components/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hoooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type CardFormProps = {
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  listId: string;
};

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ disableEditing, enableEditing, isEditing, listId }, ref) => {
    const params = useParams();

    const formRef = useRef<HTMLFormElement>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.id as string;
      execute({ title, listId, boardId });
    };
    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4 bg-muted/90"
        >
          <FormTextarea
            id="title"
            onKeydown={onTextareaKeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <div className="flex items-center gap-x-4 justify-between">
            <FormSubmit>Add card</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <input type="hidden" name="listId" value={listId} />
        </form>
      );
    }
    return (
      <div className="pt-2 px-2 bg-muted/90 rounded-b-md">
        <Button
          onClick={enableEditing}
          className="px-2 h-auto w-full py-1.5 text-muted-foreground justify-start text-sm  hover:bg-muted/90"
          variant="ghost"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
export default CardForm;
