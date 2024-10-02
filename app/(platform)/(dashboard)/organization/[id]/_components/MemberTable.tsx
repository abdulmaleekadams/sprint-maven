import { createRole } from "@/actions/create-role";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAction } from "@/hoooks/use-action";
import { cn } from "@/lib/utils";
import { useOrganization } from "@/provider/OrganizationContext";
import { Role } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const MemberTable = () => {
  const { activeOrganization, isLoading } = useOrganization();

  if (!activeOrganization) return null;

  const [role, setRole] = useState<Role | undefined>(undefined);
  const [roles, setRoles] = useState<Role[]>(activeOrganization?.roles || []);
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

  const params = useParams();
  const { workspaceUser: members } = activeOrganization;

  const {
    execute: executeCreateRole,
    error: createRoleError,
    fieldErrors: createRoleFieldError,
    isLoading: createRoleIsLoading,
  } = useAction(createRole, {
    onSuccess: (data) => {
      toast.success(`"${data.title}" role created successfully`);
      setRoles((prev) => [data, ...prev]);
    },
  });

  const handleCreateRole = () => {
    if (!searchInput) return;
    const role = searchInput;
    const workspaceId = params.id as string;

    executeCreateRole({ role, workspaceId });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="sr-only">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          members?.map(({ id, role, user: { email, name }, userId }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              {/* <TableCell>{format(createdAt, "dd-MMM-yy")}</TableCell> */}
              <TableCell>
                <Popover>
                  <PopoverTrigger className="w-40" asChild>
                    <Button
                      role="combobox"
                      variant="outline"
                      className={cn("", !role && "text-muted-foreground")}
                    >
                      {role ? role.title : "Select role"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Command className="flex flex-col ">
                      <CommandInput
                        onValueChange={(value) => setSearchInput(value)}
                        placeholder="Search role..."
                      />
                      <CommandList>
                        {/* Role creation */}
                        <CommandEmpty className="mt-3">
                          <Label>Add new role</Label>
                          <Button
                            className="w-full mt-2"
                            disabled={createRoleIsLoading}
                            onClick={handleCreateRole}
                          >
                            <p className="!text-ellipsis line-clamp-1 whitespace-nowrap block">
                              Create {`"${searchInput}"`}
                            </p>
                          </Button>
                        </CommandEmpty>
                        {/* Roles list */}
                        <CommandGroup>
                          <div className="flex flex-col">
                            {roles.map((rl) => (
                              <PopoverClose key={rl.id}>
                                <CommandItem
                                  onSelect={() => setRole(rl)}
                                  value={rl.title}
                                  className="cursor-pointer"
                                >
                                  {rl.title}
                                </CommandItem>
                              </PopoverClose>
                            ))}
                          </div>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>roles</DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default MemberTable;
