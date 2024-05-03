import Info from "./_components/Info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./BoardList";
import { Suspense } from "react";

const OrganizationPage = async () => {

  return (
    <div className="flex flex-col space-y-4 w-full mb-20">
      <Info />
      <Separator />
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
};

export default OrganizationPage;
