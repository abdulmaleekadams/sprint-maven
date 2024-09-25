"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hoooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import {
  CardFullDetails,
  Checklist as ChecklistType,
  CommentWithUser,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import { useState } from "react";
import Actions from "./actions";
import CardPoint from "./cardPoint";
import CardPriority from "./cardPriority";
import Checklists from "./Checklist";
import Comment from "./comment";
import Comments from "./comments";
import Description from "./description";
import Enhacements from "./enhacements";
import Featured from "./features";
import Header from "./header";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const { isOpen, onOpen, onClose } = useCardModal();

  // Comment edit
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);

  const { data: cardData } = useQuery<CardFullDetails>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: checklists } = useQuery<ChecklistType[]>({
    queryKey: ["checklists", id],
    queryFn: () => fetcher(`/api/checklist/${id}`),
  });
  const { data: comments } = useQuery<CommentWithUser[]>({
    queryKey: ["comments", id],
    queryFn: () => fetcher(`/api/comments/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="h-[80%] flex flex-col px-4 !py-4 border-muted"
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}

        {!cardData ? (
          <Skeleton className="h-4 w-20 px-4" />
        ) : (
          <div className="flex items-center gap-1 px-4">
            <CalendarDaysIcon className="w-4 h-4 mr-2" />
            <p className=" text-neutral-500 text-sm">
              {format(cardData?.createdAt, "PP")}
            </p>
          </div>
        )}
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 px-4 pb-4">
            <div className="col-span-3 h-full">
              <div className="w-full space-y-6">
                <div className="flex gap-6">
                  {cardData?.point && (
                    <div className="flex flex-col items-center">
                      <p className="text-sm font-medium mb-1">Velocity Point</p>
                      <CardPoint point={cardData?.point} cardId={cardData.id} />
                    </div>
                  )}
                  {cardData?.priority && (
                    <div>
                      <p className="text-sm font-medium mb-1">Priority</p>
                      <CardPriority
                        priority={cardData?.priority}
                        cardId={cardData.id}
                      />
                    </div>
                  )}
                </div>
                {!cardData ? (
                  <Description.Skeleton />
                ) : (
                  <>
                    <Description data={cardData} />

                    {/* Attachments  */}
                    {/* Checklist */}
                    {checklists && checklists.length > 0 && (
                      <Checklists cardId={cardData.id} data={checklists} />
                    )}
                    {/* Activity & Comments  */}
                    <Comments cardId={cardData.id} />
                    {comments && comments.length > 0 && (
                      <div className="flex w-full flex-col gap-4">
                        {comments.map((commentData) => (
                          <Comment
                            key={commentData.id}
                            commentData={commentData}
                            currentEditingId={currentEditingId}
                            setCurrentEditingId={setCurrentEditingId}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="">
              <Featured cardId={cardData?.id!} />
              <Enhacements
                initialPriority={cardData?.priority}
                cardId={cardData?.id!}
              />
              {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
