import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div className="container relative z-10">
        <div className="flex items-center justify-center">
          <Link
            href="#"
            className="border py-1 px-2 rounded-lg border-white/30 inline-flex gap-1 group"
          >
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#C3F0B2,#2FD8FE)] text-transparent bg-clip-text [-webkit-background-clip:text]">
              Version 1.0 here
            </span>
            <span className="group-hover:underline underline-offset-2 inline-flex gap-1 items-center">
              Read More
              <ArrowRightIcon className="w-4 h-4 opacity-0 transition duration-500 group-hover:opacity-100" />
            </span>
          </Link>
        </div>
        <div className="flex justify-center my-8">
          <div className="inline-flex relative">
            <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter text-center inline-flex">
              One Task <br /> at a Time
            </h1>
            <Image
              src={"/assets/images/cursor.png"}
              height={200}
              width={200}
              alt=""
              className="absolute w-[200px] h-[200px] right-[476px] top-[108px] hidden sm:inline"
            />
            <Image
              src={"/assets/images/message.png"}
              height={200}
              width={200}
              alt=""
              className="absolute w-[200px] h-[200px] left-[498px] top-[56px] hidden sm:inline"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xl max-w-md">
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique.
          </p>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <Button className="bg-white text-black text-opacity-50 hover:bg-white hover:text-black hover:text-opacity-100 font-bold">
            Get for free
          </Button>
        </div>
      </div>
      <div className="absolute w-[750px] h-[375px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-black  left-1/2 -translate-x-1/2 border  border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]" />
    </div>
  );
};

export default Hero;
