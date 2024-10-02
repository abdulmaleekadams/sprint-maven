"use client";
import { createRole } from "@/actions/create-role";
import { inviteMembers } from "@/actions/invite-member";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAction } from "@/hoooks/use-action";
import { cn } from "@/lib/utils";
import { useOrganization } from "@/provider/OrganizationContext";
import { Role } from "@prisma/client";
import { SlashIcon, UserPlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import CommaSeparatedInput from "./CommaSeparatedInput";
import InvitationTable from "./InvitationTable";
import MemberTable from "./MemberTable";

const Members = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [defaultValue, setDefaultValue] = useState("invitations");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const [role, setRole] = useState<Role | undefined>(undefined);
  const { activeOrganization } = useOrganization();
  const [roles, setRoles] = useState<Role[]>(activeOrganization?.roles || []);
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

  const params = useParams();

  const {
    execute: executeInviteMembers,
    error,
    fieldErrors,
    isLoading,
  } = useAction(inviteMembers, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
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

  const handleInvitation = (formData: FormData) => {
    const workspaceId = params.id;
    if (!selectedEmails || selectedEmails.length === 0 || !workspaceId || !role)
      return;

    executeInviteMembers({
      emails: selectedEmails as [string],
      role: role.id,
      workspaceId: workspaceId as string,
    });
  };

  const handleCreateRole = () => {
    if (!searchInput) return;
    const role = searchInput;
    const workspaceId = params.id as string;

    executeCreateRole({ role, workspaceId });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm">Members</Button>
      </DialogTrigger>
      <DialogContent className="h-[80%]">
        {showInviteForm ? (
          <div className="space-y-6">
            <Breadcrumb>
              <BreadcrumbList className="">
                <BreadcrumbItem>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto w-auto text-inherit"
                    onClick={() => {
                      setDefaultValue("members");
                      setShowInviteForm(false);
                    }}
                  >
                    Members
                  </Button>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbPage>Invite members</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
            <div>
              <p className="text-2xl font-semibold">Invite members</p>
              <p className="text-sm text-muted-foreground">
                Invite new members to this workspace
              </p>
            </div>

            <form className="space-y-10" action={handleInvitation}>
              <div>
                <p>Email addresses</p>
                <p className="text-muted-foreground text-sm">
                  Enter or paste one or more email addresses, separated by
                  spaces or commas
                </p>
              </div>
              <CommaSeparatedInput
                selectedEmails={selectedEmails}
                setSelectedEmails={setSelectedEmails}
              />

              <div className="space-y-2dd">
                <p className="mb-2">Role</p>

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
              </div>

              <div className="flex gap-2 items-center justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    setDefaultValue("invitations");
                    setShowInviteForm(false);
                  }}
                  className="text-[0.8rem] "
                  size="sm"
                  variant="ghost"
                >
                  CANCEL
                </Button>
                <Button
                  disabled={isLoading}
                  className="text-[0.8rem] "
                  size="sm"
                >
                  SEND INVITATIONS
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <Tabs defaultValue={defaultValue}>
            <TabsList className="bg-transparent">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
            </TabsList>
            <TabsContent value="members">
              <MemberTable />
            </TabsContent>
            <TabsContent value="invitations">
              <div className="flex gap-4 justify-between">
                <div>
                  <p className="font-medium">Individual invitations</p>
                  <p className="text-sm text-muted-foreground">
                    Manually invite members and manage existing invitations.
                  </p>
                </div>
                <Button
                  className="gap-2 items-center"
                  onClick={() => setShowInviteForm(true)}
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="flex items-center justify-center text-[0.8rem] mt-1">
                    INVITE
                  </span>
                </Button>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <Separator className="" />
                <InvitationTable />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Members;
