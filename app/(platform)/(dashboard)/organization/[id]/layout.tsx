import type { Metadata } from "next";
import OrgControl from "./_components/OrgControl";
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs";

export const generateMetadata = async () => {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "organization"),
  };
};

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
