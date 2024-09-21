import Point from "@/app/(platform)/(dashboard)/board/[id]/_components/Points";
import Priority from "@/app/(platform)/(dashboard)/board/[id]/_components/Priority";
import Severity from "@/app/(platform)/(dashboard)/board/[id]/_components/Severity";

const Enhacements = ({
  initialPriority,
  cardId,
}: {
  cardId: string;
  initialPriority?: number | null;
}) => {
  return (
    <div className="space-y-2 mt-2">
      <p className="font-medium text-neutral-700 text-sm">Add-Ons</p>

      <Severity cardId={cardId} />
      <Priority initialPriority={initialPriority || 0} cardId={cardId} />
      <Point cardId={cardId} />
    </div>
  );
};

export default Enhacements;
