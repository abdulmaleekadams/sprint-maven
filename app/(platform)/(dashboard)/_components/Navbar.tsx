import FormPopover from "@/components/form-popover";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <nav className="sticky z-50 top-0 w-full px-4 h-14 border-b shadow-sm bg-card flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size={"sm"}
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
            variant={"primary"}
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button size={"sm"} className="rounded-sm block md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>

      {/* <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterSelectOrganizationUrl={"/organization/:id"}
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/organization/:id"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
        <ModeToggle />
      </div> */}
    </nav>
  );
};

export default Navbar;
