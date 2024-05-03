import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import React from "react";
import BoardNavbar from "./_components/BoardNavbar";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    return {
        title: "Board",
      };;
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
    <div
      className="relative min-h-screen h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
        <BoardNavbar data={board} />
        <div className="absolute bg-black/20 inset-0" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default SingleBoardLayout;
