"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TechLogo {
  name: string;
  src: string;
  alt: string;
}

interface TechStackProps {
  title: string;
  subtitle: string;
  logos: TechLogo[];
}

export default function TechStack({ title, subtitle, logos }: TechStackProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                className="object-contain h-12 w-auto"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
