"use client";

import { useOrganization } from "@/provider/OrganizationContext";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const OrgControl = () => {
  const params = useParams();

  const { update } = useSession();

  const { isLoading, organization, activeOrganization, setActiveOrganization } =
    useOrganization();

  useEffect(() => {
    // Don't proceed if data is still loading or if no organization data is available
    if (!organization || isLoading || !params.id) return;
    update({ workspaceId: params.id });

    // If the active organization is already set to the current params.id, no need to reset it
    if (activeOrganization?.id === params.id) return;

    const selectedOrg = organization.find((org) => org.id === params.id);

    if (selectedOrg) {
      setActiveOrganization(selectedOrg); // Set the active organization if found
    }
  }, [
    organization,
    params.id,
    isLoading,
    activeOrganization,
    setActiveOrganization,
  ]);

  return null;
};

export default OrgControl;
