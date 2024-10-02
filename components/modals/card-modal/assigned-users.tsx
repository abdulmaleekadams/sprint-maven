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
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Users } from "lucide-react";

import { assignTask } from "@/actions/update-card/featured-action";
import { useOrganization } from "@/provider/OrganizationContext";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";

const AssignedUsers = ({
  cardId,
  boardId,
}: {
  cardId: string;
  boardId: string;
}) => {
  const { activeOrganization } = useOrganization();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  if (!activeOrganization) return null;

  const { workspaceUser: members } = activeOrganization;

  const handleAddMember = (member: (typeof members)[0]) => {
    startTransition(() => {
      assignTask({ cardId, userId: member.userId, boardId }).then((res) => {
        if (res.data) {
          queryClient.invalidateQueries({
            queryKey: ["card", cardId],
          });
        }
      });
    });
  };
  return (
    <Popover>
      <PopoverTrigger className="w-40" asChild>
        <Button
          variant="secondary"
          className="w-full justify-start"
          size="inline"
        >
          <Users className="h-4 w-4 mr-2" />
          Members
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command className="flex flex-col ">
          <CommandInput
            // onValueChange={(value) => setSearchInput(value)}
            placeholder="Search role..."
          />
          <CommandList>
            {/* Role creation */}
            <CommandEmpty className="mt-3">
              <p>Not found</p>
            </CommandEmpty>
            {/* Roles list */}
            <CommandGroup>
              <div className="flex flex-col">
                {members.map((member) => (
                  <PopoverClose key={member.id}>
                    <CommandItem
                      onSelect={() => handleAddMember(member)}
                      value={member.user.name}
                      className="cursor-pointer"
                    >
                      {member.user.name}
                    </CommandItem>
                  </PopoverClose>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AssignedUsers;
