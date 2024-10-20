"use client";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { addDays, format, formatDistance } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { KeyboardEventHandler, forwardRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { useFormStatus } from "react-dom";
import FormErrors from "./form-errors";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Popover, PopoverTrigger } from "./ui/popover";

type FormCalendarRangeProps = {
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

const FormCalendarRange = forwardRef<HTMLButtonElement, FormCalendarRangeProps>(
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
    const currentDate = new Date();
    const [date, setDate] = useState<DateRange | undefined>({
      from: currentDate,
      to: addDays(currentDate, 90),
    });

    return (
      <div className="space-y-2 w-full">
        <div className="w-full space-y-1">
          {label && (
            <Label className="text-sm font-semibold">
              {label}
              {date && date.from && date.to && (
                <span className="ml-3 text-muted-foreground">
                  ({formatDistance(date?.from, date?.to)})
                </span>
              )}
            </Label>
          )}
          <div className={cn("grid gap-2", className)}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  ref={ref}
                  className={cn(
                    "min-w-[240px] pl-3 text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card rounded-md">
                <Calendar
                  id={id}
                  aria-describedby={`${id}-error`}
                  mode="range"
                  selected={date}
                  defaultMonth={date?.from}
                  numberOfMonths={2}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <FormErrors errors={errors} id={id} />
      </div>
    );
  }
);

FormCalendarRange.displayName = "FormCalendarRange";

export default FormCalendarRange;
