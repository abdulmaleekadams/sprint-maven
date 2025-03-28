"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const ProductShowcase = () => {
  const productImgRef = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: productImgRef,
    offset: ["start end", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
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
        <motion.div
          style={{
            opacity,
            rotateX,
            transformPerspective: "800px",
          }}
        >
          <Image
            ref={productImgRef}
            src={""}
            alt="Product Screen"
            className="mt-14 bg-black h-96"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductShowcase;
