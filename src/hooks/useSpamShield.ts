"use client";

import { useEffect, useState } from "react";

interface SpamShieldData {
  honeypot: string;
  honeypotName: string;
  nonce: string;
  startTime: number;
  isReady: boolean;
}

interface UseSpamShieldOptions {
  nonceEndpoint?: string;
}

export function useSpamShield(options: UseSpamShieldOptions = {}) {
  const { nonceEndpoint = "/api/contact/nonce" } = options;
  
  const [data, setData] = useState<SpamShieldData>({
    honeypot: "",
    honeypotName: "website_url", // Generic name that bots might fill
    nonce: "",
    startTime: Date.now(),
    isReady: false,
  });

  useEffect(() => {
    // Fetch nonce from server
    fetch(nonceEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setData((prev) => ({ ...prev, nonce: data.nonce, isReady: true }));
      })
      .catch(() => {
        // Silent fail - form will be rejected without nonce
        setData((prev) => ({ ...prev, isReady: true }));
      });
  }, [nonceEndpoint]);

  const validateSubmission = (): { valid: boolean; error?: string } => {
    // Check honeypot
    if (data.honeypot !== "") {
      return { valid: false, error: "Invalid submission" };
    }

    // Check time gate (minimum 2 seconds)
    const elapsed = Date.now() - data.startTime;
    if (elapsed < 2000) {
      return { valid: false, error: "Please take your time filling the form" };
    }

    // Check nonce exists
    if (!data.nonce) {
      return { valid: false, error: "Security token missing. Please refresh and try again." };
    }

    return { valid: true };
  };

  const setHoneypot = (value: string) => {
    setData((prev) => ({ ...prev, honeypot: value }));
  };

  return {
    honeypotName: data.honeypotName,
    honeypotValue: data.honeypot,
    setHoneypot,
    nonce: data.nonce,
    isReady: data.isReady,
    validateSubmission,
  };
}
