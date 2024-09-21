"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import useWindowSize from "@/hoooks/use-window-size";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

export const NavLinks = ["About", "Features", "Updates", "Help", "Customers"];

const Navbar = () => {
  const windowSize = useWindowSize();
  const [currentWindow, setcurrentWindow] = useState<{
    width: number;
    height: number;
  }>({ width: windowSize.width, height: windowSize.height });

  useEffect(() => {
    setcurrentWindow(windowSize);
  }, [windowSize]);

  return (
    <header className="bg-black">
      <div className="container ">
        <div className="relative py-4 flex justify-between items-center">
          <div className="relative">
            {/* <div className="absolute w-full h-full top-2 bottom-0 bg-[linear-gradient(to_right,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] blur-md " /> */}
            <div className="absolute w-full h-full top-2 bottom-0  " />

            <Logo />
          </div>
          {currentWindow.width >= 768 ? (
            <nav className="flex gap-6 items-center">
              {NavLinks.map((link) => (
                <Link
                  key={link}
                  href={"#"}
                  className="text-white text-opacity-60 hover:text-opacity-100 transition-all duration-700"
                >
                  {link}
                </Link>
              ))}
              <Button className="bg-white text-black text-opacity-50 hover:bg-white hover:text-black hover:text-opacity-100">
                Get for free
              </Button>
            </nav>
          ) : (
            <MobileMenu NavLinks={NavLinks} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
