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
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const checklists = await db.checklist.findMany({
      where: {
        cardId: params.cardId,
      },
      include: {
        checkItems: true,
      },
    });
    return NextResponse.json(checklists);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};
