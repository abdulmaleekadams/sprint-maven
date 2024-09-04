"use client";
import { deleteCheckitem } from "@/actions/delete-checkitem";
import { updateChecklistItem } from "@/actions/update-checklist-item";
import FormSubmit from "@/components/form-submit";
import FormTextarea from "@/components/form-textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hoooks/use-action";
import { cn } from "@/lib/utils";
import { CheckItems } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
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
  const inputRef = useRef<HTMLTextAreaElement>(null);
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

  const { execute: executeDeleteCheckitem } = useAction(deleteCheckitem, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["checklists", cardId],
      });
      toast.success(`Checkitem ${data.title} deleted`);
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

  const handleDelete = ({
    checklistId,
    id,
  }: {
    checklistId: string;
    id: string;
  }) => {
    executeDeleteCheckitem({ checklistId, id });
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
            <div>
              <FormTextarea
                name="title"
                id="title"
                defaultValue={data.title || undefined}
                placeholder="Add a title"
                errors={fieldErrors}
                ref={inputRef}
                className="py-2 h-auto w-full"
              />
              <div className="mt-2 flex gap-3">
                <FormSubmit>Save</FormSubmit>
                <Button size="sm" onClick={disableEditing}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between hover:bg-neutral-100 px-2 cursor-pointer group">
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
              <Popover>
                <PopoverTrigger className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-4 h-4" />
                </PopoverTrigger>
                <PopoverContent>
                  <p className=" mb-4 w-full font-semibold text-sm ">
                    Item actions
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button className="" variant="outline" size="sm">
                      Make a card
                    </Button>
                    <Button
                      className=""
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleDelete({
                          checklistId: data.checklistId,
                          id: data.id,
                        })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckItem;
