"use client";

import FormInput from "@/components/form-input";
import FormTextarea from "@/components/form-textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
        <form>
          <FormInput name="title" id="title" />
          <FormTextarea name="description" id="title" />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
