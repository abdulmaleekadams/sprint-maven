import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { cardId: string } }
) => {
  try {
    const session = await auth();

    if (!session || !session.user.workspaceId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comments = await db.comment.findMany({
      where: {
        taskId: params.cardId,
      },
      include: {
        user: {
          select: {
            name: true,
            id: true,
            image: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};
