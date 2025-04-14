// Middleware pour gérer la redirection et le routage de l'application
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, locale } = request.nextUrl;

  // Si l'utilisateur accède à la racine, on le redirige vers la version française
  if (pathname === '/') {
    const defaultLocale = 'fr';
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|fonts|.*\..*).*)'],
};