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

    const checklists = await db.checklist.findMany({
      where: {
        cardId: params.cardId,
      },
      include: {
        checkItems: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    return NextResponse.json(checklists);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};
