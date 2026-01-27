"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface PricingDetail {
  label: string;
  value: string;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  paymentOptions?: string;
  details: PricingDetail[];
  advantages?: string[];
  conditions?: string[];
  cta: string;
  highlighted?: boolean;
  bestOffer?: string;
  serviceId?: string;
  index: number;
  locale: string;
}

export default function PricingCard({
  name,
  description,
  price,
  originalPrice,
  paymentOptions,
  details,
  advantages,
  conditions,
  cta,
  highlighted = false,
  bestOffer,
  serviceId,
  index,
  locale,
}: PricingCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative bg-neutral-950 rounded-4xl p-8 transition-all duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} ${
        highlighted
          ? "border-2 border-[var(--color-accent-violet)] shadow-[0_0_30px_rgba(95,16,220,0.3)]"
          : "border border-neutral-800 hover:border-neutral-600"
      }`}
      style={{ animationDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      {highlighted && bestOffer && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--color-accent-violet)] text-white px-4 py-1 rounded-full text-sm font-semibold">
          {bestOffer}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-neutral-400 text-sm mb-4">{description}</p>
        
        <div className="mb-2">
          {originalPrice && (
            <p className="text-lg text-neutral-500 line-through">{originalPrice}</p>
          )}
          <p className="text-3xl font-bold text-white">{price}</p>
        </div>
        
        {paymentOptions && (
          <p className="text-xs text-neutral-400 italic mt-2">{paymentOptions}</p>
        )}
      </div>

      {/* Details Grid */}
      <div className="mb-6 space-y-2">
        {details.map((detail, idx) => (
          <div key={idx} className="flex justify-between items-center py-2 border-b border-neutral-800">
            <span className="text-neutral-400 text-sm">{detail.label}</span>
            <span className="text-white text-sm font-medium">{detail.value}</span>
          </div>
        ))}
      </div>

      {/* Advantages */}
      {advantages && advantages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-white font-semibold text-sm mb-3">
            {locale === 'fr' ? 'Avantages' : locale === 'de' ? 'Vorteile' : 'Advantages'}
          </h4>
          <ul className="space-y-2">
            {advantages.map((advantage, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
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
                <span className="text-neutral-300 text-xs">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conditions */}
      {conditions && conditions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-white font-semibold text-sm mb-3">
            {locale === 'fr' ? 'Conditions' : locale === 'de' ? 'Bedingungen' : 'Conditions'}
          </h4>
          <ul className="space-y-2">
            {conditions.map((condition, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-neutral-400 text-xs">•</span>
                <span className="text-neutral-400 text-xs">{condition}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link href={`/${locale}/contact${serviceId ? `?service=${serviceId}` : ''}`}>
        <Button
          className={`w-full ${
            highlighted
              ? "bg-[var(--color-accent-violet)] text-white hover:opacity-90"
              : "bg-neutral-800 text-white hover:bg-neutral-700"
          }`}
        >
          {cta}
        </Button>
      </Link>
    </div>
  );
}
