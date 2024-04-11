import { deleteBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import FormDeleteButton from "./FormDeleteButton";

type BoardProps = {
  title: string;
  id: string;
};
const Board = async ({ id, title }: BoardProps) => {
  const deleteBoardById = deleteBoard.bind(null, id);
  return (
    <div className="flex gap-8 items-center">
      <p>Board {title}</p>
      <form action={deleteBoardById}>
        <FormDeleteButton />
      </form>
    </div>
  );
};

export default Board;
