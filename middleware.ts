import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
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
  const intlResponse = intlMiddleware(request);

  // Then, update Supabase session using the intl response
  const supabaseResponse = await updateSession(request);

  // Merge the responses - copy supabase headers to intl response
  supabaseResponse.headers.forEach((value, key) => {
    intlResponse.headers.set(key, value);
  });

  return intlResponse;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - public files (images, fonts, etc.)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|ico|webp|avif|woff|woff2|ttf|otf)).*)'],
};
