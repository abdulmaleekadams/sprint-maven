import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// Omit both 'name' and 'form' from the base input props
interface DateFieldProps<T extends FieldValues>
  extends Omit<React.ComponentProps<"input">, "name" | "type" | "form"> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string | React.ReactNode;
  placeholder?: string;
  disableFutureDate?: boolean;
}

const DateField = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  disableFutureDate = true,
}: DateFieldProps<T>) => {
  const [open, setOpen] = React.useState(false); // Add state for popover

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full ">
          {label && <FormLabel className="font-medium">{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder ?? "Pick a date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false); // ✅ Close popover on select
                }}
                disabled={
                  disableFutureDate
                    ? (date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    : undefined
                }
                fromYear={1900}
                toYear={new Date().getFullYear()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DateField.displayName = "DateField";

export default DateField;
