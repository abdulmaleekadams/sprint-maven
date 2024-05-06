import { ListWithCards } from "@/types"
import { List } from "@prisma/client"
import ListForm from "./ListForm"

type ListContainerProps = {
    data : ListWithCards[]
    boardId: string
}

const ListContainer = ({boardId, data} : ListContainerProps) => {
  return (
    <ol>
        <ListForm  />
        <div className="flex-shrink-0 w-1" />
    </ol>
  )
}

export default ListContainer