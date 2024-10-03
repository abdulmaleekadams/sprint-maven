import { auth } from "@/auth";
import { db } from "@/lib/db";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import React from "react";
import BoardNavbar from "./_components/BoardNavbar";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      title: "Board",
    };
  }

  const { id } = params;

  const { workspaceId } = session.user;

  const board = await db.board.findUnique({ where: { id, workspaceId } });
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
  const session = await auth();
  if (!session?.user?.workspaceId) {
    redirect("/select-org");
  }

  const { id } = params;

  const { workspaceId } = session.user;

  const board = await db.board.findUnique({ where: { id, workspaceId } });

  if (!board) {
    notFound();
  }
  return (
    <div
      className="relative h-[calc(100vh_-_56px)] flex flex-col bg-no-repeat bg-cover bg-center flex-1"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute bg-black/20 inset-0" />
      <main className="relative flex-1 overflow-y-hidden">{children}</main>
    </div>
  );
};

export default SingleBoardLayout;
