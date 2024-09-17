"use client";
import { createBoard } from "@/actions/create-board";
import FormInput from "@/components/form-input";
import { useAction } from "@/hoooks/use-action";
import { toast } from "sonner";
import FormButton from "../../../../../components/form-button";

const Form = () => {
  const { execute, fieldErrors, isLoading } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success(`${data.title} board created`);
    },
    onError: (error) => console.error(error),
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  };
  return (
    <form action={onSubmit}>
      <div className="flex  gap-x-2">
        <FormInput
          id="title"
          name="title"
          errors={fieldErrors}
          disabled={isLoading}
          placeholder="Board title"
          label="Board Title"
        />
        <FormButton isDisabled={isLoading}>Create Board</FormButton>
      </div>
    </form>
  );
};

export default Form;
