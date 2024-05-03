import FormPopover from "@/components/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: { orgId },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-5 w-5 mr-2" />
        Your boards
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Todo Fetch board */}
        {boards.length > 0  ? (
          boards.map((board) => (
            <Link
              href={`/board/${board.id}`}
              key={board.id}
              className="group  relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 h-full w-full overflow-hidden p-2"
              style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            >
              <div className="absolute bg-black/30 w-full h-full inset-0 transition group-hover:bg-black/90" />
              <p className="font-semibold text-white relative">{board.title}</p>
            </Link>
          ))
        ) : (
          <FormPopover side="right" sideOffset={10}>
            <div
              className="aspect-video relative h-full w-full bg-muted-foreground/50 rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
              role="button"
            >
              <p className="text-sm">Create new board</p>
              <span className="text-xs">5 remaining</span>
              <Hint
                sideOffset={40}
                description={`
              Free Workspace can have up to 5 open boards. For unlimited boards upgrade this workspace
              `}
              >
                <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
              </Hint>
            </div>
          </FormPopover>
        )}
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Skeleton className="aspect-video h-full w-full p-2" key={idx} />
      ))}
    </div>
  );
};

export default BoardList;
