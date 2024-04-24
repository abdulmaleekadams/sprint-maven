"use client";

import { createBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import FormInput from "./FormInput";

type AddBoardFormProps = {};

const AddBoardForm = () => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);
  const { pending } = useFormStatus();

  return (
    <div>
      <form action={dispatch} className="flex  gap-2">
        <FormInput errors={state?.errors} isDisabled={pending} />
        <Button type="submit" disabled={pending}>
          Create Board
        </Button>
      </form>
    </div>
  );
};



export default AddBoardForm;
