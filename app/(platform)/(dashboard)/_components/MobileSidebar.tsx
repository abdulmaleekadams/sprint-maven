"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hoooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const { onOpen, isOpen, onClose } = useMobileSidebar((state) => state);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Button
        className="block md:hidden mr-2"
        onClick={onOpen}
        size={"sm"}
        variant={"ghost"}
      >
        <Menu className="h-4 w-4" />
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side={"left"} className="p-2 pt-10">
            <Sidebar storageKey="t-sidebar-mobile-state" />
          </SheetContent>
        </Sheet>
      </Button>
    </>
  );
};

export default MobileSidebar;
