// export const generateMetadata = async () => {
//   const { orgSlug } = auth();
//   return {
//     title: startCase(orgSlug || "organization"),
//   };
// };

import React from "react";
import OrgControl from "./_components/OrgControl";

const OrganizationIdLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <React.Fragment>
      <OrgControl />
      {children}
    </React.Fragment>
  );
};

export default OrganizationIdLayout;
