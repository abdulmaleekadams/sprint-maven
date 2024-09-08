import { updateCard } from "@/actions/update-card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hoooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { Flame } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const Severity = ({
  initialPriority,
  cardId,
}: {
  initialPriority?: number;
  cardId: string;
}) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const { execute, fieldErrors, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });

      data.point
        ? toast.success(`Story priority updated to "${data.priority}"`)
        : toast.success(`Story priority removed`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    severity: string
  ) => {
    event.preventDefault(); // Prevent default form submission behavior
    const boardId = params.id as string;

    //  if (Number(severity) === initialSeverity) {
    //    disableEditing();
    //    return;
    //  }

    execute({ boardId, severity, id: cardId });
  };

  const removeSeverity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const boardId = params.id as string;
    execute({ boardId, priority: null, id: cardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="grey" className="w-full justify-start" size="inline">
          <Flame className="h-4 w-4 mr-2" />
          Severity
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <div className="space-y-3">
          <p className="text-sm font-semibold">Add Severity</p>
          <div className="flex flex-col">
            <PopoverClose asChild>
              <Button className="bg-white text-black justify-start gap-2">
                <span className="inline-flex justify-center items-center bg-blue-100  rounded-sm">
                  <Flame className="w-5 h-5 text-blue-500" />
                </span>
                Critical
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button className="bg-white text-black justify-start gap-2">
                <span className="inline-flex justify-center items-center bg-green-100  rounded-sm">
                  <Flame className="w-5 h-5 text-green-500" />
                </span>
                High
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button className="bg-white text-black justify-start gap-2">
                <span className="inline-flex justify-center items-center bg-orange-100  rounded-sm">
                  <Flame className="w-5 h-5 text-orange-500" />
                </span>
                Medium
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button className="bg-white text-black justify-start gap-2">
                <span className="inline-flex justify-center items-center bg-red-200  rounded-sm">
                  <Flame className="w-5 h-5 text-red-500" />
                </span>
                Low
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button className="bg-white text-black justify-start gap-2">
                <span className="inline-flex justify-center items-center bg-red-200  rounded-sm">
                  <Flame className="w-5 h-5 text-red-500" />
                </span>
                Info
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Severity;
