import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import React from "react";
import BoardNavbar from "./_components/BoardNavbar";
import BoardSidebar from "./_components/BoardSidebar";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const { id } = params;

  const board = await db.board.findUnique({ where: { id, orgId } });
  return {
    title: startCase(board?.title || "Board"),
  };
};

const SingleBoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const { orgId } = auth();
  if (!orgId) {
    redirect("/select-org");
  }

  const { id } = params;

  const board = await db.board.findUnique({ where: { id, orgId } });

  if (!board) {
    notFound();
  }
  return (
    <div className="overflow-hidden flex">
      <BoardSidebar orgId={orgId} />
      <div
        className="relative h-[calc(100vh_-_56px)] flex flex-col bg-no-repeat bg-cover bg-center flex-1"
        style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      >
        <BoardNavbar data={board} />
        <div className="absolute bg-black/80 inset-0" />
        <main className="relative flex-1 overflow-y-hidden">{children}</main>
      </div>
    </div>
  );
};

export default SingleBoardLayout;
