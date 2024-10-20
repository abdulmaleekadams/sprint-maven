import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./form-errors";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FormInputProps = {
  id: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  errors?: Record<string, string[] | undefined>;
  name: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      className,
      defaultValue = "",
      disabled,
      onBlur,
      placeholder,
      required,
      type,
      errors,
      name,
      containerClassName,
      label,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className={cn("space-y-2", containerClassName)}>
        <div className="space-y-1">
          {label && <Label className="text-sm font-semibold">{label}</Label>}
          <Input
            onBlur={onBlur}
            ref={ref}
            required={required}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn("text-sm ", className)}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
            name={name}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
export default FormInput;
