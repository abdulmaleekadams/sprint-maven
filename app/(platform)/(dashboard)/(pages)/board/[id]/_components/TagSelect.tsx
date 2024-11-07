"use client";
import { updateCard } from "@/actions/update-card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAction } from "@/hoooks/use-action";
import { getLabels } from "@/lib/data";
import { cn, getTagBgColor } from "@/lib/utils";
import { Label } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TagSelect = ({ cardId, labels }: { cardId: string; labels: Label[] }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  console.log(labels);

  const boardId = params.id as string;

  const [selectedLabels, setSelectedLabels] = useState(
    labels?.map((label) => label.id)
  );

  const { execute, fieldErrors, isLoading } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", cardId],
      });
      toast.success(`Card "${data.title}" updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onChange = (labelId: string) => {
    // setSelectedLabels((prevLabels) => {
    //   const isSelected = prevLabels.includes(labelId);
    //   const newSelectedLabels = isSelected
    //     ? prevLabels.filter((id) => id !== labelId) // Remove label
    //     : [...prevLabels, labelId]; // Add label

    //   return newSelectedLabels; // Return updated state
    // });

    const isSelected = selectedLabels.includes(labelId);
    const filteredLabels = isSelected
      ? selectedLabels.filter((id) => id !== labelId) // Remove label
      : [...selectedLabels, labelId]; // Add label

    setSelectedLabels(filteredLabels);

    execute({
      id: cardId,
      boardId,
      labels: filteredLabels,
    });
  };

  const { data, isError } = useQuery({
    queryKey: ["labels"],
    queryFn: () => getLabels(boardId),
  });

  if (!data || isError || !Array.isArray(data)) return null;

  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="px-0">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="px-0" heading="Labels">
          {data.length &&
            data.map(({ boardId, color, id, title }, index) => (
              <CommandItem
                className="my-2"
                style={{
                  backgroundColor: getTagBgColor(color),
                  borderColor: color,
                  color: color,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
                key={id}
              >
                <Checkbox
                  value={id}
                  onCheckedChange={() => onChange(id)}
                  defaultChecked={selectedLabels?.includes(id)}
                  className={cn(
                    "border-muted-foreground data-[state=checked]:text-foreground hover:border-muted-foreground data-[state=checked]:bg-background"
                  )}
                />
                <p className="ml-2">{title}</p>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default TagSelect;
