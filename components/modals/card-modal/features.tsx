import ChecklistButton from "@/app/(platform)/(dashboard)/board/[id]/_components/ChecklistButton";
import Tag from "@/app/(platform)/(dashboard)/board/[id]/_components/Tag";
import { Button } from "@/components/ui/button";
import { Paperclip, Users } from "lucide-react";

const Featured = ({ cardId }: { cardId: string }) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="font-medium text-neutral-700 text-sm">Featured</p>

      <Button
        variant="secondary"
        className="w-full justify-start"
        size="inline"
        disabled
      >
        <Users className="h-4 w-4 mr-2" />
        Members
      </Button>
      <ChecklistButton cardId={cardId} />
      <Tag cardId={cardId} />
      <Button
        variant="secondary"
        className="w-full justify-start"
        size="inline"
        disabled
      >
        <Paperclip className="h-4 w-4 mr-2 " />
        Attachment
      </Button>
    </div>
  );
};

export default Featured;
