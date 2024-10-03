import React, { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormSelectProps = {
  id: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  form: UseFormReturn<any, any, undefined>;
  className?: string;
  containerClassName?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  errors?: Record<string, string[] | undefined>;
  name: string;
};

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
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
      form,
      label,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel className={cn(showLabel ? "not-sr-only" : "sr-only")}>
            {labelTitle}
          </FormLabel> */}
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger name={name} id={id}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent></SelectContent>
            </Select>

            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    );
  }
);
FormSelect.displayName = "FormSelect";
export default FormSelect;
