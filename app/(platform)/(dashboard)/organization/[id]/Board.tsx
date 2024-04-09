import { deleteBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";

type BoardProps = {
  title: string;
  id: string;
};
const Board = ({ id, title }: BoardProps) => {
  const deleteBoardById =  deleteBoard.bind(null, id);
  return (
    <div className="flex gap-8 items-center">
      <p>Board {title}</p>
      <form action={deleteBoardById}>
        <Button variant={"destructive"} size={"sm"}>
          Delete
        </Button>
      </form>
    </div>
  );
};

export default Board;
