import Image from "next/image";

const ProductShowcase = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b from-black to-[#5D2CAB] py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold tracking-tighter text-5xl sm:text-6xl">
          Intuitive interface
        </h2>
        <div className="mt-5 max-w-xl mx-auto">
          <p className="text-xl text-center text-white/70 mt-5">
            Celebrate the joy of accomplishment with an app designed to track
            your progress, motivate your efforts, and celebrate your successes,
            one task at a time.
          </p>
        </div>
        <Image src={""} alt="Product Screen" className="mt-14 bg-black h-96" />
      </div>
    </div>
  );
};

export default ProductShowcase;
