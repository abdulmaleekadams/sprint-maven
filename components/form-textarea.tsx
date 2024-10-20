"use client";
import { cn } from "@/lib/utils";
import { KeyboardEventHandler, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "./form-errors";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type FormTextareaProps = {
  id: string;
  label?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  onClick?: () => void;
  onKeydown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  errors?: Record<string, string[] | undefined>;
  name?: string;
};

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      className,
      defaultValue,
      disabled,
      errors,
      label,
      onBlur,
      onClick,
      onKeydown,
      placeholder,
      required,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="w-full space-y-1">
          {label && <Label className="text-sm font-semibold ">{label}</Label>}
          <Textarea
            ref={ref}
            onKeyDown={onKeydown}
            name={id}
            onClick={onClick}
            onBlur={onBlur}
            defaultValue={defaultValue}
            required={required}
            disabled={pending || disabled}
            placeholder={placeholder}
            id={id}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextArea";

export default FormTextarea;
