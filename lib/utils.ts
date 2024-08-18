import { CheckItems } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calcCheckedItemProps = (items: CheckItems[]) => {
  const done = items.filter((item) => item.checked === true);

  const percent = (done.length / items.length) * 100;

  return Math.ceil(percent);
};

export const calcCheckedListItemProps = (
  items: Array<{
    checkItems: CheckItems[];
  }>
) => {
  // Flatten the checkItems from all items into a single array
  const allCheckItems = items.flatMap((item) => item.checkItems);

  // Filter out the checked items
  const done = allCheckItems.filter((checkItem) => checkItem.checked);

  // Calculate the percentage of checked items
  const percent = (done.length / allCheckItems.length) * 100;

  return Math.ceil(percent);
};

