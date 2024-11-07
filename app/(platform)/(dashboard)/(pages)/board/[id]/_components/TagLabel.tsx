import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getTagBgColor } from "@/lib/utils";
import { Label } from "@prisma/client";
import TagSelect from "./TagSelect";

const TagLabel = ({
  name,
  color,
  cardId,
  labels,
}: {
  name: string;
  color: string;
  cardId: string;
  labels: Label[];
}) => {
  const backgroundColor = getTagBgColor(color);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          onClick={(e) => e.stopPropagation()}
          className="py-1 px-2 w-max rounded-md"
          style={{
            backgroundColor,
            borderColor: color,
            color: color,
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <p className="text-xs font-semibold">{name}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <TagSelect cardId={cardId} labels={labels} />
      </PopoverContent>
    </Popover>
  );
};

export default TagLabel;
