import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { cardId: string } }
) => {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 4021 });
    }

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        List: {
          board: {
            orgId,
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
