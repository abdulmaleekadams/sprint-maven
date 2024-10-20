"use client";

import FormButton from "@/components/form-button";
import FormCalendarRange from "@/components/form-calendar-range";
import FormInput from "@/components/form-input";
import FormTextarea from "@/components/form-textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const CreateProjectModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Projects</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-5">
          <div className="flex justify-between gap-6">
            <FormInput
              name="title"
              id="title"
              containerClassName="flex-1"
              placeholder="Title"
              label="Title"
            />
            <FormInput
              name="budget"
              placeholder="Budget"
              label="Budget"
              className="max-w-96 flex-1"
              id="budget"
            />
          </div>
          <div className="flex  gap-5">
            <FormCalendarRange id="timeline" label="Timeline" />
            <FormInput
              label="Clients"
              id="Client"
              name="client"
              containerClassName="w-full"
            />
          </div>
          <FormTextarea
            name="description"
            id="title"
            placeholder="Description"
            label="Description"
          />
          <FormButton className="w-full">Create project</FormButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
