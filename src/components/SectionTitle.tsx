"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionTitle({ children, className = "", delay = 0 }: SectionTitleProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`text-4xl md:text-5xl font-bold text-center text-white ${className}`}
    >
      {children}
    </motion.h2>
  );
}
