import { Input } from "@/components/ui/input";
import React from "react";
type FormInputProps = {
  errors?: {
    title?: string[];
  };
  isDisabled: boolean
};

const FormInput = ({ errors, isDisabled }: FormInputProps) => {
  return (
    <div >
      <Input
        type="text"
        id="title"
        name="title"
        placeholder="Board title"
        disabled={isDisabled}
      />
      {errors?.title && (
        <div>
          {errors.title.map((error: string) => (
            <p key={error} className="text-rose-500 text-xs">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormInput;
