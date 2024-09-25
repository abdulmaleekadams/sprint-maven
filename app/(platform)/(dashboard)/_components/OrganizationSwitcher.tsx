"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@/provider/OrganizationContext";
import { PlusSquare } from "lucide-react";
import Image from "next/image";

const OrganizationSwitcher = () => {
  const {
    activeOrganization,
    organization: organizations,
    setActiveOrganization,
    isLoading,
  } = useOrganization();
  if (isLoading) return <Skeleton className="w-52 h-10" />;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-52 justify-start text-base gap-3"
        >
          <Image src="/bank.png" alt="Worspace Icon" width={20} height={20} />
          <div className="truncate line-clamp-1 text-primary">
            {activeOrganization?.name || "Select Workspace"}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <div className="flex-1 h-auto max-h-80 overflow-y-scroll">
          <p className="text-muted-foreground mb-2">Select Workspace</p>
          <div className="flex flex-col">
            {organizations?.map((organization) => (
              <Button
                key={organization.id}
                className="justify-start text-base gap-3 font-normal"
                variant="ghost"
              >
                <Image
                  src="/bank.png"
                  alt="Worspace Icon"
                  width={20}
                  height={20}
                />
                {organization.name}
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <Button
          className="justify-start text-base gap-3 font-normal"
          variant="ghost"
        >
          <PlusSquare size={16} />
          Create workspace
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default OrganizationSwitcher;
