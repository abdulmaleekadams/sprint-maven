"use client";
import { createChecklist } from "@/actions/create-checklist";
import FormInput from "@/components/form-input";
import FormSubmit from "@/components/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hoooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { CheckSquareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ChecklistForm = ({
  cardId,
  closePopover,
}: {
  cardId: string;
  closePopover: () => void;
}) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute, fieldErrors } = useAction(createChecklist, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["checklists", cardId],
      });
      toast.success(`Checklist "${data.title}" added`);
      formRef.current?.reset();
      closePopover(); // Close the popover when submission is successful
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.id as string;

    execute({ cardId, boardId, title });
  };

  return (
    <form ref={formRef} action={onSubmit} className="space-y-2">
      <FormInput
        id="title"
        name="title"
        placeholder="Title"
        defaultValue="Checklist"
      />

      <FormSubmit>Create</FormSubmit>
    </form>
  );
};

const ChecklistButton = ({ cardId }: { cardId: string }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="w-full justify-start"
          size="inline"
        >
          <CheckSquareIcon className="h-4 w-4 mr-2 " />
          Checklists
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <div className="space-y-3">
          <p className="text-sm font-semibold">Add Checklist</p>

          <div>
            <div>
              <ChecklistForm cardId={cardId} closePopover={closePopover} />
            </div>
            <p>Select from existing</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChecklistButton;
