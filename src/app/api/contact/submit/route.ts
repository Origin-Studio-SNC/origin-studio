import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.FORM_SECRET || "change-this-in-production";
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // Max 5 submissions per window

// In-memory rate limiting (for production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function verifyNonce(nonce: string): boolean {
  try {
    const [timestamp, signature] = nonce.split(".");
    if (!timestamp || !signature) return false;

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts)) return false;

    // Check if nonce is not too old (valid for 1 hour)
    const age = Date.now() - ts;
    if (age > 3600000) return false;

    // Verify signature
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(timestamp);
    const expectedSignature = hmac.digest("hex");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}

function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

function getClientIdentifier(request: NextRequest): string {
  // Use IP + User-Agent for identification
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "";
  
  return crypto
    .createHash("sha256")
    .update(`${ip}-${userAgent}`)
    .digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, nonce, website_url } = body;

    // 1. Check honeypot
    if (website_url) {
      return NextResponse.json(
        { message: "Invalid submission" },
        { status: 422 }
      );
    }

    // 2. Verify nonce
    if (!nonce || !verifyNonce(nonce)) {
      return NextResponse.json(
        { message: "Invalid security token" },
        { status: 422 }
      );
    }

    // 3. Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimit = checkRateLimit(identifier);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { message: "Too many requests" },
        { 
          status: 429,
          headers: {
            "Retry-After": rateLimit.retryAfter?.toString() || "900",
          },
        }
      );
    }

    // 4. Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 422 }
      );
    }

    // 5. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 422 }
      );
    }

    // 6. Validate message length
    if (message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json(
        { message: "Message must be between 10 and 5000 characters" },
        { status: 422 }
      );
    }

    // 7. TODO: Send email via Infomaniak or SMTP
    // For now, log the submission (in production, send actual email)
    console.log("Contact form submission:", {
      timestamp: new Date().toISOString(),
      clientHash: identifier,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "N/A",
      messageLength: message.trim().length,
    });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
