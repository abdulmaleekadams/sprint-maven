import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src={'/logo.png'} alt="Logo" height={35} width={45} />
        <p className="text-xl text-neutral-700 font-black">Taskify</p>
      </div>
    </Link>
  );
};

export default Logo;
