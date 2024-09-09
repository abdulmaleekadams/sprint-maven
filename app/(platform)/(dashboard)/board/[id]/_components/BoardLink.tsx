"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Board } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BoardLink = ({ board }: { board: Board }) => {
  const pathname = usePathname();
  return (
    <Button
      key={board.id}
      variant="ghost"
      className={cn(
        "justify-start gap-2 group",
        pathname === `/board/${board.id}` && "bg-secondary text-primary"
      )}
      asChild
    >
      <Link
        href={`/board/${board.id}`}
        className="text-sm text-opacity-60 text-muted-foreground group-hover:text-opacity-100 flex items-center"
      >
        <Image
          src={board.imageThumbUrl}
          alt={board.imageId}
          width={30}
          height={30}
          className="w-6 h-6 object-cover rounded-md"
        />

        {board.title}
      </Link>
    </Button>
  );
};

export default BoardLink;
