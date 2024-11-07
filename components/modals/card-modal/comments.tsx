import { createComment } from "@/actions/create-comment";
import FormSubmit from "@/components/form-submit";
import FormTextarea from "@/components/form-textarea";
import { useAction } from "@/hoooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { BsChatLeftText } from "react-icons/bs";
import { toast } from "sonner";

const Comments = ({ cardId }: { cardId: string }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const formRef = useRef<HTMLFormElement>(null);

  const { execute, fieldErrors, isLoading } = useAction(createComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", cardId],
      });
      toast.success(`Comment added`);
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const content = formData.get("content") as string;
    const boardId = params.id as string;

    execute({ cardId, boardId, content });
  };
  return (
    <div className="flex items-start gap-x-3 w-full">
      <BsChatLeftText className="h-5 w-5 mt-0.5 text-neutral-700s" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2 text-sm">Comments</p>
        <form action={handleSubmit} ref={formRef} className="space-y-3">
          <FormTextarea
            disabled={isLoading}
            id="content"
            name="content"
            className="min-h-1  focus-within:h-auto max-h-32 custom-scrollbar"
          />
          <FormSubmit disabled={isLoading} className="py-2 h-auto">
            Comment
          </FormSubmit>
        </form>
      </div>
    </div>
  );
};

export default Comments;
