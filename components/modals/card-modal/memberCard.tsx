import { deassignTask } from "@/actions/update-card/featured-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getInitials } from "@/lib/utils";
import { TaskAssignment } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

const MemberCard = ({
  member,
  boardId,
}: {
  member: TaskAssignment & {
    user: {
      image: string | null;
      email: string;
      name: string;
      username: string;
    };
  };
  boardId: string;
}) => {
  const {
    id,
    taskId,
    user: { email, image, name, username },
    userId,
  } = member;

  const { data: currentUser } = useSession();
  const queryClient = useQueryClient();
  const [isLoading, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(() => {
      deassignTask({ taskAssignmentId: id, boardId }).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["card", taskId],
        });
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar key={id} className="w-8 h-8 shrink-0">
          <AvatarImage src={image ?? ""} />
          <AvatarFallback className="bg-red-500 font-semibold text-white text-xs">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-0 w-max">
        <div className=" rounded-md">
          <div className="w-max flex gap-4 p-4 bg-gradient-to-b from-primary/50 to-primary/20 rounded-t-md">
            <Avatar key={id} className="w-14 h-14 shrink-0">
              <AvatarImage src={image ?? ""} />
              <AvatarFallback className="bg-red-500 font-semibold text-white text-xs">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{username}</p>
            </div>
          </div>
        </div>
        <div className="px-4 pt-5 border-t flex flex-col gap-2">
          <Button variant="secondary">
            {currentUser?.user.id === userId ? "Edit profile" : "View profile"}
          </Button>
          <Button
            variant="secondary"
            disabled={isLoading}
            onClick={handleRemove}
          >
            Remove from card
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MemberCard;
