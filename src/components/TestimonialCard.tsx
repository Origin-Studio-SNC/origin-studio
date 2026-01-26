"use client";

import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TestimonialCardProps {
  text: string;
  author?: string;
  company?: string;
  rating?: number;
  image?: string;
  index: number;
  showMoreText: string;
  showLessText: string;
  isSliderVisible: boolean;
  size?: 'small' | 'default';
}

// Fonction pour formater le nom: "Joel Danton" -> "Joel D."
function formatName(fullName: string): string {
  const parts = fullName.trim().split(' ');
  if (parts.length < 2) return fullName;
  const firstName = parts[0];
  const lastNameInitial = parts[parts.length - 1][0];
  return `${firstName} ${lastNameInitial}.`;
}

export default function TestimonialCard({ 
  text, 
  author, 
  company, 
  rating, 
  image, 
  index,
  showMoreText,
  showLessText,
  isSliderVisible,
  size = 'default'
}: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const displayName = author ? formatName(author) : undefined;
  
  // Détermine si le texte est assez long pour nécessiter un "Voir plus" (seulement en mode default)
  const needsExpansion = size === 'default' && text.length > 250;
  
  // Détermine l'URL de l'image à utiliser
  const imageSrc = imgError || !image 
    ? '/img/testimonials/placeholder.webp' 
    : `/img/testimonials/${image}`;
  
  // Classes conditionnelles selon la taille
  const containerClasses = size === 'small'
    ? 'p-4 text-sm' // Small: padding et texte réduits
    : 'p-8'; // Default: padding normal
  
  const minHeight = size === 'small' ? '200px' : '320px';
  const starSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
  const avatarSize = size === 'small' ? 'w-10 h-10' : 'w-12 h-12';
  
  return (
    <div
      className={`${containerClasses} bg-neutral-900/30 border border-neutral-800 rounded-4xl hover:border-neutral-700 transition-all duration-300 flex flex-col ${isSliderVisible ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ 
        minHeight: isExpanded ? 'auto' : minHeight,
        animationDelay: isSliderVisible ? `${index * 100}ms` : '0ms'
      }}
    >
      {/* Note en étoiles */}
      {rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`${starSize} ${
                i < rating ? 'fill-yellow-500 text-yellow-500' : 'fill-neutral-700 text-neutral-700'
              }`}
            />
          ))}
        </div>
      )}

      {/* Texte du témoignage */}
      <div className="relative flex-1 flex flex-col">
        <p className={`text-neutral-300 italic leading-relaxed mb-2 flex-1 ${
          size === 'small' 
            ? 'line-clamp-3' // Small: toujours 3 lignes max
            : (!isExpanded && needsExpansion ? 'line-clamp-4' : '') // Default: 4 lignes avec expand
        }`}>
          &ldquo;{text}&rdquo;
        </p>
        
        {needsExpansion && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 mt-2 self-start cursor-pointer"
          >
            {isExpanded ? showLessText : showMoreText}
          </button>
        )}
      </div>

      {/* Auteur avec photo */}
      {author && (
        <div className={`flex items-center gap-3 ${size === 'small' ? 'mt-4' : 'mt-6'}`}>
          <div className={`relative ${avatarSize} rounded-full overflow-hidden flex-shrink-0 bg-neutral-800`}>
            <Image
              src={imageSrc}
              alt={displayName || author}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          </div>
          <div className={size === 'small' ? 'text-xs' : 'text-sm'}>
            <p className="text-white font-medium">{displayName}</p>
            {company && <p className="text-neutral-500">{company}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
