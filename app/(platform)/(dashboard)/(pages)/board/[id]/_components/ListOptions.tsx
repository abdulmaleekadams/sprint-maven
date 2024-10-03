"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import FormSubmit from "@/components/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hoooks/use-action";
import { Card, List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

type ListOptionsProps = {
  data: List;
  onAddCard: () => void;
};

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const { execute: executeDelete, isLoading: onListDeleteLoading } = useAction(
    deleteList,
    {
      onSuccess: (data) => {
        toast.success(`Deleted "${data.title} list`);
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeCopy, isLoading: onListCopyLoading } = useAction(
    copyList,
    {
      onSuccess: (data) => {
        toast.success(`Copied "${data.title} list`);
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onListDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };
  const onListCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button asChild className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List Actions
        </div>

        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto py-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>

        <form action={onListCopy}>
          <input type="hidden" name="id" value={data.id} />
          <input type="hidden" name="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full h-auto py-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
            disabled={onListDeleteLoading}
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onListDelete}>
          <input type="hidden" name="id" value={data.id} />
          <input type="hidden" name="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full h-auto py-2 px-5 justify-start font-normal text-sm text-red-500"
            variant="ghost"
            disabled={onListDeleteLoading}
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
