import { Button } from "@/components/ui/button";
import { Dices, Flame } from "lucide-react";
import React from "react";

const Enhacements = () => {
  return (
    <div className="space-y-2 mt-2">
      <p className="font-medium text-neutral-700 text-sm">Add-Ons</p>

      <Button variant="grey" className="w-full justify-start" size="inline">
        <Flame className="h-4 w-4 mr-2" />
        Card Priority
      </Button>
      <Button
        variant="grey"
        className="w-full justify-start"
        size="inline"
      >
        <Dices className="h-4 w-4 mr-2 " />
        Story Points
      </Button>
    </div>
  );
};

export default Enhacements;
