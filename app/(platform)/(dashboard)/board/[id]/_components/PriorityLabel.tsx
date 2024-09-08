import { cn, getOrdinalSuffix } from "@/lib/utils";

const PriorityLabel = ({ priority }: { priority: number }) => {
  return (
    <div
      className={cn(
        "py-1 px-2 w-max rounded-md",
        priority === 1 &&
          "bg-gradient-to-r to-red-800 from-[#FF4C4C] hover:bg-[#FF4C4C] text-white",
        priority === 2 &&
          "bg-gradient-to-r  to-orange-800 from-[#FFA500] hover:bg-[#FFA500] text-white",
        priority === 3 &&
          "from-yellow-500 bg-gradient-to-r to-yellow-800  hover:bg-yellow-500 text-white",
        priority === 4 &&
          "from-[#32CD32] bg-gradient-to-r  to-green-800 hover:bg-[#32CD32] text-white",
        priority === 5 &&
          "bg-gradient-to-r from-[#1E90FF] to-blue-800 hover:bg-[#1E90FF] text-white"
      )}
    >
      <p className="text-xs font-semibold">
        {`${getOrdinalSuffix(priority)} Priority`}
      </p>
    </div>
  );
};

export default PriorityLabel;
