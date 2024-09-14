"use client";

import { fetchWorkspaces } from "@/actions/workspaces/fetch-workspaces";
import { Workspace } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useState } from "react";

// Context for Workspaces
const OrganizationContext = createContext<
  | {
      organization: Workspace[] | undefined;
      isLoading: boolean;
      activeOrganization: Workspace | null;
      setActiveOrganization: (id: Workspace | null) => void;
    }
  | undefined
>(undefined);

// Create a provider
export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  const [activeOrganization, setActiveOrganization] =
    useState<Workspace | null>(null);

  const { data: organization, isLoading } = useQuery({
    queryKey: ["organization"],
    queryFn: async () => {
      const res = await fetchWorkspaces();
      if (res.success) {
        return res.data;
      }
      return [];
    },
    enabled: !!sessionData, // Fetch only when sessionData is available
  });

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        isLoading,
        activeOrganization,
        setActiveOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

// Custom hook to use the OrganizationContext
export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
};
