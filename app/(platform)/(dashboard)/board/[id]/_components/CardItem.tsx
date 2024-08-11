"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hoooks/use-card-modal";
import Label from "./Label";
import AttachedMember from "./AttachedMember";
import { MessageCircleMore, Paperclip } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type CardItemProps = {
  data: Card;
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
          {/* Labels */}
          <div className="flex flex-wrap gap-2">
            <Label name="Frontend" color="rgb(0, 0, 255)" />
            <Label name="Deployment" color="rgb(128, 0, 128)" />
          </div>

          <p className="font-semibold ">{data.title}</p>
          {data.description && (
            <p className="text-sm font-medium text-gray-500 h-10 line-clamp-2">
              {data.description}
            </p>
          )}

          {/* Checklist */}
          <div>
            <Progress value={70} className="h-1 bg-neutral-300" />
          </div>
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
