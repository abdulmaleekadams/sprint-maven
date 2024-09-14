"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export type Organization = {
  id: string;
  slug?: string;
  imageUrl?: string;
  name: string;
};

type NavItemProps = {
  isActive: boolean;
  isExpanded: boolean;
  organization: Organization;
  onExpand: (id: string) => void;
};
const NavItem = ({
  isActive,
  isExpanded,
  onExpand,
  organization,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onRouteClick = (href: string) => {
    router.push(href);
  };

  const routes = [
    {
      label: "Boards",
      Icon: Layout,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      Icon: Activity,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      Icon: Settings,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      Icon: CreditCard,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  return (
    <AccordionItem value={organization.id} className="border-none w-full">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex w-full items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-secondary text-primary"
        )}
      >
        <div className="flex items-center gap-x-2 w-11/12 overflow-hidden">
          <div className="w-5 h-5 relative shrink-0">
            <Image
              fill
              src={organization.imageUrl ?? "/bank.png"}
              alt={organization.name}
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm whitespace-nowrap truncate">
            {organization.name}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === route.href && "bg-secondary text-primary"
            )}
            onClick={() => onRouteClick(route.href)}
            variant={"ghost"}
          >
            {}
            <route.Icon className="w-4 h-4 mr-2" />
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

export default NavItem;
