"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Workspace } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WorkSpaceSearchList = ({ workspaces }: { workspaces: Workspace[] }) => {
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSelect = async (currentValue: string, workspaceId: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);

    // Update session with selected workspaceId
    await update({ workspaceId });

    // Navigate to the selected workspace
    router.replace(`/organization/${workspaceId}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-80 md:min-w-[450px] justify-between"
        >
          {value
            ? workspaces.find(
                (workspace) =>
                  workspace.name.toLowerCase() === value.toLowerCase()
              )?.name
            : "Select workspace..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-[200px] p-0">
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.name}
                  onSelect={() => handleSelect(workspace.name, workspace.id)}
                >
                  <Image
                    width={20}
                    height={20}
                    alt="Icon"
                    src="/bank.png"
                    className="mr-2 h-4 w-4"
                  />
                  <span>{workspace.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WorkSpaceSearchList;
