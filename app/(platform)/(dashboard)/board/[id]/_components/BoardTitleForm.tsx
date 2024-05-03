"use client";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { useRef, useState } from "react";

type BoardNavbarProps = {
  data: Board;
};
const BoardTitleForm = ({ data }: BoardNavbarProps) => {
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
    formRef.current?.requestSubmit()
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    console.log("Submitted ", title);
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
          defaultValue={data.title}
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
      {data.title}
    </Button>
  );
};

export default BoardTitleForm;
