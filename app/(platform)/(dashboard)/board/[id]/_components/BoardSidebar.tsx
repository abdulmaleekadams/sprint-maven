import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import BoardLink from "./BoardLink";

const BoardSidebar = async ({ orgId }: { orgId: string }) => {
  const boards = await db.board.findMany({
    where: {
      orgId,
    },
  });

  return (
    <aside className="max-w-72 w-72 shrink-0 bg-card h-[calc(100vh-56px)] flex flex-col relative px-4 py-10 gap-4">
      <div>
        <p className="font-semibold text-sm">Boards</p>
        <div className="flex flex-col mt-2 gap-1">
          {boards?.map((board) => (
            <BoardLink key={board.id} board={board} />
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold text-sm">Members</p>
        <div className="flex flex-col mt-2">
          {boards?.map((board) => (
            <Button
              key={board.id}
              variant="ghost"
              className="justify-start gap-2 group"
              asChild
            >
              <Link
                href={`/board/${board.id}`}
                className="text-sm text-opacity-60 text-black group-hover:text-opacity-100 flex items-center"
              >
                <Image
                  src={board.imageThumbUrl}
                  alt={board.imageId}
                  width={30}
                  height={30}
                  className="w-6 h-6 object-cover rounded-md"
                />

                {board.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BoardSidebar;
