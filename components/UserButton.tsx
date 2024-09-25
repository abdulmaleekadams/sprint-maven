import { LogOut } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

const UserButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="from-primary to-red-400/50 bg-gradient-to-r"
        >
          <Avatar className="shadow-md bg-background">
            <AvatarFallback className="text-foreground">AA</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4">
          <div>
            <ModeToggle />
          </div>
          <Separator />
          <Button
            variant="ghost"
            className="w-full justify-start relative !ps-[1.6rem]"
          >
            <LogOut className="mr-2 h-[1.2rem] w-[1.2rem]" />
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
