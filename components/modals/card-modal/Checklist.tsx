import { Checkbox } from "@/components/ui/checkbox";
import { CheckCheckIcon, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import CheckItem from "./CheckItem";
import { Checklist as ChecklistType } from "@/types";
import FormInput from "@/components/form-input";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAction } from "@/hoooks/use-action";
import { createChecklistItem } from "@/actions/create-checklist-item";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEventListener } from "usehooks-ts";
import { Progress } from "@/components/ui/progress";
import { CheckItems } from "@prisma/client";
import { calcCheckedItemProps } from "@/lib/utils";

const Checklists = ({
  data,
  cardId,
}: {
  data: ChecklistType[];
  cardId: string;
}) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [showInputForm, setShowInputForm] = useState(false);

  const { execute, fieldErrors, isLoading } = useAction(createChecklistItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });
      toast.success(`Checklist "${data.title}" added`);
      formRef.current?.reset();
      setShowInputForm(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowInputForm(false);
    }
  };

  useEffect(() => {
    if (showInputForm) {
      inputRef?.current?.focus();
    }
  }, [showInputForm]);

  useEventListener("keydown", onKeyDown);

  const onSubmit = (formData: FormData, checklistId: string) => {
    const title = formData.get("title") as string;
    const boardId = params.id as string;

    execute({ cardId, boardId, title, checklistId });
  };

  

  return (
    <div className="flex flex-col gap-4 pt-5 border-t">
      {data.map((checklist) => (
        <div className="flex items-start gap-x-3 w-full ">
          <CheckCheckIcon className="h-5 w-5 mt-0.5 text-neutral-700s" />
          <div className="w-full">
            <p className="font-semibold text-neutral-700 mb-2 text-sm">
              {checklist.title}
            </p>
            <Progress
              value={calcCheckedItemProps(checklist.checkItems)}
              className="h-1"
            />
            {checklist.checkItems.length > 0 ? (
              <>
                {checklist.checkItems.map((item) => (
                  <div key={item.id}>
                    <CheckItem data={item} cardId={cardId} />
                  </div>
                ))}
                {showInputForm ? (
                  <form
                    ref={formRef}
                    action={(formData) => onSubmit(formData, checklist.id)}
                    className="space-y-4"
                  >
                    <FormInput
                      id="title"
                      name="title"
                      placeholder="Title"
                      errors={fieldErrors}
                      ref={inputRef}
                      disabled={isLoading}
                    />
                  </form>
                ) : (
                  <Button
                    className="h-auto py-2  gap-2 mt-2 "
                    onClick={() => {
                      setShowInputForm(true);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </Button>
                )}
              </>
            ) : (
              <form
                ref={formRef}
                action={(formData) => onSubmit(formData, checklist.id)}
                className="space-y-4"
              >
                <FormInput
                  id="title"
                  name="title"
                  placeholder="Title"
                  errors={fieldErrors}
                />
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checklists;
