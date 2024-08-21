"use client";
import { updateChecklistItem } from "@/actions/update-checklist-item";
import FormInput from "@/components/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAction } from "@/hoooks/use-action";
import { cn } from "@/lib/utils";
import { CheckItems } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type CheckItemProps = {
  data: CheckItems;
  cardId: string;
};

const CheckItem = ({ data, cardId }: CheckItemProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isChecked, setIsChecked] = useState(data.checked);

  const { execute, fieldErrors, isLoading } = useAction(updateChecklistItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["checklists", cardId],
      });
      toast.success(`Checklist updated`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const boardId = params.id as string;
    const checkedState = formData.get("checked");
    const title = formData.get("title") as string;

    const checked = checkedState === "on";

    if (title === data.title && isEditing) {
      toast.error("No changes made");
      disableEditing();
      return;
    }

    execute({
      boardId,
      id: data.id,
      checked,
      title: title ?? data.title,
    });
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center w-full gap-2"
      >
        <Checkbox
          className="w-4 h-4"
          defaultChecked={data.checked}
          disabled={isLoading}
          id="checked"
          name="checked"
          onCheckedChange={() => {
            setIsChecked(!isChecked);
            formRef.current?.requestSubmit();
          }}
        />
        <div className="w-full">
          {isEditing ? (
            <FormInput
              name="title"
              id="title"
              defaultValue={data.title || undefined}
              placeholder="Add a title"
              errors={fieldErrors}
              ref={inputRef}
              className="py-2 h-auto w-full"
            />
          ) : (
            <div
              role="button"
              className={cn(
                "text-sm font-medium py-2",
                isChecked && "line-through"
              )}
              onClick={enableEditing}
            >
              {data.title}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckItem;
