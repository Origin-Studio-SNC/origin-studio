"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

interface FinalCTAProps {
  title: string;
  buttonText: string;
  locale: string;
}

export default function FinalCTA({ title, buttonText, locale }: FinalCTAProps) {
  return (
    <section className="w-full flex items-center justify-center py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl text-center flex flex-col items-center gap-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-relaxed">
          {title}
        </h2>
        <Link href={`/${locale}/contact`}>
          <Button 
            size="lg"
            className="bg-[var(--color-accent-violet)] hover:bg-[var(--color-accent-violet)]/80 text-white px-8 py-6 text-lg"
          >
            {buttonText}
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
