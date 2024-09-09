import { createChecklistItem } from "@/actions/create-checklist-item";
import { deleteChecklist } from "@/actions/delete-checklist";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAction } from "@/hoooks/use-action";
import { calcCheckedItemProps } from "@/lib/utils";
import { Checklist as ChecklistType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCheckIcon, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import CheckItem from "./CheckItem";

const Checklists = ({
  data,
  cardId,
}: {
  data: ChecklistType[];
  cardId: string;
}) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [activeChecklistId, setActiveChecklistId] = useState<string | null>(
    null
  );

  const { execute, fieldErrors, isLoading } = useAction(createChecklistItem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["checklists", cardId],
      });
      toast.success(`Checklist "${data.title}" added`);
      formRef.current?.reset();
      setActiveChecklistId(null);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeDeleteChecklist } = useAction(deleteChecklist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["checklists", cardId],
      });
      toast.success(`Checklist  added`);
      formRef.current?.reset();
      setActiveChecklistId(null);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActiveChecklistId(null);
    }
  };

  useEffect(() => {
    if (activeChecklistId) {
      inputRef?.current?.focus();
    }
  }, [activeChecklistId]);

  useEventListener("keydown", onKeyDown);

  const onSubmit = (formData: FormData, checklistId: string) => {
    const title = formData.get("title") as string;
    const boardId = params.id as string;

    execute({ cardId, boardId, title, checklistId });
  };

  const handleDeleteChecklist = (id: string) => {
    executeDeleteChecklist({ id, cardId });
  };

  return (
    <div className="flex flex-col gap-4 pt-5 border-t">
      {data.map((checklist) => (
        <div key={checklist.id} className="flex items-start gap-x-3 w-full">
          <CheckCheckIcon className="h-5 w-5 mt-0.5 text-neutral-700s" />
          <div className="w-full">
            <div className="flex justify-between">
              <p className="font-semibold text-neutral-700 mb-2 text-sm">
                {checklist.title}
              </p>
              <Button
                className="h-auto"
                size="sm"
                onClick={() => handleDeleteChecklist(checklist.id)}
              >
                Delete
              </Button>
            </div>
            {checklist.checkItems.length > 0 ? (
              <>
                <Progress
                  value={calcCheckedItemProps(checklist.checkItems)}
                  className="h-1 my-4"
                />
                {checklist.checkItems.map((item) => (
                  <div key={item.id}>
                    <CheckItem data={item} cardId={cardId} />
                  </div>
                ))}
                {activeChecklistId === checklist.id ? (
                  <form
                    ref={formRef}
                    action={(formData) => onSubmit(formData, checklist.id)}
                    className="space-y-4"
                    onBlur={() => setActiveChecklistId(null)}
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
                    className="h-auto py-2 gap-2 mt-2"
                    onClick={() => {
                      setActiveChecklistId(checklist.id);
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
                className="space-y-4 mt-4"
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
