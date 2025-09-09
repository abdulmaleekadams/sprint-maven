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
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from "react-hook-form";

export interface ComboboxOption {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ComboboxFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  emptyText?: string;
  name: FieldPath<T>;
  label?: string;
  options: ComboboxOption[];
  labelKey?: string; // The key used to display the option label
  valueKey?: string; // The key used to set the option value
  idKey?: string; // The key used to set the option value
  description?: string;
  descriptionKey?: string;
  placeholder?: string;
  className?: string;
  infoKey?: string;
  imgIconKey?: string;
  onValueChange?: (value: ComboboxOption) => void;
  useLabelKeyForSearch?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const ComboboxField = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  labelKey = "label", // Default key for label
  valueKey = "value", // Default key for value
  description,
  infoKey,
  descriptionKey,
  imgIconKey,
  className,
  placeholder = "Select an option",
  emptyText = "No options Found",
  onValueChange,
  useLabelKeyForSearch,
  disabled,
  isLoading,
}: ComboboxFieldProps<T>) => {
  const triggerBtnRef = useRef<HTMLButtonElement>(null);

  const [triggerBtnWidth, setTriggerBtnWidth] = useState(0);

  useEffect(() => {
    // Initial width measurement
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
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel className="font-medium">{label}</FormLabel>}
          <Popover modal>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button"
                  variant="outline"
                  ref={triggerBtnRef}
                  role="combobox"
                  className={cn(
                    "py-5 justify-between w-full",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={disabled}
                >
                  <p className="overflow-ellipsis line-clamp-1">
                    {field.value
                      ? (() => {
                          const selectedOption = options?.find(
                            (option) => option[valueKey] === field.value
                          );

                          console.log(selectedOption, imgIconKey);

                          return selectedOption
                            ? `${selectedOption[labelKey]} ${
                                infoKey ? `(${selectedOption[infoKey]})` : ""
                              }`
                            : placeholder;
                        })()
                      : placeholder}
                  </p>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-full p-0"
              style={{
                width: triggerBtnWidth,
              }}
            >
              <Command defaultValue={field.value} className={className}>
                <CommandInput placeholder="Search..." className="h-9" />
                <CommandList>
                  <CommandEmpty>{emptyText}</CommandEmpty>

                  <PopoverClose className="w-full">
                    <CommandGroup>
                      {isLoading ? (
                        <div>
                          <p className="animate-pulse text-sm">Loading..</p>
                        </div>
                      ) : (
                        options?.map((option) => (
                          <CommandItem
                            value={
                              useLabelKeyForSearch
                                ? option[labelKey]
                                : option[valueKey]
                            }
                            key={option[valueKey]}
                            onSelect={() => {
                              form.setValue(
                                name,
                                option[valueKey] as PathValue<T, FieldPath<T>>
                              );
                              if (onValueChange) onValueChange(option);
                            }}
                          >
                            {descriptionKey ? (
                              <div className="flex flex-col w-full">
                                <div className="flex w-full gap-2 justify-between">
                                  <div className="flex flex-1 gap-2 font-medium">
                                    {imgIconKey && (
                                      <img
                                        src={option[imgIconKey]}
                                        className="w-4 h-4 object-cover"
                                        alt=""
                                      />
                                    )}
                                    {`${option[labelKey]} ${
                                      infoKey ? `(${option[infoKey]})` : ""
                                    }`}
                                  </div>
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      option[valueKey] === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </div>
                                <p className="text-neutral-500 w-full text-left text-xs">
                                  {option[descriptionKey]}
                                </p>
                              </div>
                            ) : (
                              <>
                                {imgIconKey && (
                                  <img
                                    src={option[imgIconKey]}
                                    className="w-4 h-4 object-cover"
                                    alt=""
                                  />
                                )}
                                {`${option[labelKey]} ${
                                  infoKey ? `(${option[infoKey]})` : ""
                                }`}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    option[valueKey] === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </>
                            )}
                          </CommandItem>
                        ))
                      )}
                    </CommandGroup>
                  </PopoverClose>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ComboboxField.displayName = "ComboboxField";

export default ComboboxField;
