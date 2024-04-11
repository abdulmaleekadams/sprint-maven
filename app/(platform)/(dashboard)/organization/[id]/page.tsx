import {  getAllBoards } from "@/actions/board";
import { Button } from "@/components/ui/button";
import Board from "./Board";
import AddBoardForm from "./AddBoardForm";

const OrganizationPage = async () => {
  const boards: { id: string; title: string }[] = await getAllBoards();

  console.log(boards);
  

  return (
    <div className="flex flex-col space-y-4">
      <AddBoardForm />

      <div className="space-y-2">
        {boards.map(({ id, title }) => (
          <Board id={id} title={title} key={id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationPage;
