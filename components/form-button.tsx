import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type FormButtonProps = {
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
};
const FormButton = ({  isDisabled, children, className, variant }: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || isDisabled}
      variant={variant}
      className={cn(className)}
    >
     {children}
    </Button>
  );
};

export default FormButton;
