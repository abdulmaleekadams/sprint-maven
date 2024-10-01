import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ListContainer from "./_components/ListContainer";

type SingleBoardPageProps = {
  params: {
    id: string;
  };
};
const SingleBoardPage = async ({ params }: SingleBoardPageProps) => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.id,
      board: {
        workspaceId: session.user.workspaceId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
        include: {
          _count: {
            select: {
              comments: true,
              attachments: true,
            },
          },
          labels: true,
          user: {
            select: {
              name: true,
            },
          },
          checklist: {
            select: {
              checkItems: true,
            },
          },
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 relative h-full  after:content-[''] before:content-[''] before:absolute before:h-full after:h-full after:absolute before:w-5 after:w-5 after:right-0 before:left-0 after:top-0 before:top-0 after:bg-[linear-gradient(to_left,#000,rgba(0,0,0,0))] before:bg-[linear-gradient(to_right,#000,rgba(0,0,0,0))]">
      <div className="absolute inset-0 mt-4 mx-4">
        <ListContainer boardId={params.id} data={lists} />
      </div>
    </div>
  );
};

export default SingleBoardPage;
