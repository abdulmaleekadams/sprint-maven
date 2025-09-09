import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface TextareaFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>; // Form instance type is generic based on your form data shape
  name: FieldPath<T>; // Name of the field (inferred from form data type)
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  textareaClassname?: string;
}

const TextareaField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "",
  description,
  className,
  textareaClassname,
}: TextareaFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="font-medium">{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={textareaClassname}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaField;
