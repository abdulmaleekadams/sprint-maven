import { User2 } from "lucide-react";
import React from "react";

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-5 w-5 mr-2" />
        Your boards
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Todo Fetch board */}
        <div
          className="aspect-video relative h-full w-full bg-muted-foreground/50 rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          role="button"
        >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
