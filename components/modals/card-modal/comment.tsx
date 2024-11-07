"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getInitials } from "@/lib/utils";
import { CommentWithUser } from "@/types";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Dot } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import CommentInput from "./CommentInput";

const Comment = ({
  commentData: {
    content,
    id,
    uploadedById,
    taskId,
    user: { image, name, username, id: userId },
  },
  currentEditingId,
  setCurrentEditingId,
}: {
  commentData: CommentWithUser;
  currentEditingId: string | null;
  setCurrentEditingId: (id: string | null) => void;
}) => {
  const initials = getInitials(name);
  const { data } = useSession();

  const isEditing = currentEditingId === id;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditClick = () => {
    if (isEditing) {
      setCurrentEditingId(null); // Close if already editing
    } else {
      setCurrentEditingId(id); // Set this comment as being edited
      setTimeout(() => {
        textareaRef.current?.focus();
      });
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full ">
      <div className="flex items-start gap-2 flex-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className="w-8 h-8">
                <AvatarImage src={image ?? undefined} />
                <AvatarFallback className="text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="bg-accent p-1 text-sm shadow-md rounded">{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex flex-col w-full">
          {isEditing ? (
            <CommentInput
              setCurrentEditingId={setCurrentEditingId}
              textareaRef={textareaRef}
              cardId={taskId}
              content={content}
              id={id}
              isEditing={isEditing} // Pass isEditing state
            />
          ) : (
            <p className="text-sm h-8 flex items-center">{content}</p>
          )}
          <div className="flex gap-2 items-center">
            {!isEditing && (
              <>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 justify-start text-muted-foreground hover:text-primary"
                  onClick={() => setCurrentEditingId(id)} // Reply button logic
                  disabled
                >
                  Reply
                </Button>
                {data?.user?.id === uploadedById && (
                  <>
                    <Dot className="text-accent" />
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 justify-start text-muted-foreground hover:text-primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                    <Dot className="text-accent" />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 justify-start text-muted-foreground hover:text-primary"
                        >
                          Delete
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col w-52">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                        >
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
