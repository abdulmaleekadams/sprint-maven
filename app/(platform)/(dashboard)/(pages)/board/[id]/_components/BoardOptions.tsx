"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hoooks/use-action";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

type BoardOptionsProps = {
  id: string;
};

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDelete = () => {
    execute({ id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center  pb-4 text-neutral-600">
          Board actions
        </div>

        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>

        <Button
          onClick={handleDelete}
          className="rounded-none w-full h-auto py-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
          disabled={isLoading}
        >
          Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
