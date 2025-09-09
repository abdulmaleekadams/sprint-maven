/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/hooks";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

export interface MultiSelectOption {
  [key: string]: any;
}

interface MultiSelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  options: MultiSelectOption[];
  labelKey?: string;
  valueKey?: string;
  infoKey?: string;
  description?: string;
  placeholder?: string;
  emptyText?: string;
  className?: string;
  labelClassName?: string;
  triggerBtnClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const MultiSelectField = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  labelKey = "label",
  valueKey = "value",
  infoKey,
  description,
  placeholder = "Select options",
  emptyText = "No options found",
  className,
  labelClassName,
  triggerBtnClassName,
  disabled,
  isLoading,
}: MultiSelectFieldProps<T>) => {
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const [triggerBtnWidth, setTriggerBtnWidth] = useState(0);
  const {
    modalOptions: { open },
  } = useAppSelector((state) => state.modal);

  useEffect(() => {
    if (triggerBtnRef.current) {
      setTriggerBtnWidth(triggerBtnRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const currentBtn = triggerBtnRef.current;
      if (currentBtn) {
        setTriggerBtnWidth(currentBtn.clientWidth);
      }
    });

    const currentBtn = triggerBtnRef.current;
    if (currentBtn) {
      resizeObserver.observe(currentBtn);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (currentBtn) {
        resizeObserver.unobserve(currentBtn);
      }
    };
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selectedValues: string[] = field.value || [];

        const toggleValue = (val: string) => {
          const newValues = selectedValues.includes(val)
            ? selectedValues.filter((v) => v !== val)
            : [...selectedValues, val];
          form.setValue(name, newValues as PathValue<T, FieldPath<T>>);
          form.trigger();
        };

        return (
          <FormItem className="w-full ">
            {label && (
              <FormLabel className={cn("font-medium", labelClassName)}>
                {label}
              </FormLabel>
            )}
            <Popover modal={open}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    ref={triggerBtnRef}
                    role="combobox"
                    className={cn(
                      "py-5 justify-between w-full overflow-hidden",
                      !selectedValues.length && "text-muted-foreground",
                      triggerBtnClassName
                    )}
                    disabled={disabled}
                  >
                    <p className="overflow-ellipsis line-clamp-1 text-left w-full">
                      {selectedValues.length > 0
                        ? options
                            .filter((opt) =>
                              selectedValues.includes(opt[valueKey])
                            )
                            .map((opt) => opt[labelKey])
                            .join(", ")
                        : placeholder}
                    </p>
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="w-full p-0"
                style={{ width: triggerBtnWidth }}
              >
                <Command className={className}>
                  <CommandInput placeholder="Search..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>{emptyText}</CommandEmpty>
                    <CommandGroup>
                      {isLoading ? (
                        <p className="animate-pulse text-sm px-4 py-2">
                          Loading...
                        </p>
                      ) : (
                        options.map((option) => {
                          const optionVal = option[valueKey];
                          const isSelected = selectedValues.includes(optionVal);
                          return (
                            <CommandItem
                              key={optionVal}
                              value={option[labelKey]}
                              onSelect={() => toggleValue(optionVal)}
                            >
                              {infoKey
                                ? `${option[labelKey]} - ${option[infoKey]}`
                                : option[labelKey]}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  isSelected ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          );
                        })
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

MultiSelectField.displayName = "MultiSelectField";
export default MultiSelectField;
