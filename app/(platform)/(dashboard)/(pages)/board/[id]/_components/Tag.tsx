import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@prisma/client";
import { Tags } from "lucide-react";
import TagForm from "./TagForm";
import TagSelect from "./TagSelect";

const Tag = ({ cardId, labels }: { cardId: string; labels: Label[] }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="w-full justify-start"
          size="inline"
        >
          <Tags className="h-4 w-4 mr-2 " />
          Tags
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <div className="space-y-3">
          <p className="text-sm font-semibold">Add Tag</p>
          <TagSelect cardId={cardId} labels={labels} />
          <TagForm cardId={cardId} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Tag;
