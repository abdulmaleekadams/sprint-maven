"use client";

import { createBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

type AddBoardFormProps = {};

const AddBoardForm = () => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);
  return (
    <div>
      <form action={dispatch}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Board title"
          className="p-1 border rounded-md border-black"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddBoardForm;
