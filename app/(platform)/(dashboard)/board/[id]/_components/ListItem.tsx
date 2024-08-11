"use client";

import { ListWithCards } from "@/types";
import ListHeader from "./ListHeader";
import { useRef, useState } from "react";
import CardForm from "./CardForm";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type ListItemProps = {
  data: ListWithCards;
  index: number;
};

const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    });
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 w-[366px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full flex flex-col rounded-md shadow-md pb-2 h-full"
          >
            
            <ListHeader onAddCard={enableEditing} data={data} />
            <div className="h-4 bg-[#f1f2f4]" />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ScrollArea>
                  <ol
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "px-4 py-0.5 flex flex-col gap-y-2 flex-1 basis-auto h-full bg-[#f1f2f4]",
                      
                    )}
                  >
                    {data.cards.map((card, index) => (
                      <CardItem index={index} key={card.id} data={card} />
                    ))}
                    {provided.placeholder}
                  </ol>
                  <ScrollBar orientation="vertical" className="bg-neutral-500/20" />
                </ScrollArea>
              )}
            </Droppable>

            <CardForm
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              listId={data.id}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
