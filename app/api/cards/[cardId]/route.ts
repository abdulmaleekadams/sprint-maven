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

    const workspaceId = session.user.workspaceId;

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        List: {
          board: {
            workspaceId,
          },
        },
      },
      include: {
        List: {
          select: {
            title: true,
          },
        },
        labels: true,
      },
    });
    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};
