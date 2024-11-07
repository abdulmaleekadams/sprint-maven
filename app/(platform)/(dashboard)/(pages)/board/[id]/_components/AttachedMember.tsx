import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const AttachedMember = ({
  members,
}: {
  members: {
    id: string;
    user: {
      name: string;
      image: string;
    };
  }[];
}) => {
  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
      <Avatar className="w-7 h-7 shrink-0">
        <AvatarImage src={members[0].user.image} />
        <AvatarFallback className="bg-red-500 font-semibold text-white text-xs">
          {getInitials(members[0].user.name)}
        </AvatarFallback>
      </Avatar>
      {members.length > 1 && (
        <Avatar className="w-7 h-7 shrink-0">
          <AvatarImage src={members[1].user.image} />
          <AvatarFallback className="bg-teal-500 font-semibold text-white text-xs">
            {getInitials(members[1].user.name)}
          </AvatarFallback>
        </Avatar>
      )}
      {members.length > 2 && (
        <Avatar className="w-7 h-7 shrink-0">
          <AvatarFallback className="bg-neutral-500 font-semibold text-white text-xs">
            +{members.length - 2}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default AttachedMember;
