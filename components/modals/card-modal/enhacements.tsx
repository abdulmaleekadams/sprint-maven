import Point from "@/app/(platform)/(dashboard)/board/[id]/_components/Points";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

const Enhacements = ({ cardId }: { cardId: string }) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="font-medium text-neutral-700 text-sm">Add-Ons</p>

      <Button variant="grey" className="w-full justify-start" size="inline">
        <Flame className="h-4 w-4 mr-2" />
        Card Priority
      </Button>
      <Point cardId={cardId} />
    </div>
  );
};

export default Enhacements;
