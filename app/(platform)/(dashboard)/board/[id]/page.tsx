import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
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
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 overflow-x-auto h-full">
      <ListContainer boardId={params.id} data={lists} />
    </div>
  );
};

export default SingleBoardPage;
