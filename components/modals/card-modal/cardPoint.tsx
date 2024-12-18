import { updateCard } from "@/actions/update-card";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hoooks/use-action";
import { cn, generatePastelColor } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CardPoint = ({ point, cardId }: { point: number; cardId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [velocity, setVelocity] = useState(point.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const params = useParams();

  const labelColor = generatePastelColor(point);

  const { execute, fieldErrors, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      disableEditing();
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
      data.point
        ? toast.success(`Story point updated to "${data.point}"`)
        : toast.success(`Story point removed`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    if (isLoading) return;
    setIsEditing(true); // Set isEditing to true
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
    inputRef.current?.form?.reset();
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.currentTarget);

    const velocity = formData.get("velocity") as string;
    const boardId = params.id as string;

    if (Number(velocity) === point) {
      disableEditing();
      return;
    }

    setVelocity(velocity);

    execute({ boardId, point: Number(velocity), id: cardId });
  };

  const removePoint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const boardId = params.id as string;
    execute({ boardId, point: null, id: cardId });
  };

  return isEditing ? (
    <form className="max-w-20" onSubmit={onSubmit}>
      <FormInput
        ref={inputRef}
        name="velocity"
        id="velocity"
        defaultValue={velocity}
        className={cn(
          "font-semibold text-base px-2 h-auto py-1 w-24 border-opacity-30 text-center3rd !border relative focus-visible:ring-0 focus-visible:border-input mb-0.5"
        )}
        onBlur={disableEditing}
        disabled={isLoading}
      />
    </form>
  ) : (
    <div
      className="w-24 h-9 px-2 p-1 text-center text-black font-medium rounded-sm cursor-pointer  group flex items-center justify-between"
      style={{
        backgroundColor: labelColor,
      }}
    >
      <p
        className="text-center font-medium flex-1 text-base"
        onClick={enableEditing}
        tabIndex={0} // Ensures onBlur can be fired
        onBlur={disableEditing}
      >
        {point}
      </p>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        className="w-auto h-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-colors duration-500 hover:text-white hover:bg-black/30"
        disabled={isLoading}
        onClick={removePoint}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CardPoint;
