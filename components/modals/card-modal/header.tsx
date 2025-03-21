"use client";

import { updateCard } from "@/actions/update-card";
import TagLabel from "@/app/(platform)/(dashboard)/(pages)/board/[id]/_components/TagLabel";
import TagSelect from "@/app/(platform)/(dashboard)/(pages)/board/[id]/_components/TagSelect";
import FormInput from "@/components/form-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hoooks/use-action";
import { CardFullDetails } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import MemberCard from "./memberCard";

const Header = ({ data }: { data: CardFullDetails }) => {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();
  const params = useParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(data.title);

  const { execute, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Renamed to  "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.id as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ title, boardId, id: data.id });
  };

  return (
    <div className="flex items-start gap-x-3 mb-3 w-full px-4">
      <LayoutIcon className="h-5 w-5 text-neutral-500 mt-1" />
      <div className="w-full">
        {isEditing ? (
          <form action={onSubmit}>
            <FormInput
              ref={inputRef}
              onBlur={onBlur}
              name="title"
              id="title"
              defaultValue={title}
              className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5"
            />
          </form>
        ) : (
          <p
            className="font-semibold text-xl px-1 text-foreground bg-transparent border-transparent relative -left-1.5 w-[95%] mb-0.5"
            onClick={enableEditing}
          >
            {title}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.List.title}</span>
        </p>
        {data.labels.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <div className="inline-flex  gap-2 flex-wrap mt-4 ">
                {data.labels.map((label) => (
                  <TagLabel
                    name={label.title}
                    key={label.id}
                    color={label.color}
                  />
                ))}
              </div>
            </PopoverTrigger>
            <PopoverContent align="start">
              <TagSelect cardId={data.id} labels={data.labels} />
            </PopoverContent>
          </Popover>
        )}
        <div className="mt-3">
          {data?.taskAssignments?.map((taskAssignment) => (
            <MemberCard
              member={taskAssignment}
              boardId={params.id as string}
              key={taskAssignment.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkelton() {
  return (
    <div className="flex items-start gap-x-3 mb-6 w-full px-4">
      <Skeleton className="h-6 w-6 bg-neutral-200 mt-1" />
      <div className="">
        <Skeleton className="h-6 w-24 mb-1 bg-neutral-200 mt-1" />
        <Skeleton className="h-4 w-12 bg-neutral-200 mt-1" />
      </div>
    </div>
  );
};

export default Header;
