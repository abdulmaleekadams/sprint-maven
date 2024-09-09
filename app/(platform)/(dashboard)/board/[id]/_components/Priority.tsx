import { updateCard } from "@/actions/update-card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hoooks/use-action";
import { getOrdinalSuffix } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Dot, Zap } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const Priority = ({
  initialPriority,
  cardId,
}: {
  initialPriority: number;
  cardId: string;
}) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const { execute, fieldErrors, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });

      data.priority
        ? toast.success(
            `Story priority updated to "${getOrdinalSuffix(
              data.priority
            )}" priority`
          )
        : toast.success(`Story priority removed`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (
    event: React.MouseEvent<HTMLButtonElement>,
    priority: number
  ) => {
    event.preventDefault(); // Prevent default form submission behavior
    const boardId = params.id as string;

    //  if (Number(priority) === initialPriority) {
    //    disableEditing();
    //    return;
    //  }

    execute({ boardId, priority, id: cardId });
  };

  const removePriority = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const boardId = params.id as string;
    execute({ boardId, priority: null, id: cardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          variant="secondary"
          className="w-full justify-start"
          size="inline"
        >
          <Zap className="h-4 w-4 mr-2" />
          Priority
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <div className="space-y-3">
          <p className="text-sm font-semibold">Add Priority</p>
          <div className="flex flex-col gap-1">
            <PopoverClose asChild>
              <Button
                disabled={isLoading || initialPriority === 1}
                className="bg-gradient-to-r to-red-800 from-[#FF4C4C] hover:bg-[#FF4C4C] text-white justify-start gap-2 hover:bg-opacity-100 bg-opacity-90 hover:scale-[98%] transition duration-500"
                onClick={(e) => onSubmit(e, 1)}
              >
                <Dot className="w-5 h-5 text-red-100" />
                1st priority
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                disabled={isLoading || initialPriority === 2}
                className="bg-gradient-to-r  to-orange-800 from-[#FFA500] hover:bg-[#FFA500] text-white justify-start gap-2 hover:bg-opacity-100 bg-opacity-90 hover:scale-[98%] transition duration-500"
                onClick={(e) => onSubmit(e, 2)}
              >
                <Dot className="w-5 h-5 text-orange-100" />
                2nd priority
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                disabled={isLoading || initialPriority === 3}
                className="from-yellow-500 bg-gradient-to-r to-yellow-800  hover:bg-yellow-500 text-white justify-start gap-2 hover:bg-opacity-100 bg-opacity-90 hover:scale-[98%] transition duration-500"
                onClick={(e) => onSubmit(e, 3)}
              >
                <Dot className="w-5 h-5 text-yellow-100" />
                3rd priority
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                disabled={isLoading || initialPriority === 4}
                className="from-[#32CD32] bg-gradient-to-r  to-green-800 hover:bg-[#32CD32] text-white justify-start gap-2 hover:bg-opacity-100 bg-opacity-90 hover:scale-[98%] transition duration-500"
                onClick={(e) => onSubmit(e, 4)}
              >
                <Dot className="w-5 h-5 text-green-100" />
                4th priority
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                disabled={isLoading || initialPriority === 5}
                className="bg-gradient-to-r from-[#1E90FF] to-blue-800 hover:bg-[#1E90FF] text-white justify-start gap-2 hover:bg-opacity-100 bg-opacity-90 hover:scale-[98%] transition duration-500"
                onClick={(e) => onSubmit(e, 5)}
              >
                <Dot className="w-5 h-5 text-blue-100" />
                5th priority
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Priority;
