"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SlashIcon, UserPlus } from "lucide-react";
import { useState } from "react";
import CommaSeparatedInput from "./CommaSeparatedInput";

const Members = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [defaultValue, setDefaultValue] = useState("invitations");
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

            <form className="space-y-10" action="">
              <div>
                <p>Email addresses</p>
                <p className="text-muted-foreground text-sm">
                  Enter or paste one or more email addresses, separated by
                  spaces or commas
                </p>
              </div>
              <CommaSeparatedInput />

              <div className="space-y-2">
                <p>Role</p>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="flex flex-col ">
                      <SelectLabel>Roles</SelectLabel>
                      <Button
                        variant="ghost"
                        className="relative justify-start px-0"
                      >
                        <SelectItem
                          className="w-full justify-start "
                          value="admin"
                        >
                          Admin
                        </SelectItem>
                      </Button>
                      <Button
                        variant="ghost"
                        className="relative justify-start px-0"
                      >
                        <SelectItem
                          className="w-full justify-start"
                          value="member"
                        >
                          Member
                        </SelectItem>
                      </Button>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Button className="text-[0.8rem] " size="sm">
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
            <TabsContent value="members"></TabsContent>
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
                <div className="grid grid-cols-7">
                  <p className="col-span-3">User</p>
                  <p className="col-span-2">Invited</p>
                  <p className="col-span-2">Role</p>
                </div>
                <Separator className="" />
                <Separator className="" />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Members;
