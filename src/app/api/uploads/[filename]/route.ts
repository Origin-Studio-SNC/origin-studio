import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Only these extensions are allowed — SVG/GIF/ICO are excluded intentionally
// (SVG can embed JavaScript; upload route only writes jpg/png/webp anyway)
const ALLOWED_EXTENSIONS: Record<string, string> = {
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'webp': 'image/webp',
};

// Filenames must be: a UUID (8-4-4-4-12 hex chars) followed by an allowed extension
const SAFE_FILENAME_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp)$/i;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Reject anything that doesn't look like a UUID-named image
    if (!filename || !SAFE_FILENAME_RE.test(filename)) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    const ext = filename.split('.').pop()?.toLowerCase() ?? '';
    const contentType = ALLOWED_EXTENSIONS[ext];
    if (!contentType) {
      return new NextResponse('File type not allowed', { status: 400 });
    }

    const filePath = join(process.cwd(), 'public', 'uploads', filename);

    if (!existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving uploaded file:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
