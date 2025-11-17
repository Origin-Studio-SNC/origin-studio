"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RevealLinkProps {
  kind: "email" | "tel";
  parts: string[];
  children: React.ReactNode;
  description?: string;
}

export default function RevealLink({ kind, parts, children, description }: RevealLinkProps) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    // Reconstruct the contact info from parts
    const contactInfo = parts.join("");
    
    // Create the appropriate URL
    const url = kind === "email" ? `mailto:${contactInfo}` : `tel:${contactInfo}`;
    
    // Trigger the action
    window.location.href = url;
    setRevealed(true);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        variant="secondary"
        size="lg"
        onClick={handleReveal}
        className="min-w-[200px]"
      >
        {children}
      </Button>
      {!revealed && description && (
        <p className="text-xs text-neutral-500">{description}</p>
      )}
    </div>
  );
}
