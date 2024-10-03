import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import BoardSidebar from "./board/[id]/_components/BoardSidebar";

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

  const { workspaceId } = session.user;

  return (
    <div className="overflow-hidden flex">
      <BoardSidebar workspaceId={workspaceId} />
      {children}
    </div>
  );
};

export default SingleBoardLayout;
