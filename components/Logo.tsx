import Link from "next/link";
import LogoImage from "./LogoImage";

const Logo = () => {
  return (
    <Link href={"/"} className="">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex w-32">
        <LogoImage />
      </div>
    </Link>
  );
};

export default Logo;
