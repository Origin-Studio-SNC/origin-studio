"use client";

import { motion } from "framer-motion";
import { AboutTranslations } from "@/types/translations";
import DarkVeil from "@/components/bg-ui/DarkVeil";

interface AboutHeroProps {
  about: AboutTranslations;
}

export default function AboutHero({ about }: AboutHeroProps) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[100vh] py-16 px-4 text-center relative min-w-[100vw]">
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-30 flex flex-col justify-center items-center gap-6"
      >
        <motion.h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 mb-6">
          {about.title}
        </motion.h1>
        <motion.p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl">
          {about.subtitle}
        </motion.p>
        <motion.p className="text-lg text-neutral-400 max-w-4xl leading-relaxed">
          {about.intro}
        </motion.p>
      </motion.div>
      <div className="absolute inset-0 -z-10 w-full h-full">
        <DarkVeil />
      </div>
    </section>
  );
}
