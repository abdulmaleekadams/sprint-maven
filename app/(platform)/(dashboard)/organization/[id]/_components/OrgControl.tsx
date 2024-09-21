"use client";

import { useOrganization } from "@/provider/OrganizationContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const OrgControl = () => {
  const params = useParams();
  const { isLoading, organization, setActiveOrganization } = useOrganization();

  useEffect(() => {
    if (!organization || isLoading) return;

    const selectedOrg = organization.find((org) => org.id === params.id);

    if (selectedOrg) {
      setActiveOrganization(selectedOrg); // Set the active organization as the full Workspace object
    }
  }, [organization, params.id, isLoading, setActiveOrganization]);

  return null;
};

export default OrgControl;
