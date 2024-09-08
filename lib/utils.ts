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

export const generatePastelColor = (digit: number) => {
  // Ensure the input digit is between 0 and 9
  const normalizedDigit = digit % 10;

  // Map the digit to a hue value (0-360)
  const hue = normalizedDigit * 36; // Each digit will give a different hue

  // Use fixed values for saturation and lightness to get a pastel color
  const saturation = 50; // Pastel colors typically have low saturation
  const lightness = 85; // Pastel colors are generally very light

  // Generate the HSL color
  const pastelColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return pastelColor;
};

export const getOrdinalSuffix = (number: number) => {
  const remainder = number % 10;
  const remainderHundred = number % 100;

  if (remainder === 1 && remainderHundred !== 11) {
    return `${number}st`;
  } else if (remainder === 2 && remainderHundred !== 12) {
    return `${number}nd`;
  } else if (remainder === 3 && remainderHundred !== 13) {
    return `${number}rd`;
  } else {
    return `${number}th`;
  }
};
