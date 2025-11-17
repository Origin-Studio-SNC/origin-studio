"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button } from "./ui/button";
import MouseScrollIndicator from "./MouseScrollIndicator";
import { Dictionary } from "@/types/dictionary";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeroTranslations = {
  title: string;
  description: string;
  servicesButton: string;
  projectsButton: string;
};

export function HeroSlider({ dictionary }: { dictionary: Dictionary }) {
  const hero = dictionary.hero as HeroTranslations;
  const pathname = usePathname();
  const currentLocale = pathname.match(/^\/(fr|en|de)(?=\/|$)/)?.[1] || 'fr';
  
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
        <motion.p className="font-bold text-3xl max-w-4xl px-4 md:text-5xl lg:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 py-2">
          {hero.title}
        </motion.p>
        <motion.p className="text-center max-w-2xl text-xl font-medium text-neutral-200 text-shadow-lg">
          {hero.description}
          {/* <TextType text={hero.description} /> */}
        </motion.p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href={`/${currentLocale}/prestations`}>
            <Button variant="secondary" size="lg" className="mt-4">
              {hero.servicesButton}
            </Button>
          </Link>
          <Link href={`/${currentLocale}/contact`}>
            <Button variant="outline" size="lg" className="mt-4 py-6">
              {hero.projectsButton}
            </Button>
          </Link>
        </div>
      </motion.div>
      <MouseScrollIndicator />
    </div>
    
  );
}
