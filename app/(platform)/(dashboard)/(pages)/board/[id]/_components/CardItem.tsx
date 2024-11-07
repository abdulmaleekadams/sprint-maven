"use client";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { useCardModal } from "@/hoooks/use-card-modal";
import { calcCheckedListItemProps, cn } from "@/lib/utils";
import { CardList } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { MessageCircleMore, Paperclip } from "lucide-react";
import AttachedMember from "./AttachedMember";
import PriorityLabel from "./PriorityLabel";
import TagLabel from "./TagLabel";
import TagSelect from "./TagSelect";

type CardItemProps = {
  data: CardList;
  index: number;
};

const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className={cn(
            " hover:border-primary/20 transition-color text-sm bg-card rounded-md shadow-sm",
            data?.priority === 1
              ? " animate-border border-2 border-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%]"
              : "duration-500 border-2 "
          )}
          onClick={() => cardModal.onOpen(data.id)}
        >
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="bg-card px-3 py-2 rounded-md space-y-2 ">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2  items-center">
                    {/* Story Point */}
                    {data.point && (
                      <p className=" border border-orange-500 flex items-center justify-center px-2 text-orange-500 font-medium rounded-full h-5 w-5">
                        {data.point}
                      </p>
                    )}
                    {data.priority && (
                      <PriorityLabel priority={data.priority} />
                    )}
                  </div>

                  {/* TagLabel */}
                  {data.labels && (
                    <Popover>
                      <PopoverTrigger
                        onClick={(e) => e.stopPropagation()}
                        asChild
                      >
                        <div className="inline-flex flex-wrap gap-2">
                          {data.labels.map((label) => (
                            <TagLabel
                              name={label.title}
                              key={label.id}
                              color={label.color}
                            />
                          ))}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent align="start">
                        <TagSelect cardId={data.id} labels={data.labels} />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>

                <p className="font-semibold ">{data.title}</p>
                {data.description && (
                  <p className="text-sm font-medium text-gray-500 h-10 line-clamp-2">
                    {data.description}
                  </p>
                )}

                {/* Checklist */}
                {data.checklist.length > 0 && (
                  <div>
                    <Progress
                      value={calcCheckedListItemProps(data?.checklist)}
                      className="h-1 bg-neutral-300"
                    />
                  </div>
                )}
                {/* Extras and Member */}
                <div className="flex items-center gap-6 justify-between">
                  {/* Members */}
                  {data?.taskAssignments?.length > 0 && (
                    <div>
                      <AttachedMember members={data.taskAssignments} />
                    </div>
                  )}
                  {/* Attachment */}
                  <div className="flex  gap-2">
                    {data._count.attachments > 0 && (
                      <p className=" flex items-center gap-1 text-xs font-bold">
                        <Paperclip className="w-4 h-4" />{" "}
                        {data._count.attachments}
                      </p>
                    )}
                    {data._count.comments > 0 && (
                      <p className=" flex items-center gap-1 text-xs font-bold">
                        <MessageCircleMore className="w-4 h-4" />{" "}
                        {data._count.comments}
                      </p>
                    )}
                  </div>
                </div>
                {/* Creator */}
                <p className="text-muted-foreground text-xs !mt-4">{`Created by ${data.user.name}`}</p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="right-0">
              <ContextMenuItem asChild>
                <Button
                  onClick={handleClick}
                  variant="ghost"
                  className="w-full justify-start cursor-pointer"
                >
                  View
                </Button>
              </ContextMenuItem>
              <ContextMenuItem asChild>
                <Button
                  onClick={handleClick}
                  variant="ghost"
                  className="w-full justify-start cursor-pointer"
                >
                  Move
                </Button>
              </ContextMenuItem>
              <ContextMenuItem asChild>
                <Button
                  onClick={handleClick}
                  variant="ghost"
                  className="w-full justify-start cursor-pointer"
                >
                  Date
                </Button>
              </ContextMenuItem>
              <ContextMenuItem asChild>
                <Button
                  onClick={handleClick}
                  variant="ghost"
                  className="w-full justify-start cursor-pointer text-red-500 hover:text-red-500"
                >
                  Delete
                </Button>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
