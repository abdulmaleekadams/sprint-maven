import ChecklistButton from "@/app/(platform)/(dashboard)/board/[id]/_components/ChecklistButton";
import Tag from "@/app/(platform)/(dashboard)/board/[id]/_components/Tag";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock7, Paperclip, Users } from "lucide-react";
import AssignedUsers from "./assigned-users";

const Featured = ({ cardId, boardId }: { cardId: string; boardId: string }) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="font-medium text-neutral-700 text-sm">Featured</p>

      <AssignedUsers cardId={cardId} boardId={boardId} />
      <Button
        variant="secondary"
        className="w-full justify-start"
        size="inline"
        disabled
      >
        <Briefcase className="h-4 w-4 mr-2" />
        Project
      </Button>
      <Button
        variant="secondary"
        className="w-full justify-start"
        size="inline"
        disabled
      >
        <Clock7 className="h-4 w-4 mr-2" />
        Timeline
      </Button>
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
