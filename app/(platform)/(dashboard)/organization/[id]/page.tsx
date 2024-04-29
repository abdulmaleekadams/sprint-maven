import { getAllBoards } from "@/actions/board";
import Form from "./Form";
import Info from "./_components/Info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./BoardList";

const OrganizationPage = async () => {
 
  const boards: { id: string; title: string }[] = await getAllBoards();




  return (
    <div className="flex flex-col space-y-4 w-full mb-20">
      {/* <Form /> */}
      <Info />
      <Separator />
      <BoardList />
    </div>
  );
};

export default OrganizationPage;
