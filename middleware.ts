import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import {defaultLocale, locales} from "@/i18n/request";

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // Always add locale prefix (/ko, /ja)
});

export async function middleware(request: NextRequest) {
  // First, handle internationalization
  let response = intlMiddleware(request);

  // Then, update Supabase session
  response = await updateSession(request, response);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
