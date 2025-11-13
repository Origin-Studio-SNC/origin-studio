"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button } from "./ui/button";
import MouseScrollIndicator from "./MouseScrollIndicator";
import { Dictionary } from "@/types/dictionary";

type HeroTranslations = {
  title: string;
  description: string;
  servicesButton: string;
  projectsButton: string;
};

export function HeroSlider({ dictionary }: { dictionary: Dictionary }) {
  const hero = dictionary.hero as HeroTranslations;
  return (
    <div className="min-h-screen overflow-hidden h-full w-full relative flex items-center justify-center">
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
        className="z-30 flex flex-col justify-center items-center gap-10"
      >
        <motion.p className="font-bold text-3xl max-w-4xl px-4 md:text-5xl lg:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 py-4">
          {hero.title}
        </motion.p>
        <motion.p className="text-center max-w-2xl text-xl font-medium text-neutral-200 text-shadow-lg">
          {hero.description}
          {/* <TextType text={hero.description} /> */}
        </motion.p>
        <div className="flex gap-4">
          <Button variant="secondary" size="lg" className="mt-4">
            {hero.servicesButton}
          </Button>
          <Button variant="outline" size="lg" className="mt-4 py-6">
            {hero.projectsButton}
          </Button>
        </div>
      </motion.div>
      <MouseScrollIndicator />
    </div>
    
  );
}
