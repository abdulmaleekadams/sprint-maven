"use client";
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const CTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  return (
    <div
      ref={containerRef}
      className="bg-black text-white text-center py-[72px] sm:py-24 overflow-x-hidden"
    >
      <div className="container max-w-xl relative">
        <motion.div style={{ translateY }}>
          <Image
            src="/assets/images/settings.png"
            alt=""
            width={200}
            height={200}
            className="absolute top-6 left-full lg:left-[calc(100%+36px)]"
          />
        </motion.div>
        <motion.div style={{ translateY }}>
          <Image
            src="/assets/images/pie.png"
            alt=""
            width={200}
            height={200}
            className="absolute -top-[100px] right-full lg:right-[calc(100%+24px)]"
          />
        </motion.div>
        <h2 className="font-bold text-5xl sm:text-6xl tracking-tighter">
          Get instant access
        </h2>
        <p className="text-xl text-white/70 mt-5 mb-10">
          Celebrate the joy of accomplishment with an app designed to track your
          progress and motivate your efforts
        </p>
        <form
          action=""
          className="flex flex-col gap-2.5 max-w-sm sm:max-w-md mx-auto sm:flex-row"
        >
          <FormInput
            className="h-12 bg-white/20 rounded-lg px-5 font-medium "
            containerClassName="flex-1"
            name="email"
            id="email"
            placeholder="your@email.com"
          />
          <FormButton className="bg-white h-12 text-primary transition-colors duration-500 hover:text-white">
            Get access
          </FormButton>
        </form>
      </div>
    </div>
  );
};

export default CTA;
