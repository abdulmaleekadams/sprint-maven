import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

// export const generateMetadata = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   const session = await auth();

//   if (!session?.user?.workspaceId) {
//     return {
//       title: "Board",
//     };
//   }

//   const { id } = params;

//   const { workspaceId } = session.user;

//   const board = await db.board.findUnique({ where: { id, workspaceId } });
//   return {
//     title: startCase(board?.title || "Board"),
//   };
// };

const FtrPagesLayout = async ({
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

  //   const board = await db.board.findUnique({ where: { id, workspaceId } });

  return (
    <div className="relative h-[calc(100vh_-_56px)] flex flex-col bg-no-repeat bg-cover bg-center flex-1">
      <div className="absolute bg-card border-l inset-0" />
      <main className="relative flex-1 overflow-y-hidden p-10">{children}</main>
    </div>
  );
};

export default FtrPagesLayout;
