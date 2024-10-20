import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = event.target;
      textarea.style.height = "auto"; // Reset the height first
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height based on the scroll height
    };

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onInput={handleInput}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
