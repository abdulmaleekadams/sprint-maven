import Link from "next/link";

const Banner = () => {
  return (
    <div className="py-3 text-center bg-[linear-gradient(to_right,hsl(296,_100%,_92%,_.7),hsl(190,_100%,_58%,_.7),hsl(59,_100%,_75%,_.7),hsl(336,_87%,_79%,_.7),hsl(296,_100%,_92%,_.7))]">
      <div className="container">
        <p className="font-medium">
          <span className="hidden sm:inline">
            Introducing a completely redesigned interface
          </span>
          <Link
            href="#"
            className="underline underline-offset-4 font-medium ml-2"
          >
            Explore the demo
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Banner;
