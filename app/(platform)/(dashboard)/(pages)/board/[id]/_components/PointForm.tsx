"use client";
import { updateCard } from "@/actions/update-card";
import FormInput from "@/components/form-input";
import FormSubmit from "@/components/form-submit";
import { useAction } from "@/hoooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

const PointForm = ({
  cardId,
  closePopover,
}: {
  cardId: string;
  closePopover: () => void;
}) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const formRef = useRef<HTMLFormElement>(null);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
      toast.success(`Story point "${data.point}" added`);
      formRef.current?.reset();
      closePopover();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const point = formData.get("point") as string;
    const boardId = params.id as string;

    // if (Number(point) <= 0) return;

    execute({ boardId, id: cardId, point: Number(point) });
  };
  return (
    <form ref={formRef} action={onSubmit} className="space-y-4">
      <FormInput id="point" name="point" errors={fieldErrors} type="number" />

      <FormSubmit>Add Point</FormSubmit>
    </form>
  );
};

export default PointForm;
