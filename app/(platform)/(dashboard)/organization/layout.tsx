import Sidebar from "../_components/Sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 max-w-6xl 2xl:max-w-screen-2xl mx-auto px-4">
      <div className="flex gap-x-7">
        <aside className="w-64 shrink-0 hidden md:block px-4">
            <Sidebar />
        </aside>
        {children}</div>
    </main>
  );
};

export default OrganizationLayout;
