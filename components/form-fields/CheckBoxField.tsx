"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

// Define CheckboxFieldProps that omits 'form' and 'name' from base props
interface CheckboxFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  description?: string | React.ReactNode;
}

const CheckboxField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
}: CheckboxFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start  space-x-3 rounded-md p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-checked={field.value}
              id={name} // Associates label with checkbox
            />
          </FormControl>
          <div className=" !mt-0 flex flex-col gap-1">
            <FormLabel className="" htmlFor={name}>
              {label}
            </FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

CheckboxField.displayName = "CheckboxField";

export default CheckboxField;
