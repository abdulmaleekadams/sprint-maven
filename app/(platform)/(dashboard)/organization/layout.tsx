import Sidebar from "../_components/Sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 max-w-6xl 2xl:max-w-screen-2xl mx-auto px-4 min-h-screen">
      <div className="flex gap-x-7 ">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden md:block fixed top-0 pt-24 h-screen overflow-y-auto px-4 scroll-bar">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="pl-64 w-full">{children}</main>
      </div>
    </main>
  );
};

export default OrganizationLayout;
