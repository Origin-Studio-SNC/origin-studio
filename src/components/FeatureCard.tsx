"use client"

import { ReactNode, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link?: string;
  className?: string;
  cardId?: string;
  onMouseEnter?: (cardId: string) => void;
  onMouseLeave?: () => void;
}

export default function FeatureCard({ 
  title, 
  description, 
  icon, 
  link = "/", 
  className,
  cardId = "default",
  onMouseEnter,
  onMouseLeave
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams();
  const locale = params.locales as string;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.(cardId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.();
  };

  return (
    <div 
      className={cn("relative group block p-2 h-full cursor-pointer", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/${locale}${link}`}>
        {/* Retirer l'AnimatePresence d'ici car c'est géré au niveau parent */}
        <div className="relative z-20 max-w-md min-h-64 flex flex-col items-start gap-4 bg-neutral-950 rounded-lg border border-neutral-800 p-6 group-hover:border-neutral-600 transition-all duration-500 ease-out group-hover:drop-shadow-[0_8px_60px_rgba(95,16,220,0.4)]">
          <div className="flex items-center rounded bg-[var(--color-accent-violet)] p-2 text-white">
            {icon}
          </div>
          <div className="flex w-full min-w-0 flex-col items-start justify-center gap-2 text-base">
            <h3 className="mb-2 py-2 text-lg font-semibold leading-6 text-neutral-200">
              {title}
            </h3>
            <p className="text-neutral-400 max-w-prose">
              {description}
            </p>
              <div className="text-blue-500 font-medium flex items-center gap-2 mt-2 group-hover:text-blue-400">
                {locale === 'en' ? 'Learn more' : 'En savoir plus'} <ArrowRightIcon className="w-4 h-4" />
              </div>
          </div>
        </div>
      </Link>
    </div>
  );
}