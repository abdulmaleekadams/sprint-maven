import { getTagBgColor } from "@/lib/utils";

const TagLabel = ({ name, color }: { name: string; color: string }) => {
  const backgroundColor = getTagBgColor(color);

  return (
    <div
      className="py-1 px-2 w-max rounded-md cursor-pointer"
      style={{
        backgroundColor,
        borderColor: color,
        color: color,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <p className="text-xs font-semibold pointer-events-none">{name}</p>
    </div>
  );
};

export default TagLabel;
