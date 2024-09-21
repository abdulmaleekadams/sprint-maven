/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

const partnersLogo = [
  "/assets/images/celestial.png",
  "/assets/images/acme.png",
  "/assets/images/apex.png",
  "/assets/images/echo.png",
  "/assets/images/pulse.png",
  "/assets/images/quantum.png",
];

const LogoTicker = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-xl text-white/70 text-center">
          Trusted by the world's most innovative teams
        </h2>
        <div className="overflow-hidden relative mt-9 before:content-[''] before:absolute before:h-full after:h-full after:absolute before:w-5 after:w-5 after:right-0 before:left-0 after:top-0 before:top-0 after:bg-[linear-gradient(to_left,#000,rgb(0,0,0,0))] before:bg-[linear-gradient(to_right,#000,rgb(0,0,0,0))]">
          <div className="flex gap-14 justify-center items-center">
            {partnersLogo.map((partnerLogo) => (
              <Image
                src={partnerLogo}
                width={100}
                height={100}
                key={partnerLogo}
                alt=""
                className="flex-none h-8 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
