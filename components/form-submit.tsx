'use client'
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type FormSubmitProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "secondary"
    | "primary";
};
const FormSubmit = ({
  children,
  className,
  variant,
  disabled,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      variant={variant}
      className={cn(className)}
      disabled={pending || disabled}
      size={'sm'}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
