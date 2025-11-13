"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  duration: string;
  index: number;
  isLast: boolean;
}

export default function ProcessStep({
  number,
  title,
  description,
  duration,
  index,
  isLast,
}: ProcessStepProps) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-6 items-start"
      >
        {/* Number Circle */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
            {number}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-neutral-400 mb-2 leading-relaxed">{description}</p>
          <p className="text-sm text-neutral-500 italic">Durée : {duration}</p>
        </div>
      </motion.div>

      {/* Connector Line */}
      {!isLast && (
        <div className="hidden md:block absolute left-8 top-20 w-0.5 h-20 bg-gradient-to-b from-purple-500/50 to-transparent" />
      )}
    </div>
  );
}
