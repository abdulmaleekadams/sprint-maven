import { getAllBoards } from "@/actions/board";
import { Button } from "@/components/ui/button";
import Board from "./Board";
import AddBoardForm from "./AddBoardForm";
import Form from "./Form";

const OrganizationPage = async () => {
  const boards: { id: string; title: string }[] = await getAllBoards();

  console.log(boards);

  return (
    <div className="flex flex-col space-y-4">
      <Form />

      <div className="flex gap-3 items-center">
        {boards.map(({ id, title }) => (
          <Board id={id} title={title} key={id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
