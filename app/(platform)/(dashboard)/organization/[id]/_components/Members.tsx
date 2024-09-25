import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Members = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm">Members</Button>;
      </DialogTrigger>
      <DialogContent>Add members</DialogContent>
    </Dialog>
  );
};

export default Members;
