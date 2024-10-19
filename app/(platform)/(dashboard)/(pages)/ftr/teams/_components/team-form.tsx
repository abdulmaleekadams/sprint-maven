"use client";

import FormInput from "@/components/form-input";
import FormSubmit from "@/components/form-submit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const TeamForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="mb-5">
          <DialogTitle className="text-2xl">Create Team</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="flex gap-2 flex-col">
            <Label>Team Name</Label>
            <FormInput name="name" id="name" placeholder="Team Name" />
          </div>
          <div className="flex gap-2 flex-col">
            <Label>Team Members</Label>
            <FormInput name="members" id="members" placeholder="Team Members" />
          </div>
          <FormSubmit>Add team</FormSubmit>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamForm;
