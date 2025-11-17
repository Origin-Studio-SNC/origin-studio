"use client";

import { motion } from "framer-motion";

interface IdentitySectionProps {
  text: string;
}

export default function IdentitySection({ text }: IdentitySectionProps) {
  return (
    <section className="w-full flex items-center justify-center py-16 md:py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl"
      >
        <p className="text-xl md:text-2xl text-center text-neutral-300 leading-relaxed">
          {text}
        </p>
      </motion.div>
    </section>
  );
}
