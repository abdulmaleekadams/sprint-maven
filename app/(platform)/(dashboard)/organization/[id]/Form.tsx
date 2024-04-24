"use client";
import { useAction } from "@/hoooks/use-action";
import { createBoard } from "@/actions/create-board";
import FormButton from "../../../../../components/form-button";
import FormInput from "@/components/form-input";

const Form = () => {
  const { execute, fieldErrors, isLoading } = useAction(createBoard, {
    onSuccess: (data) => console.log("SUCCESS!", data),
    onError: (error) => console.error(error),
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    console.log(title);

    execute({ title });
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
