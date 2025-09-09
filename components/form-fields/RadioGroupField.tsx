/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface RadioGroupOption {
  value: any;
  label: string;
  description?: string | React.ReactNode;
}

interface RadioGroupFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  options: RadioGroupOption[];
  className?: string;
  radioGroupClassName?: string;
}

const RadioGroupField = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  className,
  radioGroupClassName,
}: RadioGroupFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          {label && <FormLabel className="font-medium">{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex flex-col space-y-1", radioGroupClassName)}
            >
              {options?.map((option) => (
                <FormItem
                  key={option.value}
                  className={cn(
                    "flex space-x-3 item-center space-y-0 border",
                    className
                  )}
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} className="" />
                  </FormControl>

                  <div className="">
                    <FormLabel className="font-medium h-full">
                      {option.label}
                    </FormLabel>
                    {option.description && (
                      <FormDescription>{option.description}</FormDescription>
                    )}
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

RadioGroupField.displayName = "RadioGroupField";

export default RadioGroupField;
