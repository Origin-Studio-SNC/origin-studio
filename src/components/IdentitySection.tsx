"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IdentitySectionProps {
  text: string;
}

export default function IdentitySection({ text }: IdentitySectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full flex items-center justify-center py-8 md:py-12 px-4">
      <div className="max-w-7xl w-full">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-xl md:text-3xl font-medium text-neutral-300 text-center leading-relaxed"
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
