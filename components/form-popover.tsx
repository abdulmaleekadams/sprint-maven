"use client";

import { useAction } from "@/hoooks/use-action";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import FormInput from "./form-input";
import FormSubmit from "./form-submit";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { useRef } from "react";
import { useRouter } from "next/navigation";

type FormPopoverProps = {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "end" | "center";
};

const FormPopover = ({
  align = "start",
  children,
  side = "bottom",
  sideOffset = 0,
}: FormPopoverProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const { execute, fieldErrors, isLoading } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("New board created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 !outline-none !border-none focus-visible:ring-0 focus-visible:ring-transparente"
            variant={"ghost"}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4 mt-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              name="title"
              placeholder="Board title"
              errors={fieldErrors}
            />
          </div>
          <div>
            <FormSubmit disabled={isLoading} className="w-full">
              Create
            </FormSubmit>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
