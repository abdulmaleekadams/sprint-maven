"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BoardSidebarBtn = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Button
      variant="ghost"
      className={cn(
        "font-semibold text-sm justify-start items-center gap-2",
        pathname === "/ftr/projects" && "bg-primary"
      )}
      onClick={() => router.push("/ftr/projects")}
    >
      <Briefcase className="w-4 h-4" />
      Projects
    </Button>
  );
};

export default BoardSidebarBtn;
