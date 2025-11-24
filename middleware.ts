import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { locales, defaultLocale } from '@/i18n';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Don't add /ko prefix for default locale
});

export async function middleware(request: NextRequest) {
  // First, handle internationalization
  const response = intlMiddleware(request);

  // Then, update Supabase session
  return await updateSession(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
