import FormSubmit from "@/components/form-submit";
import FormTextarea from "@/components/form-textarea";
import { BsChatLeftText } from "react-icons/bs";

const Comments = ({ cardId }: { cardId: string }) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <BsChatLeftText className="h-5 w-5 mt-0.5 text-neutral-700s" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2 text-sm">Comments</p>
        <form className="space-y-3">
          <FormTextarea id="body" name="body" />
          <FormSubmit className="py-2 h-auto">Comment</FormSubmit>
        </form>
      </div>
    </div>
  );
};

export default Comments;
