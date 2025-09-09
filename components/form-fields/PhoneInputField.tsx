import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { PhoneInput } from "../shared/phone-input";

interface PhoneInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string | React.ReactNode;
  showDescriptionAfterLabel?: boolean;
  triggerBtnclassName?: string;
  inputClassName?: string;
}

const PhoneInputField = <T extends FieldValues>({
  form,
  name,
  description,
  label,
  inputClassName,
  triggerBtnclassName,
}: PhoneInputFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <PhoneInput
              triggerBtnclassName={triggerBtnclassName}
              inputClassName={inputClassName}
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

export default PhoneInputField;
