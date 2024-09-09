import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dices } from "lucide-react";
import PointForm from "./PointForm";

const Point = ({ cardId }: { cardId: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="w-full justify-start"
          size="inline"
        >
          <Dices className="h-4 w-4 mr-2 " />
          Velocity Point
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <div className="space-y-3">
          <p className="text-sm font-semibold">Add Point</p>
          <PointForm cardId={cardId} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Point;
