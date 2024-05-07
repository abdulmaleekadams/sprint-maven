"use client";
import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import ListForm from "./ListForm";
import ListItem from "./ListItem";

import { useEffect, useState } from "react";

type ListContainerProps = {
  data: ListWithCards[];
  boardId: string;
};

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, idx) => (
        <ListItem key={list.id} index={idx} data={list} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
