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
    <div className="flex gap-8 items-center shadow-md bg-slate-500 px-4 py-2 rounded-md ">
      <p>{title}</p>
      <form action={deleteBoardById}>
        <FormDeleteButton />
      </form>
    </div>
  );
};

export default Board;
