import FormInput from "@/components/form-input";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

const CardPoint = ({ point, cardId }: { point: number; cardId: string }) => {
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(point.toString());

  const onSubmit = (formData: FormData) => {
    // const title = formData.get("title") as string;
    // const boardId = params.id as string;

    // if (Number(title) === point) {
    //   return disableEditing();
    // }
    console.log("hii");
  };
  const queryClient = useQueryClient();
  const params = useParams();
  return isEditing ? (
    <form className="max-w-20" action={onSubmit}>
      <FormInput
        ref={inputRef}
        name="title"
        id="title"
        defaultValue={title}
        className="font-semibold text-base px-1 h-auto border-orange-500  py-0 w-20 text-orange-500 !border bg-transparent  relative  focus-visible:bg-white focus-visible:border-input mb-0.5"
      />
    </form>
  ) : (
    <p
      className="bg-orange-500 w-max px-2 text-white font-medium rounded-sm"
      onClick={enableEditing}
      onBlur={disableEditing}
    >
      {point}
    </p>
  );
};

export default CardPoint;
