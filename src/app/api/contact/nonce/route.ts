import { NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.FORM_SECRET;

export async function GET() {
  const secret = SECRET;
  if (!secret) {
    console.error("FORM_SECRET environment variable is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  try {
    // Generate a nonce with timestamp
    const timestamp = Date.now();
    const data = `${timestamp}`;

    // Create HMAC signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(data);
    const signature = hmac.digest("hex");

    // Combine timestamp and signature
    const nonce = `${timestamp}.${signature}`;

    return NextResponse.json({ nonce });
  } catch {
    return NextResponse.json({ error: "Failed to generate nonce" }, { status: 500 });
  }
}
