"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@/provider/OrganizationContext";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import Members from "./Members";

const Info = () => {
  const { activeOrganization, isLoading } = useOrganization();

  if (isLoading) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative">
          <Image
            fill
            src={"/bank.png"}
            alt="Organization"
            className="rounded-md object-cover"
          />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-xl">{activeOrganization?.name}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <CreditCard className="w-3 h-3 mr-1" />
            Free
          </div>
        </div>
      </div>
      <Members />
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="absolute w-full h-full bg-muted-foreground/50" />
      </div>

      <div className="space-y-2">
        <Skeleton className="w-[200px] h-10 bg-muted-foreground/50" />

        <div className="flex items-center">
          <Skeleton className="w-3 h-3 mr-1 bg-muted-foreground/50" />
          <Skeleton className="w-[100px] h-4 bg-muted-foreground/50" />
        </div>
      </div>
    </div>
  );
};

export default Info;
