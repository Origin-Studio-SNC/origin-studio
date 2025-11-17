"use client";

import { motion } from "framer-motion";
import MouseScrollIndicator from "./MouseScrollIndicator";

interface HeroPageProps {
  title: string;
  subtitle: string;
  intro?: string;
}

export default function HeroPage({ title, subtitle, intro }: HeroPageProps) {
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
        <motion.h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 mb-4 p-2">
          {title}
        </motion.h1>
        <motion.p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl">
          {subtitle}
        </motion.p>
        {intro && (
          <motion.p className="text-lg text-neutral-400 max-w-4xl leading-relaxed">
            {intro}
          </motion.p>
        )}
      </motion.div>
      <MouseScrollIndicator />
    </section>
  );
}
