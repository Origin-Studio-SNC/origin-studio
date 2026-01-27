import { NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.FORM_SECRET || "change-this-in-production";

export async function GET() {
  try {
    const timestamp = Date.now().toString();
    const hmac = crypto.createHmac("sha256", SECRET);
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
