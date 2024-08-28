import { updateCard } from "@/actions/update-card";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hoooks/use-action";
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

  const { execute, fieldErrors, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      disableEditing();
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
      console.log(data);

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
        className="font-semibold text-base px-1 h-auto border-orange-500  py-0 w-20 text-orange-500 !border bg-transparent  relative  focus-visible:bg-white focus-visible:border-input mb-0.5"
        onBlur={disableEditing}
        disabled={isLoading}
      />
    </form>
  ) : (
    <div className="bg-orange-500 w-20 px-2 text-center text-white font-medium rounded-sm cursor-pointer  group flex items-center justify-between">
      <p
        className="text-center text-white font-medium flex-1"
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
