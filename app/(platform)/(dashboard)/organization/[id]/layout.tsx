// export const generateMetadata = async () => {
//   const { orgSlug } = auth();
//   return {
//     title: startCase(orgSlug || "organization"),
//   };
// };

import OrgControl from "./_components/OrgControl";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
