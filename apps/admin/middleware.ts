import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = new Set(['/login', '/forbidden']);
const PUBLIC_PREFIXES = ['/images/'];
const PUBLIC_FILES = new Set([
  '/manifest.webmanifest',
  '/site.webmanifest',
  '/sw.js',
]);

const isPublicPath = (pathname: string) => {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (PUBLIC_FILES.has(pathname)) return true;
  if (pathname.startsWith('/workbox-') && pathname.endsWith('.js')) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (process.env.MODE === 'dev') {
    return NextResponse.next();
  }

  if (!token?.email || !process.env.ADMIN_EMAIL || token.email !== process.env.ADMIN_EMAIL) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.redirect(new URL('/forbidden', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
