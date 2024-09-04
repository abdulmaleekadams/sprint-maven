"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hoooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardFullDetails, Checklist as ChecklistType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import Actions from "./actions";
import CardPoint from "./cardPoint";
import Checklists from "./Checklist";
import Description from "./description";
import Enhacements from "./enhacements";
import Featured from "./features";
import Header from "./header";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const { isOpen, onOpen, onClose } = useCardModal();

  const { data: cardData } = useQuery<CardFullDetails>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });
  const { data: checklists } = useQuery<ChecklistType[]>({
    queryKey: ["checklists", id],
    queryFn: () => fetcher(`/api/checklist/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className=""
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}

        {!cardData ? (
          <Skeleton className="h-4 w-20" />
        ) : (
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4 mr-2" />
            <p className=" text-neutral-500 text-sm">
              {format(cardData?.createdAt, "PP")}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData?.point && (
                <div>
                  <p className="text-sm font-medium">Story point</p>
                  <CardPoint point={cardData?.point} cardId={cardData.id} />
                </div>
              )}
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
                </>
              )}
            </div>
          </div>
          <div>
            <Featured cardId={cardData?.id!} />
            <Enhacements cardId={cardData?.id!} />
            {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
