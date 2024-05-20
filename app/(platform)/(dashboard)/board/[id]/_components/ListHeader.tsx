"use client";
import { updateList } from "@/actions/update-list";
import FormInput from "@/components/form-input";
import { useAction } from "@/hoooks/use-action";
import { List } from "@prisma/client";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import ListOptions from "./ListOptions";

type ListHeaderProps = {
  data: List;
  onAddCard: () => void;
};
const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { execute, isLoading } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Rename to "${data.title}`);
      setTitle(data.title);
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
      formRef.current?.requestSubmit();
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onBlur = () => {
    console.log("onblur");

    formRef.current?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ title, id, boardId: data.boardId });
  };

  

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2">
      {isEditing ? (
        <form ref={formRef} className="flex-1 px-[2px]" action={onSubmit}>
          <FormInput
            name="title"
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            placeholder="Enter list title"
            // errors={fieldErrors}
            defaultValue={title}
            onBlur={onBlur}
          />
          <input type="hidden" name="boardId" value={data.boardId} />
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          className="w-full text-sm px-2.5 py-1 font-medium border-transparent"
          onClick={enableEditing}
        >
          {title}
        </div>
      )}

      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};

export default ListHeader;
