import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const AttachedMember = () => {
  return (
    <div className="flex -space-x-4 rtl:space-x-reverse">
        <Avatar className="w-8 h-8 shrink-0" >
          <AvatarFallback className="bg-red-500 font-semibold text-white text-xs">
            K
          </AvatarFallback>
        </Avatar>
        <Avatar className="w-8 h-8 shrink-0" >
          <AvatarFallback className="bg-teal-500 font-semibold text-white text-xs">
            A
          </AvatarFallback>
        </Avatar>
        <Avatar className="w-8 h-8 shrink-0" >
          <AvatarFallback className="bg-neutral-500 font-semibold text-white text-xs">
            +2
          </AvatarFallback>
        </Avatar>
    </div>
  );
};

export default AttachedMember;
