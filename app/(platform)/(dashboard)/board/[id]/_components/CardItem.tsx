"use client";

import { Progress } from "@/components/ui/progress";
import { useCardModal } from "@/hoooks/use-card-modal";
import { calcCheckedListItemProps } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { Card, CheckItems, Label } from "@prisma/client";
import { MessageCircleMore, Paperclip } from "lucide-react";
import AttachedMember from "./AttachedMember";
import TagLabel from "./TagLabel";

type CardItemProps = {
  data: Card & { labels: Label[]; checklist: { checkItems: CheckItems[] }[] };
  index: number;
};

const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="border-2 space-y-2 border-transparent hover:border-black/30 transition-color duration-500 py-2 px-3 text-sm bg-white rounded-md shadow-sm"
          onClick={() => cardModal.onOpen(data.id)}
        >
          {/* TagLabel */}
          {data.labels && (
            <div className="flex flex-wrap gap-2">
              {data.labels.map((label) => (
                <TagLabel
                  name={label.title}
                  key={label.id}
                  color={label.color}
                />
              ))}
            </div>
          )}

          {/* Story Point */}
          {data.point && (
            <p className=" border border-orange-500 flex items-center justify-center px-2 text-orange-500 font-medium rounded-full h-5 w-5">
              {data.point}
            </p>
          )}

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
            <div>
              <AttachedMember />
            </div>
            {/* Attachment */}
            <div className="flex  gap-2">
              <p className=" flex items-center gap-1 text-xs font-bold">
                <Paperclip className="w-4 h-4" /> 10
              </p>
              <p className=" flex items-center gap-1 text-xs font-bold">
                <MessageCircleMore className="w-4 h-4" /> 8
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
