"use client";
import { updateCard } from "@/actions/update-card";
import FormSubmit from "@/components/form-submit";
import FormTextarea from "@/components/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hoooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import Actions from "./actions";

type DescriptionProps = {
  data: CardWithList;
};
const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { execute, fieldErrors, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      disableEditing();
      toast.success(`Card "${data.title}" updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const textareRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareRef.current?.focus();
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
    const description = formData.get("description") as string;
    const boardId = params.id as string;

    // Execute
    execute({
      id: data.id,
      boardId,
      description,
    });
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700s" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2 text-sm">
          Description
        </p>
        {isEditing ? (
          <form ref={formRef} className="space-y-2" action={onSubmit}>
            <FormTextarea
              name="description"
              id="description"
              defaultValue={data.description || undefined}
              placeholder="Add a more detailed description"
              errors={fieldErrors}
              ref={textareRef}
              className="resize-y"
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit disabled={isLoading}>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
            onClick={enableEditing}
          >
            {data.description || "Add a more detailed description"}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full ">
        <Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};

export default Description;
