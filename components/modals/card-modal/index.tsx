"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCardModal } from "@/hoooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardFullDetails, CardWithListLabel } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";
import Description from "./description";
import Actions from "./actions";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDaysIcon } from "lucide-react";
import Enhacements from "./enhacements";
import Featured from "./features";
import TagLabel from "@/app/(platform)/(dashboard)/board/[id]/_components/TagLabel";
import Checklists from "./Checklist";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const { isOpen, onOpen, onClose } = useCardModal();

  const { data: cardData } = useQuery<CardFullDetails>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
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
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <>
                  <Description data={cardData} />

                  {/* Attachments  */}
                  {/* Checklist */}
                  {cardData.checklist && cardData.checklist.length > 0 && (
                    <Checklists
                      cardId={cardData.id}
                      data={cardData.checklist}
                    />
                  )}
                  {/* Activity & Comments  */}
                </>
              )}
            </div>
          </div>
          <div>
            <Featured cardId={cardData?.id!} />
            <Enhacements />
            {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
