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
    const timestamp = Date.now().toString();
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(timestamp);
    const signature = hmac.digest("hex");
    const nonce = `${timestamp}.${signature}`;

    return NextResponse.json({ nonce });
  } catch (error) {
    console.error("Nonce generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate nonce" },
      { status: 500 }
    );
  }
}
