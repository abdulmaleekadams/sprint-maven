import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ListContainer from "./_components/ListContainer";

type SingleBoardPageProps = {
  params: {
    id: string;
  };
};
const SingleBoardPage = async ({ params }: SingleBoardPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.id,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
        include: {
          labels: true,
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
    <div className="p-4 relative h-full  after:content-[''] before:content-[''] before:absolute before:h-full after:h-full after:absolute before:w-5 after:w-5 after:right-0 before:left-0 after:top-0 before:top-0 after:bg-[linear-gradient(to_left,#000,rgb(0,0,0,0))] before:bg-[linear-gradient(to_right,#000,rgb(0,0,0,0))]">
      <div className="absolute inset-0 mt-4 mx-4">
        <ListContainer boardId={params.id} data={lists} />
      </div>
    </div>
  );
};

export default SingleBoardPage;
