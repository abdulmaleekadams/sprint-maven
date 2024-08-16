import Tag from "@/app/(platform)/(dashboard)/board/[id]/_components/Tag";
import { Button } from "@/components/ui/button";
import { CheckSquareIcon, Paperclip, Tags, Users } from "lucide-react";
import React from "react";

const Featured = ({cardId}: {cardId: string}) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="font-medium text-neutral-700 text-sm">Featured</p>

      <Button variant="grey" className="w-full justify-start" size="inline">
        <Users className="h-4 w-4 mr-2" />
        Members
      </Button>
      <Button variant="grey" className="w-full justify-start" size="inline">
        <CheckSquareIcon className="h-4 w-4 mr-2 " />
        Checklists
      </Button>
      <Tag cardId={cardId} />
      <Button variant="grey" className="w-full justify-start" size="inline">
        <Paperclip className="h-4 w-4 mr-2 " />
        Attachment
      </Button>
    </div>
  );
};

export default Featured;
