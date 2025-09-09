import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { HTMLInputTypeAttribute, useState } from "react";
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { Button } from "../ui/button";

// Omit both 'name' and 'form' from the base input props
interface InputFieldProps<T extends FieldValues>
  extends Omit<React.ComponentProps<"input">, "name" | "type" | "form"> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  containerClassName?: string;
  description?: string | React.ReactNode;
  formatAsNumber?: boolean;
  showDescriptionAfterLabel?: boolean;
  type?: HTMLInputTypeAttribute;
  formatAsCurrency?: boolean;
}

const InputField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  type = "text",
  className,
  containerClassName,
  showDescriptionAfterLabel,
  formatAsCurrency,
  formatAsNumber,
  ...props
}: InputFieldProps<T>) => {
  const [inputType, setInputType] = useState(type);

  const formatCurrency = (value: string) => {
    value = value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except dot

    // Prevent multiple decimal points
    const dotCount = (value.match(/\./g) || []).length;
    if (dotCount > 1) {
      value = value.replace(/\.+$/, ""); // Remove extra dots
    }

    if (value) {
      const parts = value.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas to integer part

      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2); // Limit to two decimal places
      }

      return parts.join(".");
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (formatAsCurrency) {
      value = formatCurrency(value);
    }
    if (formatAsNumber) {
      value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    }
    form.setValue(name, value as unknown as PathValue<T, Path<T>>);
    form.trigger(name);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full ", containerClassName)}>
          {label && <FormLabel className="font-medium">{label}</FormLabel>}
          {showDescriptionAfterLabel && description && (
            <FormDescription>{description}</FormDescription>
          )}

          <FormControl>
            <div className="relative ">
              <Input
                {...field}
                type={inputType}
                {...props} // Spread additional props
                onChange={handleChange}
                className={cn(
                  "py-5 ring-0 placeholder:font-light placeholder:text-sm text-sm",
                  className
                )}
              />
              {type === "password" && (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="hover:bg-transparent absolute top-1/2 -translate-y-1/2 right-2"
                  onClick={() =>
                    setInputType(inputType === type ? "text" : type)
                  }
                >
                  {inputType === type ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              )}
            </div>
          </FormControl>
          {!showDescriptionAfterLabel && description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

InputField.displayName = "InputField";

export default InputField;
