"use client";

import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  index: number;
}

export default function PricingCard({
  name,
  description,
  price,
  features,
  cta,
  highlighted = false,
  index,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative bg-neutral-950 rounded-lg p-8 transition-all duration-500 ${
        highlighted
          ? "border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] scale-105"
          : "border border-neutral-800 hover:border-neutral-600"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Populaire
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-neutral-400 text-sm mb-4">{description}</p>
        <p className="text-3xl font-bold text-white">{price}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-neutral-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
          highlighted
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-105"
            : "bg-neutral-800 text-white hover:bg-neutral-700"
        }`}
      >
        {cta}
      </button>
    </motion.div>
  );
}
