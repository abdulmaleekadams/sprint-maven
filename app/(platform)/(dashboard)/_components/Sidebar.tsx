"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@/provider/OrganizationContext";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { useLocalStorage } from "usehooks-ts";
import NavItem from "./NavItem";

type SidebarProps = {
  storageKey?: string;
};

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const {
    organization: organizations,
    isLoading,
    activeOrganization,
    setActiveOrganization,
  } = useOrganization();

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (isLoading || !organizations) {
    return (
      <React.Fragment>
        <div className="flex items-center font-medium  mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </React.Fragment>
    );
  }

  return (
    <Suspense
      fallback={
        <>
          <div className="flex items-center font-medium  mb-2">
            <Skeleton className="h-10 w-[50%]" />
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <NavItem.Skeleton />
            <NavItem.Skeleton />
            <NavItem.Skeleton />
          </div>
        </>
      }
    >
      <div className="flex items-center font-medium text-xs mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size={"icon"}
          variant={"ghost"}
          className="ml-auto"
        >
          <Link href={"/select-org"}>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2 w-full"
      >
        {organizations?.map((organization) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </Suspense>
  );
};

export default Sidebar;
