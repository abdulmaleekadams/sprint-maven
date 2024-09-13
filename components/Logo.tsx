import { cn } from "@/lib/utils";
import Link from "next/link";
import LogoImage from "./LogoImage";

type Props = {
  linkClassName?: string;
  imgContainerClassName?: string;
};

const Logo = ({ imgContainerClassName, linkClassName }: Props) => {
  return (
    <Link href={"/"} className={linkClassName}>
      <div
        className={cn(
          "hover:opacity-75 transition items-center gap-x-2 hidden md:flex w-32",
          imgContainerClassName
        )}
      >
        <LogoImage />
      </div>
    </Link>
  );
};

export default Logo;
