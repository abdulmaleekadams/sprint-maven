import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import BoardList from "./BoardList";
import Info from "./_components/Info";

const OrganizationPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col space-y-4 w-full mb-20">
      <Info />
      <Separator />
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList workspaceId={params.id} />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;
