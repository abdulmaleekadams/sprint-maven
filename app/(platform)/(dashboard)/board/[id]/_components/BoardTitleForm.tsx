"use client";
import { updateBoard } from "@/actions/update-board";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hoooks/use-action";
import { Board } from "@prisma/client";
import { useRef, useState } from "react";
import { toast } from "sonner";

type BoardNavbarProps = {
  data: Board;
};
const BoardTitleForm = ({ data }: BoardNavbarProps) => {
  const [title, setTitle] = useState(data.title);
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data.id });
  };
  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="title"
          name="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold  h-7 w-auto py-1 px-[7px] bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
          ref={inputRef}
        />
      </form>
    );
  }
  return (
    <Button
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant={"transparent"}
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
