"use client";

import { motion } from "framer-motion";

interface ProcessStep {
  label: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Desktop Timeline */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-neutral-800">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="h-full bg-[var(--color-accent-violet)]"
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              ease: "easeOut"
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-start gap-4 relative z-10 flex-1"
          >
            <div className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-[var(--color-accent-violet)] flex items-center justify-center mx-auto">
              <span className="text-[var(--color-accent-violet)] font-bold text-lg">
                {index + 1}
              </span>
            </div>
            <p className="text-white text-center font-medium w-full min-h-[3rem] flex items-center justify-center px-2">
              {step.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden flex flex-col gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-neutral-900 border-2 border-[var(--color-accent-violet)] flex items-center justify-center flex-shrink-0">
              <span className="text-[var(--color-accent-violet)] font-bold">
                {index + 1}
              </span>
            </div>
            <p className="text-white font-medium">
              {step.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
