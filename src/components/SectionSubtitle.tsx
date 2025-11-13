"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionSubtitleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionSubtitle({ children, className = "", delay = 0.1 }: SectionSubtitleProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`text-center text-lg text-neutral-400 ${className}`}
    >
      {children}
    </motion.p>
  );
}
