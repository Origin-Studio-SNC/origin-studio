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
      {/* Desktop - Horizontal Timeline */}
      <div className="hidden md:flex items-start justify-between gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 flex-1 relative"
          >
            {/* Number Circle */}
            <div className="w-16 h-16 rounded-full bg-[var(--color-accent-violet)] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              {index + 1}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white text-center">
              {step.label}
            </h3>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-0.5 bg-[var(--color-accent-violet)]/30" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile - Vertical Timeline */}
      <div className="md:hidden space-y-16">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              {/* Number Circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent-violet)] flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">
                  {step.label}
                </h3>
              </div>
            </motion.div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-8 top-20 w-0.5 h-20 bg-[var(--color-accent-violet)]/30" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
