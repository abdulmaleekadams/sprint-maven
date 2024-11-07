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

export const getInitials = (name: string) => {
  return name
    .split(" ") // Split the name by spaces
    .slice(0, 2) // Take only the first two words
    .map((word) => word[0].toUpperCase()) // Get the first letter of each word and convert it to uppercase
    .join(""); // Join the initials together
};

// Utility function to convert hex color to RGB
export function hexToRgb(hex: string) {
  // Remove the '#' if present
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values from the hex string
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}

// Utility function to calculate perceived lightness
export function calculatePerceivedLightness(r: number, g: number, b: number) {
  return (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
}

export const getTagBgColor = (color: string) => {
  const [r, g, b] = hexToRgb(color);
  const perceivedLightness = calculatePerceivedLightness(r, g, b);

  const lightnessThreshold = 0.6;
  const backgroundAlpha = 0.06;
  const borderAlpha = 0.3;
  const lightenBy = (lightnessThreshold - perceivedLightness) * 100;

  const backgroundColor = `rgba(${r}, ${g}, ${b}, ${backgroundAlpha})`;

  return backgroundColor;
};
