"use client";
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

import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Workspace } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WorkSpaceSearchList = ({ workspaces }: { workspaces: Workspace[] }) => {
  const { update } = useSession();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const router = useRouter();

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
          <CommandList className="">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    update({ workspaceId: workspace.id });
                    setOpen(false);
                    router.push(`/organization/${workspace.id}`);
                  }}
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
