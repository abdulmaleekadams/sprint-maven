import { updateCard } from "@/actions/update-card";
import { useAction } from "@/hoooks/use-action";
import { cn, getOrdinalSuffix } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CardPriority = ({
  priority,
  cardId,
}: {
  priority: number;
  cardId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute, fieldErrors, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      disableEditing();
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });

      data.point
        ? toast.success(`Story updated to "${data.priority}"`)
        : toast.success(`Story priority removed`);
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

  const removePriority = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const boardId = params.id as string;
    execute({ boardId, priority: null, id: cardId });
  };

  return (
    <div
      className={cn(
        "rounded-sm h-9 flex items-center justify-center font-medium",
        priority === 1 &&
          "bg-gradient-to-r to-red-800 from-[#FF4C4C] hover:bg-[#FF4C4C] text-white",
        priority === 2 &&
          "bg-gradient-to-r  to-orange-800 from-[#FFA500] hover:bg-[#FFA500] text-white",
        priority === 3 &&
          "from-yellow-500 bg-gradient-to-r to-yellow-800  hover:bg-yellow-500 text-white",
        priority === 4 &&
          "from-[#32CD32] bg-gradient-to-r  to-green-800 hover:bg-[#32CD32] text-white",
        priority === 5 &&
          "bg-gradient-to-r from-[#1E90FF] to-blue-800 hover:bg-[#1E90FF] text-white"
      )}
    >
      <p className="text-base px-3 py-1 text-center ">{`${getOrdinalSuffix(
        priority
      )} Priority`}</p>
    </div>
  );
};

export default CardPriority;
