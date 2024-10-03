import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import {
  BookMarkedIcon,
  Clock5,
  Home,
  Search,
  User,
  Users,
} from "lucide-react";
import BoardLink from "./BoardLink";
import BoardSidebarBtn from "./BoardSidebarBtn";

const BoardSidebar = async ({ workspaceId }: { workspaceId: string }) => {
  const boards = await db.board.findMany({
    where: {
      workspaceId,
    },
  });

  return (
    <aside className="max-w-72 w-72 shrink-0 bg-card h-[calc(100vh-56px)] flex flex-col relative px-4 py-10 gap-4">
      <div className="flex flex-col">
        <Button
          variant="ghost"
          className={cn(
            "font-semibold text-sm justify-start items-center gap-2"
          )}
        >
          <Home className="w-4 h-4" />
          Home
        </Button>
        <BoardSidebarBtn />
        <Button
          variant="ghost"
          className={cn(
            "font-semibold text-sm justify-start items-center gap-2"
          )}
        >
          <Clock5 className="w-4 h-4" />
          Timeline
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "font-semibold text-sm justify-start items-center gap-2"
          )}
        >
          <BookMarkedIcon className="w-4 h-4" />
          Documentation
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "font-semibold text-sm justify-start items-center gap-2"
          )}
        >
          <Search className="w-4 h-4" />
          Search
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "font-semibold text-sm justify-start items-center gap-2"
          )}
        >
          <User className="w-4 h-4" />
          Members
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "font-semibold text-sm justify-start items-center gap-2"
          )}
        >
          <Users className="w-4 h-4" />
          Teams
        </Button>
      </div>
      <div>
        <Button
          className="font-semibold text-sm hover:bg-transparent "
          variant="ghost"
          asChild
        >
          <p>Boards</p>
        </Button>
        <div className="flex flex-col mt-2 gap-1">
          {boards?.map((board) => <BoardLink key={board.id} board={board} />)}
        </div>
      </div>
    </aside>
  );
};

export default BoardSidebar;
