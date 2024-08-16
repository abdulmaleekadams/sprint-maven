"use client";
import { getLabels } from "@/lib/data";
import chroma from "chroma-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AsyncSelect from "react-select/async";
import { StylesConfig } from "react-select";
import { useAction } from "@/hoooks/use-action";
import { toast } from "sonner";
import { updateCard } from "@/actions/update-card";

const TagSelect = ({ cardId }: { cardId: string }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const boardId = params.id as string;

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
    // Execute
    execute({
      id: cardId,
      boardId,
      labels: [labelId],
    });
  };

  const { data, isError } = useQuery({
    queryKey: ["labels"],
    queryFn: () => getLabels(boardId),
  });

  if (!data || isError || !Array.isArray(data)) return null;

  const labels = data.map((item) => ({
    label: item.title,
    value: item.id,
    color: item.color, // Store the color here
    boardId: item.boardId,
    createdAt: item.createdAt,
    updateAt: item.updateAt,
  }));

  const filterColors = (inputValue: string) => {
    return labels.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<typeof labels>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",
    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles: StylesConfig<(typeof labels)[0]> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        textTransform: "capitalize",
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({
      ...styles,
      textTransform: "capitalize",
      ...dot(data.color),
    }),
  };
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      styles={colourStyles}
      isMulti={false}
      onChange={(e) => {
        onChange(e!.value);
      }}
    />
  );
};

export default TagSelect;
