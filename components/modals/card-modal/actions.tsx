"use client";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hoooks/use-action";
import { useCardModal } from "@/hoooks/use-card-modal";
import { CardWithList } from "@/types";
import { CaravanIcon, Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type ActionsProps = {
  data: CardWithList;
};

const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const { execute: executeDeleteCard, isLoading: deleteLoading } = useAction(
    deleteCard,
    {
      onSuccess: () => {
        toast.success(`Card ${data.title} deleted`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
      onComplete: () => {
        cardModal.onClose();
      },
    }
  );

  const { execute: executeCopyCard, isLoading: copyLoading } = useAction(
    copyCard,
    {
      onSuccess: () => {
        toast.success(`Card ${data.title} copied`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.id as string;
    executeCopyCard({
      id: data.id,
      boardId,
    });
  };
  const onDelete = () => {
    const boardId = params.id as string;
    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="font-medium text-neutral-700 text-sm">Actions</p>
      <Button
        variant="secondary"
        className="w-full justify-start"
        size="inline"
        disabled={copyLoading || deleteLoading}
        onClick={onCopy}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="secondary"
        className="w-full justify-start"
        size="inline"
      >
        <CaravanIcon className="h-4 w-4 mr-2" />
        Move
      </Button>
      <Button
        variant="secondary"
        className="w-full justify-start text-rose-500"
        size="inline"
        disabled={copyLoading || deleteLoading}
        onClick={onDelete}
      >
        <Trash className="h-4 w-4 mr-2 " />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};

export default Actions;
