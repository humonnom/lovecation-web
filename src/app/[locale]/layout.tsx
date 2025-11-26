import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { AuthProvider } from '@/lib/providers/AuthProvider';
import { HeaderProvider } from '@/lib/providers/HeaderProvider';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import '../globals.css';
import * as React from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="mx-auto max-w-screen-md min-h-screen bg-white">
          <NextIntlClientProvider messages={messages} locale={locale}>
            <QueryProvider>
              <AuthProvider>
                <HeaderProvider>
                  <Header />
                  <main className="pb-[70px]">{children}</main>
                  <BottomNav />
                  <Toaster position="top-center" richColors />
                </HeaderProvider>
              </AuthProvider>
            </QueryProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
