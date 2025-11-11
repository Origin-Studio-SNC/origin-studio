"use client";

import { motion } from "framer-motion";
import { 
  ServerIcon, 
  Code2Icon, 
  LayoutIcon, 
  PaintbrushIcon, 
  DatabaseIcon, 
  GitBranchIcon,
  CloudIcon 
} from "lucide-react";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface TechStackIconsProps {
  title: string;
  subtitle: string;
}

export default function TechStackIcons({ title, subtitle }: TechStackIconsProps) {
  const technologies: TechItem[] = [
    { name: "Infomaniak", icon: <CloudIcon className="w-full h-full" /> },
    { name: "React", icon: <Code2Icon className="w-full h-full" /> },
    { name: "Next.js", icon: <LayoutIcon className="w-full h-full" /> },
    { name: "Tailwind CSS", icon: <PaintbrushIcon className="w-full h-full" /> },
    { name: "Node.js", icon: <ServerIcon className="w-full h-full" /> },
    { name: "PostgreSQL", icon: <DatabaseIcon className="w-full h-full" /> },
    { name: "GitHub", icon: <GitBranchIcon className="w-full h-full" /> },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 md:py-20 px-4">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 md:mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            {title}
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center gap-3 p-5 rounded-lg hover:bg-neutral-900/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 text-neutral-500 group-hover:text-[var(--color-accent-violet)] transition-colors">
                {tech.icon}
              </div>
              <p className="text-sm text-neutral-400 text-center">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
