"use client";

import { fetchWorkspaces } from "@/actions/workspaces/fetch-workspaces";
import { Role, Workspace, WorkspaceUser } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useState } from "react";

type WorkspaceWithRole = Workspace & {
  roles: Role[];
  workspaceUser: (WorkspaceUser & {
    role: {
      title: string;
      id: string;
    };
    user: {
      name: string;
      email: string;
    };
  })[];
};

// Context for Workspaces
const OrganizationContext = createContext<
  | {
      organization: WorkspaceWithRole[] | undefined;
      isLoading: boolean;
      activeOrganization: WorkspaceWithRole | null;
      setActiveOrganization: (id: WorkspaceWithRole | null) => void;
    }
  | undefined
>(undefined);

// Create a provider
export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();

  const [activeOrganization, setActiveOrganization] =
    useState<WorkspaceWithRole | null>(null);

  const { data: organization, isLoading } = useQuery({
    queryKey: ["organization"],
    queryFn: async () => {
      const res = await fetchWorkspaces();
      if (res.success) {
        if (sessionData?.user?.workspaceId) {
          const currentWorkspace = res.data.find(
            (workspace) => workspace.id === sessionData.user?.workspaceId
          );
          currentWorkspace && setActiveOrganization(currentWorkspace);
        }
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
